using System;

namespace Service.ViewModels.Issue
{
    public class IssueSummaryViewModel
    {
        public int IssueId { get; set; }
        public string Title { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
    }
}