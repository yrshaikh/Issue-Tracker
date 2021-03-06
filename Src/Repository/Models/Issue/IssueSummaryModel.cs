﻿using System;

namespace Repository.Models.Issue
{
    public class IssueSummaryModel
    {
        public int IssueId { get; set; }
        public string Title { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByEmail { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Status { get; set; }
        public int OpenCount { get; set; }
        public int ClosedCount { get; set; }
        public int CommentsCount { get; set; }
    }
}
