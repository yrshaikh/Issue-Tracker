using Microsoft.AspNetCore.Mvc;
using WebApplication.ViewModels;

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
				ModelState.AddModelError("key", "message"); 
		    }
		    return View(model);
	    }
	}
}