using Service.ViewModels.Project;

namespace Service.Services.Project
{
	public interface IProjectService
	{
		void Create(NewProjectViewModel project, int createdById);
	}
}