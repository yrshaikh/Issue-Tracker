using Microsoft.AspNetCore.Mvc;
using Service.Services.Project;
using Service.ViewModels.Project;
using WebApplication.Security;

namespace WebApplication.Controllers
{
    public class ProjectsController : Controller
    {
	    private readonly IProjectService _projectService;

	    public ProjectsController(IProjectService projectService)
	    {
		    this._projectService = projectService;
	    }

	    public IActionResult Index()
		{
			var projects = _projectService.Get(AuthenticatedUser.UserId(User));
			return View(projects);
        }

        public IActionResult New()
        {
            return View();
        }

	    [HttpPost]
	    public IActionResult New(NewProjectViewModel model)
	    {
		    if (ModelState.IsValid)
		    {
				_projectService.Create(model, AuthenticatedUser.UserId(User));

				return RedirectToAction("index", "projects");
		    }
		    return View(model);
	    }

        [HttpGet("get/priorities")]
        public IActionResult GetPriorities()
        {
            var priorities = _projectService.GetPriorities();
            return Json(priorities);
        }
        
        [HttpGet("get/{id}/assignees")]
        public IActionResult GetAssignees(int id)
        {
            var assignees = _projectService.GetProjectAssignees(id);
            return Json(assignees);
        }
    }
}