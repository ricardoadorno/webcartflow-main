import BaseException from './baseException';

const Exceptions = {
  invalidField: (field: string[]) => {
    return new BaseException(`Invalid field(s): ${field.join(', ')}`, 400);
  },
  notFound: (resource: string) => {
    return new BaseException(`${resource} not found`, 404);
  },
  conflict: (resource: string) => {
    return new BaseException(`${resource} already exists`, 409);
  },
  unauthorized: () => {
    return new BaseException('Email or password is wrong', 401);
  },
  internalServerError: () => {
    return new BaseException('Internal server error', 500);
  },
};

export default Exceptions;
