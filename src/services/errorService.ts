import axios from "axios";
interface ErrorResponse {
    message: string;
    code?: string;
    details?: unknown;
  }
  
  export class ApiError extends Error {
    constructor(
      public message: string,
      public code?: string,
      public details?: unknown
    ) {
      super(message);
      this.name = 'ApiError';
    }
  }
  
  export const errorService = {
    handleError(error: unknown): ErrorResponse {
      if (error instanceof ApiError) {
        return {
          message: error.message,
          code: error.code,
          details: error.details
        };
      }
  
      if (axios.isAxiosError(error)) {
        return {
          message: error.response?.data?.message || 'An error occurred',
          code: error.response?.status?.toString(),
          details: error.response?.data
        };
      }
  
      if (error instanceof Error) {
        return {
          message: error.message,
          code: 'UNKNOWN_ERROR'
        };
      }
  
      return {
        message: 'An unknown error occurred',
        code: 'UNKNOWN_ERROR'
      };
    },
  
    logError(error: unknown): void {
      const errorDetails = this.handleError(error);
      console.error('Error occurred:', {
        message: errorDetails.message,
        code: errorDetails.code,
        details: errorDetails.details,
        timestamp: new Date().toISOString()
      });
    }
  };