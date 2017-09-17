using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
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
            SingleIssueViewModel issue = _issueService.Get(id);
            ViewBag.Issue = issue;
            return View();
        }

	    [HttpGet]
	    public IActionResult Get()
	    {
	        var issues = _issueService.GetByFilters(AuthenticatedUser.UserId(User));
	        return Json(issues);
	    }


	    [HttpPost]
	    public IActionResult UpdateTitleDescription([FromBody] UpdateTitleDescriptionModel model)
	    {
	        _issueService.UpdateTitleDescription(model, AuthenticatedUser.UserId(User));
	        return Json(HttpStatusCode.OK);
	    }
    }
}