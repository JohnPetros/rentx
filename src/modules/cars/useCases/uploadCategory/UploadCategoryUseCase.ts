import fs from 'fs'
import { parse } from 'csv-parse'
import { inject, injectable } from 'tsyringe'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IUploadCategory {
  name: string
  description: string
}

@injectable()
export class UploadCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IUploadCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IUploadCategory[] = []

      const parseFile = parse()

      stream.pipe(parseFile)

      parseFile
        .on('data', async (line) => {
          const [name, description] = line

          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file)

    categories.map(async ({ name, description }) => {
      const existCategory = await this.categoriesRepository.findByName(name)

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}
