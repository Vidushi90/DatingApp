using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        public ILogger<ExceptionMiddleware> logger { get; }
        public IHostEnvironment env { get; }
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.env = env;
            this.logger = logger;
            this.next = next;

        }

        public async Task InvokeAsync(HttpContext context) {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var response = env.IsDevelopment() 
                    ? new ApiExceptions(context.Response.StatusCode, ex.Message, ex.StackTrace)
                    : new ApiExceptions(context.Response.StatusCode, ex.Message, "");
                
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.SendFileAsync(json);                
            }
        }
    }
}