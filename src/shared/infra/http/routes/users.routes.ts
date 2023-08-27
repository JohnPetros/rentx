import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '../../../../config/Upload'

import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAthentication'

import { CreateUsersController } from '@modules/accounts/useCases/createUser/CreateUsersController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

export const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUsersController = new CreateUsersController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUsersController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)
