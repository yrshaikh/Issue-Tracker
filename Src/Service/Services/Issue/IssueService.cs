﻿using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Repository.Issue;
using Repository.Models.Issue;
using Repository.Models.Project;
using Service.ViewModels.Issue;
using Service.ViewModels.Project;

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

        public List<IssueSummaryViewModel> Get(int userId)
        {
            var issues = _issueRepository.Get(userId);
            return _mapper.Map<List<IssueSummaryModel>, List<IssueSummaryViewModel>>(issues).ToList();
        }
    }
}
