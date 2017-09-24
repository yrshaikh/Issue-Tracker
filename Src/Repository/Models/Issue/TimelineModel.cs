using System;

namespace Repository.Models.Issue
{
    public class TimelineModel
    {
        public string Type { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByEmail { get; set; }
        public string Content { get; set; }
    }
}
