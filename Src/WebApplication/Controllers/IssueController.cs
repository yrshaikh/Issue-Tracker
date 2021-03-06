﻿using System.Linq;
using System.Net;
using System.Security.Claims;
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
            _issueService = issueService;
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
            var issueId = _issueService.Create(model, AuthenticatedUser.UserId(User));
            return Json(issueId);
        }

        [HttpGet("issue/{id}/{slug}")]
        public IActionResult Issue(int id, string slug)
        {
            SingleIssueViewModel issue = _issueService.Get(id);
            ViewBag.Issue = issue;

            ViewBag.LoggedInUserFullName = User.Claims.First(x => x.Type == ClaimTypes.Name).Value;
            ViewBag.LoggedInUserEmailAddress = User.Claims.First(x => x.Type == ClaimTypes.Email).Value;
            return View();
        }

        [HttpGet]
        public IActionResult Get(string status)
        {
            var issues = _issueService.GetByFilters(AuthenticatedUser.UserId(User), status);
            return Json(issues);
        }

        [HttpGet("issue/{id}/timeline")]
        public IActionResult GetTimeline(int id)
        {
            var timeline = _issueService.GetTimeline(id);
            return Json(timeline);
        }

        [HttpPost]
        public IActionResult UpdateTitleDescription([FromBody] UpdateTitleDescriptionModel model)
        {
            _issueService.UpdateTitleDescription(model, AuthenticatedUser.UserId(User));
            return Json(HttpStatusCode.OK);
        }

        [HttpPost]
        public IActionResult UpdateStatus([FromBody] UpdateStatusModel status)
        {
            _issueService.UpdateStatus(status, AuthenticatedUser.UserId(User));
            return Json(HttpStatusCode.OK);
        }

        [HttpPost]
        public IActionResult UpdateAssignee([FromBody] UpdateAssigneeModel assignee)
        {
            _issueService.UpdateAssignee(assignee, AuthenticatedUser.UserId(User));
            return Json(HttpStatusCode.OK);
        }

        [HttpPost]
        public IActionResult UpdatePriority([FromBody] UpdatePriorityModel priority)
        {
            _issueService.UpdatePriority(priority, AuthenticatedUser.UserId(User));
            return Json(HttpStatusCode.OK);
        }

        [HttpPost]
        public IActionResult NewComment([FromBody] CreateIssueCommentModel comment)
        {
            _issueService.NewComment(comment, AuthenticatedUser.UserId(User));
            return Json(HttpStatusCode.OK);
        }
    }
}