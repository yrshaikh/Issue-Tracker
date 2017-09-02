using Microsoft.AspNetCore.Mvc;
using Service.Services.UserService;
using Service.ViewModels;

namespace WebApplication.Controllers
{
    public class AccountController : Controller
    {
	    private readonly IUserService _userService;

		public AccountController(IUserService userService)
	    {
		    _userService = userService;
	    }

	    public IActionResult SignUp()
        {
            return View();
        }

		[HttpPost]
	    public IActionResult SignUp(SignUpViewModel model)
	    {
		    if (ModelState.IsValid)
		    {
			    var user = _userService.Create(model);
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