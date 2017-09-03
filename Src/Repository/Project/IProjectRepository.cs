namespace Repository.Project
{
	public interface IProjectRepository
	{
		void Create(string name, int createdById);
	}
}