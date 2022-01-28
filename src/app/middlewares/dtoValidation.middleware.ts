import { RequestHandler } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

/**
 * @description - Validates the request using the DTO
 * @param {any} dto - DTO to be used to validate the request
 * @example - dtoValidationMiddleware(UserRegistrationDto)
 * @returns {RequestHandler} - If req valid, calls next() else
 *                             return validationErrors[] in response body
 * */
export const dtoValidationMiddleware = (dtoClass: any): RequestHandler => {
  return (req, res, next) => {
    // Convert the plain json object to the DTO class instance
    const dtoObj = plainToInstance(dtoClass, req.body);
    validate(dtoObj, { skipMissingProperties: false }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          let validationErrors = Array();
          // Loop through the errors and push the error message to validationErrors[]
          errors.forEach((error) => {
            validationErrors.push(error.constraints);
          });
          res.status(422).json(validationErrors);
          return;
        } else {
          //call the next middleware
          next();
        }
      },
    );
  };
};
