import { AppError } from '../../../../shared/errors/AppError'
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

describe('Create Category Use Case', () => {
  let createCategoryUseCase: CreateCategoryUseCase
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'category name test',
      description: 'category description test',
    }

    await createCategoryUseCase.execute(category)

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(createdCategory).toHaveProperty('id')
  })

  it('should not be able to create a new category with a name that already exists', async () => {
    expect(async () => {
      const category = {
        name: 'category name test',
        description: 'category description test',
      }

      await createCategoryUseCase.execute(category)
      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
