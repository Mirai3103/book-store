using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class HttpResponseException : Exception
{
    private HttpStatusCode notFound;

    public HttpResponseException(HttpStatusCode statusCode, string message = "Error") : base(message)
    {
        StatusCode = statusCode;
    }



    public HttpStatusCode StatusCode { get; }
    public dynamic ToResponse()
    {
        return new
        {
            StatusCode = (int)StatusCode,
            Message = this.Message
        };
    }
}
