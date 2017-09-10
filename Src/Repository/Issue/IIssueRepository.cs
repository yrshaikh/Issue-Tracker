namespace Repository.Issue
{
	public interface IIssueRepository
	{
		int Create(string title, string description);
	}
}