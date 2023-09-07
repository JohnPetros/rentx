import { container } from 'tsyringe'
import { DateProvider } from './dateProvider/implementations/DateProvider'

container.registerSingleton<IDateProvider>('DateProvider', DateProvider)
