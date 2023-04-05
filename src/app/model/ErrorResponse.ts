export interface ErrorResponse {
    statusCode: number;
    errors: Errors[];
  }
  
  export class Errors {
    element?: string;
    message: string;
  }