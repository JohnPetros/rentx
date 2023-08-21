import fs from 'fs'

export class File {
  async delete(filename: string) {
    try {
      await fs.promises.stat(filename)
    } catch (error) {
      return
    }
    
    await fs.promises.unlink(filename)
  }
}
