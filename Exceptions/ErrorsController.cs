using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

[AllowAnonymous]
[ApiExplorerSettings(IgnoreApi = true)]
public class ErrorsController : ControllerBase
{
    [Route("/error")]
    public IActionResult Error()
    {
        var context = HttpContext.Features.Get<IExceptionHandlerFeature>()!;
        var exception = context.Error; // Your exception
        var code = 500; // Internal Server Error by default

        if (exception.GetType() == typeof(HttpResponseException))
        {
            code = (int)((HttpResponseException)exception).StatusCode;
        }
        // reset the response
        Response.StatusCode = code;
        Response.ContentType = "application/json";

        return new JsonResult(new { StatusCode = code, Message = exception.Message });
    }
}