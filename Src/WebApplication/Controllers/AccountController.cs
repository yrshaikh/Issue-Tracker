using Microsoft.AspNetCore.Mvc;
using Service.Services.UserService;
using Service.ViewModels;

namespace WebApplication.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult SignUp()
        {
            return View();
        }

		[HttpPost]
	    public IActionResult SignUp(SignUpViewModel model)
	    {
		    if (ModelState.IsValid)
		    {
			    new UserService().Create(model);
		    }
		    return View(model);
	    }

	    public IActionResult SignIn()
	    {
		    return View();
	    }

	    [HttpPost]
	    public IActionResult SignIn(SignInViewModel model)
	    {
		    if (ModelState.IsValid)
		    {
			    ModelState.AddModelError("key", "message");
		    }
		    return View(model);
	    }
	}
}