using System.Collections.Generic;
using Repository.Models.Project;

namespace Repository.Project
{
	public interface IProjectRepository
	{
		void Create(string name, int createdById);
		List<ProjectListModel> Get(int userId);
	}
}