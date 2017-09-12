using System;
using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services.Issue;
using Service.Services.Project;
using Service.ViewModels.Issue;
using WebApplication.Security;

namespace WebApplication.Controllers
{
	[Authorize]
	public class IssueController : Controller
	{
		private readonly IIssueService _issueService;
		private readonly IProjectService _projectService;

		public IssueController(IIssueService issueService, IProjectService projectService)
		{
			this._issueService = issueService;
			_projectService = projectService;
		}

		public IActionResult Index()
		{
			return View();
		}

		[HttpGet("issue/new")]
		public IActionResult New()
		{
			ViewBag.Projects = _projectService.Get(AuthenticatedUser.UserId(User));
			return View();
		}
		
		[HttpPost]
		public IActionResult New([FromBody] CreateIssueViewModel model)
		{
			_issueService.Create(model, AuthenticatedUser.UserId(User));
			return View();
		}

	    [HttpGet]
	    public IActionResult Get()
	    {
	        var issues = new List<IssueSummaryViewModel>
	        {
	            new IssueSummaryViewModel
	            {
	                IssueId = 336,
	                Title = "Login does not work as expected on IE 6 and 7 with emulation mode ON.",
	                CreatedBy = "Yasser Shaikh",
	                CreatedOn = "23rd Aug 2017 4:30 PM"
	            },
	            new IssueSummaryViewModel
	            {
	                IssueId = 23,
	                Title = "Change the font to Lato everywhere and adjust the font size if required.",
	                CreatedBy = "Harrison Wells",
	                CreatedOn = "Today 2:45 PM"
	            },
	            new IssueSummaryViewModel
	            {
	                IssueId = 336,
	                Title = "Login does not work as expected on IE 6 and 7 with emulation mode ON.",
	                CreatedBy = "Yasser Shaikh",
	                CreatedOn = "23rd Aug 2017 4:30 PM"
	            },
	            new IssueSummaryViewModel
	            {
	                IssueId = 23,
	                Title = "Change the font to Lato everywhere and adjust the font size if required.",
	                CreatedBy = "Harrison Wells",
	                CreatedOn = "Today 2:45 PM"
	            }
	        };
	        return Json(issues);
	    }
	}
}