using System;

namespace Repository.Models.Issue
{
    public class IssueSummaryModel
    {
        public int IssueId { get; set; }
        public string Title { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
