import { Exception, Message } from '../global.interfaces';

export class HttpException {
  private status: number;
  private errorCode: string;
  private errorMessage: Message;

  public constructor(params: Exception) {
    this.status = params.status;
    this.errorCode = params.errorCode;
    this.errorMessage = params.errorMessage;
  }

  /**
   *
   * @function getStatus - Getter to return error message object
   */
  public getStatus() {
    return this.status;
  }

  /**
   *
   * @function getErrorCode - Getter to return error message object
   */
  public getErrorCode() {
    return this.errorCode;
  }

  /**
   *
   * @function getErrorMessage - Getter to return error message object
   */
  public getErrorMessage() {
    return this.errorMessage;
  }
}
