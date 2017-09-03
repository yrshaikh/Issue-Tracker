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
	}
}