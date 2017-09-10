using Service.ViewModels.Issue;

namespace Service.Services.Issue
{
	public interface IIssueService
	{
		int Create(CreateIssueViewModel issue);
	}
}