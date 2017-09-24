using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Repository.Issue;
using Repository.Models.Issue;
using Service.Constants;
using Service.ViewModels.Issue;

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
		    return _issueRepository.Create(issue.ProjectId, issue.Title, issue.Description, userId);
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
            return new List<TimelineViewModel>()
            {
                new TimelineViewModel { Type = "status", CreatedBy = "Yasser Shaikh", CreatedByEmail = "yasser.s@outlook.com", CreatedOn = DateTime.Now, Content = "closed"},
                new TimelineViewModel { Type = "status", CreatedBy = "Ali Rizvi", CreatedByEmail = "ali.s@outlook.com", CreatedOn = DateTime.Now, Content = "reopened"},
                new TimelineViewModel { Type = "status", CreatedBy = "Yasser Shaikh", CreatedByEmail = "yasser.s@outlook.com", CreatedOn = DateTime.Now, Content = "closed"},
            };
        }

        public List<IssueSummaryViewModel> GetByFilters(int userId)
        {
            var issues = _issueRepository.GetByFilters(userId);
            return _mapper.Map<List<IssueSummaryModel>, List<IssueSummaryViewModel>>(issues).ToList();
        }
    }
}
