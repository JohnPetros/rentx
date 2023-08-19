import { Router } from "express"

import { CreateUsersController } from "@modules/accounts/useCases/createUser/CreateUsersController"


export const usersRoutes = Router()

const createUsersController = new CreateUsersController() 

usersRoutes.post("/", createUsersController.handle)