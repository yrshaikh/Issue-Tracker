using Repository.Issue;
using Service.ViewModels.Issue;

namespace Service.Services.Issue
{
    public class IssueService : IIssueService
    {
	    private readonly IIssueRepository _issueRepository;

	    public IssueService(IIssueRepository issueRepository)
	    {
		    _issueRepository = issueRepository;
	    }

	    public int Create(CreateIssueViewModel issue)
	    {
		    return _issueRepository.Create(issue.Title, issue.Description);
	    }
    }
}
