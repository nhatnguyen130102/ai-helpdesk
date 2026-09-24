using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs.Common;

namespace AiHelpdesk.Api.Helper
{
    public class ResponseHelper
    {
        public static BaseResponse<T> SuccessResponse<T>(
           T data,
           string message = "Success.",
           int statusCode = StatusCodes.Status200OK)
        {
            return new BaseResponse<T>
            {
                Data = data,
                Message = message,
                Success = true,
                StatusCode = statusCode
            };
        }

        public static BaseResponse<T> ErrorResponse<T>(
            string message,
            int statusCode = StatusCodes.Status400BadRequest)
        {
            return new BaseResponse<T>
            {
                Data = default,
                Message = message,
                Success = false,
                StatusCode = statusCode
            };
        }
    }
}