using System.ComponentModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Issue;
using Service.ViewModels.Issue;

namespace WebApplication.Controllers
{
	[Authorize]
	public class IssueController : Controller
	{
		private readonly IIssueService _issueService;

		public IssueController(IIssueService issueService)
		{
			this._issueService = issueService;
		}

		public IActionResult Index()
		{
			return View();
		}

		[HttpGet("issue/new")]
		public IActionResult New()
		{
			return View();
		}
		
		[HttpPost]
		public IActionResult New([FromBody] CreateIssueViewModel model)
		{
			_issueService.Create(model);
			return View();
		}
	}
}