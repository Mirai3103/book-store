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
        Console.WriteLine("ok");
        if (exception is HttpResponseException)
        {
            code = (int)((HttpResponseException)exception).StatusCode;
        }
        return new JsonResult(new { StatusCode = code, Message = exception.Message });
    }
}