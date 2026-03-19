const express=require('express')
const routController=require(`${__dirname}/../controller/userController`)
const authController=require(`${__dirname}/../controller/authController`)

const userRouter = express.Router();

userRouter.post('/signup',authController.signup)

userRouter.route("/").get(routController.allUsers).post(routController.createUser);
userRouter.route("/:id").get(routController.getUsers).patch(routController.updateUser).delete(routController.deleteUser);


module.exports = userRouter;
