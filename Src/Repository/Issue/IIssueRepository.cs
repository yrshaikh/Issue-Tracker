namespace Repository.Issue
{
	public interface IIssueRepository
	{
		int Create(int projectId, string title, string description, int createdBy);
	}
}