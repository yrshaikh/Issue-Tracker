using System.Collections.Generic;
using Repository.Models.Issue;

namespace Repository.Issue
{
	public interface IIssueRepository
	{
		int Create(int projectId, string title, string description, int createdBy);
	    List<IssueSummaryModel> Get(int userId);
	}
}