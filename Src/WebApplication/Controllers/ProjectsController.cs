using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
    public class ProjectsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}