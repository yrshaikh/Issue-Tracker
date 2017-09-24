using System;

namespace Service.ViewModels.Issue
{
    public class TimelineViewModel
    {
        public string Type { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByEmail { get; set; }
        public string Content { get; set; }
    }
}
