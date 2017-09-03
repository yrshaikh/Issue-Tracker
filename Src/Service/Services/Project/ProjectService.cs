using Repository.Project;
using Service.ViewModels.Project;

namespace Service.Services.Project
{
    public class ProjectService : IProjectService
    {
	    private readonly IProjectRepository _projectRepository;

	    public ProjectService(IProjectRepository projectRepository)
	    {
		    _projectRepository = projectRepository;
	    }

	    public void Create(NewProjectViewModel project, int createdById)
	    {
			_projectRepository.Create(project.Name, createdById);
		}
    }
}
