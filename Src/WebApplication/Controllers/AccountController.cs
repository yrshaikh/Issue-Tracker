using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult SignUp()
        {
            return View();
        }
    }
}