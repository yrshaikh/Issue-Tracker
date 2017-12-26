using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Repository.Issue;
using Repository.Models.Issue;
using Service.ViewModels.Issue;
using Service.ViewModels.Constants;

namespace Service.Services.Issue
{
    public class IssueService : IIssueService
    {
        private readonly IIssueRepository _issueRepository;
        private readonly IMapper _mapper;

        public IssueService(IIssueRepository issueRepository, IMapper mapper)
        {
            _issueRepository = issueRepository;
            _mapper = mapper;
        }

        public int Create(CreateIssueViewModel issue, int userId)
        {
            return _issueRepository.Create(issue.ProjectId, issue.Title, issue.Description, issue.PriorityId, issue.AssigneeId, userId);
        }

        public SingleIssueViewModel Get(int issueId)
        {
            var issues = _issueRepository.Get(issueId);
            return _mapper.Map<SingleIssueModel, SingleIssueViewModel>(issues);
        }

        public void UpdateTitleDescription(UpdateTitleDescriptionModel model, int userId)
        {
            _issueRepository.UpdateTitleDescription(model.IssueId, model.Title, model.Description, userId);
        }

        public void UpdateStatus(UpdateStatusModel model, int userId)
        {
            _issueRepository.UpdateStatus(model.IssueId, (int)model.Status, userId);
        }

        public List<TimelineViewModel> GetTimeline(int id)
        {
            var timeline = _issueRepository.GetTimeline(id);
            return _mapper.Map<List<TimelineModel>, List<TimelineViewModel>>(timeline).ToList();
        }

        public void UpdateAssignee(UpdateAssigneeModel assignee, int userId)
        {
            _issueRepository.UpdateAssignee(assignee.IssueId, assignee.AssigneeId, userId);
        }

        public void UpdatePriority(UpdatePriorityModel priority, int userId)
        {
            _issueRepository.UpdatePriority(priority.IssueId, priority.PriorityId, userId);
        }

        public void NewComment(CreateIssueCommentModel comment, int userId)
        {
            _issueRepository.NewComment(comment.IssueId, comment.Comment, userId);
        }

        public List<IssueSummaryViewModel> GetByFilters(int userId, string status)
        {
            var issues = _issueRepository.GetByFilters(userId, (int)GetIssueStatuses(status));
            return _mapper.Map<List<IssueSummaryModel>, List<IssueSummaryViewModel>>(issues).ToList();
        }

        private IssueStatuses GetIssueStatuses(string status)
        {
            IssueStatuses issueStatus = IssueStatuses.Open;
            if(status == "open")
            {
                issueStatus = IssueStatuses.Open;
            }
            if (status == "closed")
            {
                issueStatus = IssueStatuses.Closed;
            }
            return issueStatus;
        }
    }
}
