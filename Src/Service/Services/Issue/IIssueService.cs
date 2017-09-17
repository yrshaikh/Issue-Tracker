using System.Collections.Generic;
using Service.ViewModels.Issue;

namespace Service.Services.Issue
{
	public interface IIssueService
	{
		int Create(CreateIssueViewModel issue, int userId);
	    List<IssueSummaryViewModel> GetByFilters(int userId);
        SingleIssueViewModel Get(int issueId);
	    void UpdateTitleDescription(UpdateTitleDescriptionModel model, int userId);
	}
}