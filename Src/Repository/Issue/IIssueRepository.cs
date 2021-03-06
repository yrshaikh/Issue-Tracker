﻿using System.Collections.Generic;
using Repository.Models.Issue;

namespace Repository.Issue
{
    public interface IIssueRepository
    {
        int Create(int projectId, string title, string description, int priorityId, int? assigneeId, int createdBy);
        List<IssueSummaryModel> GetByFilters(int userId, int status);
        SingleIssueModel Get(int issueId);
        void UpdateTitleDescription(int issueId, string title, string description, int updatedBy);
        void UpdateStatus(int issueId, int status, int userId);
        List<TimelineModel> GetTimeline(int id);
        void UpdateAssignee(int issueId, int? assigneeId, int userId);
        void UpdatePriority(int issueId, int priorityId, int userId);
        void NewComment(int issueId, string comment, int userId);
    }
}