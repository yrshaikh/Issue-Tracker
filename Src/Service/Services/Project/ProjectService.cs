using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Repository.Models.Project;
using Repository.Project;
using Service.ViewModels.Project;

namespace Service.Services.Project
{
    public class ProjectService : IProjectService
    {
	    private readonly IProjectRepository _projectRepository;
	    private readonly IMapper _mapper;

	    public ProjectService(IProjectRepository projectRepository, IMapper mapper)
	    {
		    _projectRepository = projectRepository;
		    _mapper = mapper;
	    }

	    public void Create(NewProjectViewModel project, int createdById)
	    {
			_projectRepository.Create(project.Name, createdById);
		}

	    public List<ProjectListViewModel> Get(int userId)
	    {
		    var projects = _projectRepository.Get(userId);
		    return _mapper.Map<List<ProjectListModel>, List<ProjectListViewModel>>(projects).ToList();
	    }
    }
}
