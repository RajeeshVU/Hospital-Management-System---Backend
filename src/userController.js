import MongoServices from "./shared/genericService/genericService.js";
import UserModel from "./models/user/userEntity.js";

export const register = async (req, res) => {
  const mongoService = new MongoServices(UserModel, req.body);
  res.send(await mongoService.create());
};

export const login = async (req, res) => {
  const mongoService = new MongoServices(UserModel, req.body);
  const user = await mongoService.findUser("email", req.body.email);
  if (user.success == false) {
    res.send(user);
  } else {
    res.send(await mongoService.login(user.data));
  }
};
