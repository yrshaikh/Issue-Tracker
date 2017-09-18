using System;

namespace Repository.Models.Issue
{
    public class SingleIssueModel
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }

        public int IssueId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Status { get; set; }
    }
}
