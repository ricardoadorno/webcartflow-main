import { validate } from 'class-validator';
import Exceptions from '../common/exceptions';

export async function validateDto<T>(validator: new () => T, body: any): Promise<T> {
    const objectToValidate = new validator() as any;
    Object.assign(objectToValidate, body);

    const errors = await validate(objectToValidate);
 
    if (errors.length > 0) {
        const validationErrors = errors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
        }));

        throw Exceptions.invalidField(validationErrors.map((error) => error.property));
    }

    return objectToValidate;
}