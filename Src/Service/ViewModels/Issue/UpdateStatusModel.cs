using Service.Constants;

namespace Service.ViewModels.Issue
{
    public class UpdateStatusModel
    {
        public int IssueId { get; set; }
        public IssueStatusConstants Status { get; set; }
    }
}