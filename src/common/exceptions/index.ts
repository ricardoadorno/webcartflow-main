import BaseException from './baseException';
import { ExceptionType } from './exception-type';

const Exceptions = {
  invalidField: (field: string[]) => {
    return new BaseException(`Invalid field(s): ${field.join(', ')}`, 400, ExceptionType.INVALID_FIELD);
  },
  notFound: (resource: string) => {
    return new BaseException(`${resource} not found`, 404, ExceptionType.NOT_FOUND);
  },
  conflict: (resource: string) => {
    return new BaseException(`${resource} already exists`, 409, ExceptionType.BAD_REQUEST);
  },
  unauthorized: () => {
    return new BaseException('Email or password is wrong', 401, ExceptionType.UNAUTHORIZED);
  },
  invalidToken: () => {
    return new BaseException('Session Error', 401, ExceptionType.INVALID_TOKEN);
  },
  tokenNotFound: () => {
    return new BaseException('Token not found', 401, ExceptionType.TOKEN_NOT_FOUND);
  },
  internalServerError: () => {
    return new BaseException('Internal server error', 500, ExceptionType.INTERNAL_SERVER_ERROR);
  },
};

export default Exceptions;
