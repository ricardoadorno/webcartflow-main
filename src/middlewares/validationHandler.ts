import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import Exceptions from '../common/exceptions';

const validationHandler = (validator: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const objectToValidate = new validator();
            Object.assign(objectToValidate, req.body);

            const errors = await validate(objectToValidate);

            if (errors.length > 0) {
                const validationErrors = errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints,
                }));

                throw Exceptions.invalidField(validationErrors.map((error) => error.property));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

export function ValidateDto(dtoClass: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const validationMiddleware = validationHandler(dtoClass);
            await validationMiddleware(req, res, async (err) => {
                if (err) {
                    return next(err);
                }
                return originalMethod.apply(this, [req, res, next]);
            });
        };

        return descriptor;
    };
}