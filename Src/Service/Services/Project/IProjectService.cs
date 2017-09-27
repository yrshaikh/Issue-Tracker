using System.Collections.Generic;
using Service.ViewModels.Project;

namespace Service.Services.Project
{
	public interface IProjectService
	{
		void Create(NewProjectViewModel project, int createdById);
		List<ProjectListViewModel> Get(int userId);
	    List<ProjectAssigneesViewModel> GetProjectAssignees(int projectId);
	    List<PrioritiesViewModel> GetPriorities();
	}
}