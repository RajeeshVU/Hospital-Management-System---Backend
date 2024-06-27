import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {
  errorResponseHandler,
  responseHandler,
} from "../responseHandler/responseHandler.js";
import environments from "../../config/environments/environments.js";

export default class MongoServices {
  constructor(model, data) {
    this.model = model;
    this.data = data;
  }

  async create() {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(this.data.password, salt);
      const response = await this.model.create({
        ...this.data,
        password: hashPassword,
      });
      return responseHandler(response, "Registration");
    } catch (error) {
      return errorResponseHandler(error);
    }
  }

  async findUser(field, value) {
    try {
      const response = await this.model.findOne({ [field]: value }, { createdAt: 0, updatedAt: 0, __v: 0 }).populate('menuId');
      if (!response) {
        return errorResponseHandler("No data Found");
      }
      return responseHandler(response, "Data");
    } catch (error) {
      return errorResponseHandler(error);
    }
  }
  async login(data) {
    try {
      const compare = await bcrypt.compare(this.data.password, data.password);
      if (compare == true) {
        var token = jwt.sign({id:this.data._id,role:this.data.role},environments.secretKey, { expiresIn:'1h' });
        var refreshToken = jwt.sign({id:data._id,role:data.role},environments.refreshKey, { expiresIn:'12h' });
        return responseHandler({...data._doc,token:token,refreshToken:refreshToken}, "Login");
      }
      return errorResponseHandler("Login failed");
    } catch (error) {
      return errorResponseHandler(error);
    }
  }
}
