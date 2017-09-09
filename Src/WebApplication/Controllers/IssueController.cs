using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
	[Authorize]
	public class IssueController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		[HttpGet("issue/new")]
		public IActionResult New()
		{
			return View();
		}
	}
}