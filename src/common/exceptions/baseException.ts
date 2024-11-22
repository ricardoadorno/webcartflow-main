import { ExceptionType } from './exception-type';

export default class BaseException extends Error {
    public name: string;
    public message: string;
    public status: number;
    public type: ExceptionType;

  constructor(message: string, status: number, type: ExceptionType = ExceptionType.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.type =  type;
  }
}
