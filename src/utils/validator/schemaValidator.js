import validate from "mongoose-validator";
import { constants } from "../../config/constants/constants.js";

export const 
schemaValidator = (field, type, params) => {
  let message;
  switch (type) {
    case constants.validator.isLength:
      message =
        params.length > 1
          ? `${field} should be between ${params[0]} and ${params[1]} in length`
          : `${field} should be ${params[0]} length`;
      break;
    case constants.validator.isNumber:
      message = `${field} should contain numbers only `;
      break;
      case constants.validator.isNumeric:
    
          message = `${field} should contain numeric values only `;
          break;
    default:
      message = `${field} should contain characters only `;
  }

  return validate({
    validator: type,
    arguments: params,
    message: message,
  });
};
