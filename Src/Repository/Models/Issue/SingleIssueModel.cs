using System;

namespace Repository.Models.Issue
{
    public class SingleIssueModel
    {
        public int IssueId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public string CreatedBy { get; set; }
        public string CreatedByEmail { get; set; }
        public DateTime CreatedOn { get; set; }

        public string ClosedBy { get; set; }
        public string ClosedByEmail { get; set; }
        public DateTime? ClosedOn { get; set; }

        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        
        public int? AssigneeId { get; set; }
        public string AssigneeName { get; set; }

        public int? PriorityId { get; set; }
        public string PriorityName { get; set; }

        public string Status { get; set; }
    }
}
