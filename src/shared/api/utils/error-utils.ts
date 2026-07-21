import axios from 'axios';
import type { ErrorResponse } from '../dto/response/error-response';

export class ErrorUtils {

  static async getErrorResponse(error: any): Promise<ErrorResponse> {

    if (axios.isAxiosError(error)) {

      if (error.response) {
        const response = error.response.data;
        
        if (this.isErrorResponse(response)) {
          return response;
        }
      } else {
        return this.getUnavailableErrorResponse();
      }
      
    }

    return this.getDefaultErrorResponse();
  }
  
  private static isErrorResponse(data: any): boolean {
    if (typeof data !== 'object' || data === null) {
      return false;
    }

    return ('code' in data && typeof (data as ErrorResponse).code === 'string') && ('message' in data);
  }

  private static getDefaultErrorResponse(): ErrorResponse {
    return {code: "unknown", message: null}
  }

  private static getUnavailableErrorResponse(): ErrorResponse {
    return {code: "unavailable", message: null}
  }
}