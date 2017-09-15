using System;
using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Models.Issue;
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

        [HttpGet("issue/{id}/{slug}")]
	    public IActionResult Issue(int id, string slug)
        {
            var issue = new SingleIssueViewModel
            {
                ProjectId = 1,
                ProjectName = "dummy project",
                IssueId = 321,
                Title = "How do you pay electricity bill using the mobile app?",
                Description = "Use scb app to pay.",
                CreatedBy = "John Cena",
                CreatedOn = DateTime.Now
            };
            ViewBag.Issue = issue;
            return View();
        }

	    [HttpGet]
	    public IActionResult Get()
	    {
	        var issues = _issueService.Get(AuthenticatedUser.UserId(User));
	        return Json(issues);
	    }
	}
}