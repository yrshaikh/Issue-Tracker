using Microsoft.Extensions.Configuration;
using Repository.Models.Issue;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace Repository.Issue
{
    public sealed class IssueStoredProcedure
    {
        public const string Insert = "Issue_Insert";
        public const string Get = "Issue_Get";
        public const string GetSingle = "Issue_Get_Single";
        public const string UpdateTitleDescription = "Issue_Update_Title_Description";
        public const string UpdateStatus = "Issue_Update_Status";
        public const string GetTimeline = "Issue_Get_Timeline";
        public const string UpdateAssignee = "Issue_Update_Assignee";
        public const string UpdatePriority = "Issue_Update_Priority";
        public static string NewComment = "Issue_New_Comment";
    }

    public class IssueRepository : BaseDataAccess, IIssueRepository
    {
        public int Create(int projectId, string title, string description, int priorityId, int? assigneeId, int createdBy)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@project_id", SqlDbType.VarChar) {Value = projectId},
                new SqlParameter("@title", SqlDbType.VarChar) {Value = title},
                new SqlParameter("@description", SqlDbType.VarChar) {Value = description},
                new SqlParameter("@created_by", SqlDbType.Int) {Value = createdBy},
                new SqlParameter("@created_on", SqlDbType.DateTime) {Value = DateTime.Now},
                new SqlParameter("@priority_id", SqlDbType.Int) {Value = priorityId}
            };

            if (assigneeId != null)
                parameterList.Add(new SqlParameter("@assignee_id", SqlDbType.Int) { Value = assigneeId });

            int issueId = -1;

            using (DbDataReader dataReader = base.GetDataReader(IssueStoredProcedure.Insert, parameterList, CommandType.StoredProcedure))
            {
                if (dataReader != null && dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        issueId = (int)(decimal)dataReader["issue_id"];
                    }
                }
            }

            return issueId;
        }

        public List<IssueSummaryModel> GetByFilters(int userId, int status)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@user_id", SqlDbType.Int) {Value = userId}
                , new SqlParameter("@status", SqlDbType.Int) {Value = status}
            };
            var issues = new List<IssueSummaryModel>();
            using (DbDataReader dataReader = base.GetDataReader(IssueStoredProcedure.Get, parameterList, CommandType.StoredProcedure))
            {
                if (dataReader != null && dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        var issue = new IssueSummaryModel
                        {
                            IssueId = (int)dataReader["id"],
                            Title = (string)dataReader["title"],
                            CreatedOn = (DateTime)dataReader["created_on"],
                            CreatedBy = (string)dataReader["created_by"],
                            CreatedByEmail = (string)dataReader["created_by_email"],
                            Status = (string)dataReader["status"],
                            OpenCount = (int)dataReader["open_count"],
                            ClosedCount = (int)dataReader["closed_count"],
                            CommentsCount = (int)dataReader["comments_count"]
                        };
                        issues.Add(issue);
                    }
                }
            }

            return issues;
        }

        public SingleIssueModel Get(int issueId)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@issue_id", SqlDbType.Int) {Value = issueId}
            };
            SingleIssueModel issue = null;
            using (DbDataReader dataReader = base.GetDataReader(IssueStoredProcedure.GetSingle, parameterList, CommandType.StoredProcedure))
            {
                if (dataReader != null && dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        issue = new SingleIssueModel()
                        {
                            IssueId = (int)dataReader["issue_id"],

                            Title = (string)dataReader["title"],
                            Description = (string)dataReader["description"],

                            CreatedOn = (DateTime)dataReader["created_on"],
                            CreatedBy = (string)dataReader["created_by"],
                            CreatedByEmail = (string)dataReader["created_by_email"],

                            ClosedOn = (dataReader["closed_on"] == DBNull.Value) ? null : (DateTime?)dataReader["closed_on"],
                            ClosedBy = (dataReader["closed_by"] == DBNull.Value) ? null : (string)dataReader["closed_by"],
                            ClosedByEmail = (dataReader["closed_by_email"] == DBNull.Value) ? null : (string)dataReader["closed_by_email"],

                            ProjectId = (int)dataReader["project_id"],
                            ProjectName = (string)dataReader["project_name"],

                            AssigneeId = (dataReader["assignee_id"] == DBNull.Value) ? null : (int?)dataReader["assignee_id"],
                            AssigneeName = (dataReader["assignee_name"] == DBNull.Value) ? null : (string)dataReader["assignee_name"],

                            PriorityId = (dataReader["priority_id"] == DBNull.Value) ? null : (int?)(byte)dataReader["priority_id"],
                            PriorityName = (dataReader["priority_value"] == DBNull.Value) ? null : (string)dataReader["priority_value"],

                            Status = (string)dataReader["status"],
                            CommentsCount = (int)dataReader["comments_count"]
                        };
                    }
                }
            }

            return issue;
        }

        public void UpdateTitleDescription(int issueId, string title, string description, int updatedBy)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@issue_id", SqlDbType.VarChar) {Value = issueId},
                new SqlParameter("@title", SqlDbType.VarChar) {Value = title},
                new SqlParameter("@description", SqlDbType.VarChar) {Value = description},
                new SqlParameter("@updated_by", SqlDbType.Int) {Value = updatedBy},
                new SqlParameter("@updated_on", SqlDbType.DateTime) {Value = DateTime.Now}
            };

            base.ExecuteNonQuery(IssueStoredProcedure.UpdateTitleDescription, parameterList, CommandType.StoredProcedure);
        }

        public void UpdateStatus(int issueId, int status, int userId)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@issue_id", SqlDbType.VarChar) {Value = issueId},
                new SqlParameter("@status_id", SqlDbType.Int) {Value = status},
                new SqlParameter("@created_by", SqlDbType.Int) {Value = userId},
                new SqlParameter("@created_on", SqlDbType.DateTime) {Value = DateTime.Now}
            };

            base.ExecuteNonQuery(IssueStoredProcedure.UpdateStatus, parameterList, CommandType.StoredProcedure);
        }

        public List<TimelineModel> GetTimeline(int id)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@issue_id", SqlDbType.Int) {Value = id}
            };
            var timeline = new List<TimelineModel>();
            using (DbDataReader dataReader = base.GetDataReader(IssueStoredProcedure.GetTimeline, parameterList, CommandType.StoredProcedure))
            {
                if (dataReader != null && dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        var item = new TimelineModel
                        {
                            Type = (string)dataReader["type"],
                            CreatedOn = (DateTime)dataReader["created_on"],
                            CreatedBy = (string)dataReader["created_by"],
                            CreatedByEmail = (string)dataReader["created_by_email"],
                            Content = (string)dataReader["content"]
                        };
                        timeline.Add(item);
                    }
                }
            }

            return timeline;
        }

        public void UpdateAssignee(int issueId, int? assigneeId, int userId)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@issue_id", SqlDbType.Int) {Value = issueId},
                new SqlParameter("@assignee_id", SqlDbType.Int) {Value = assigneeId},
                new SqlParameter("@updated_by", SqlDbType.Int) {Value = userId},
                new SqlParameter("@updated_on", SqlDbType.DateTime) {Value = DateTime.Now}
            };

            base.ExecuteNonQuery(IssueStoredProcedure.UpdateAssignee, parameterList, CommandType.StoredProcedure);
        }

        public void UpdatePriority(int issueId, int priorityId, int userId)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@issue_id", SqlDbType.Int) {Value = issueId},
                new SqlParameter("@priority_id", SqlDbType.Int) {Value = priorityId},
                new SqlParameter("@updated_by", SqlDbType.Int) {Value = userId},
                new SqlParameter("@updated_on", SqlDbType.DateTime) {Value = DateTime.Now}
            };

            base.ExecuteNonQuery(IssueStoredProcedure.UpdatePriority, parameterList, CommandType.StoredProcedure);
        }

        public void NewComment(int issueId, string comment, int userId)
        {
            List<DbParameter> parameterList = new List<DbParameter>
            {
                new SqlParameter("@issue_id", SqlDbType.Int) {Value = issueId},
                new SqlParameter("@comment", SqlDbType.VarChar) {Value = comment},
                new SqlParameter("@created_by", SqlDbType.Int) {Value = userId},
                new SqlParameter("@created_on", SqlDbType.DateTime) {Value = DateTime.Now}
            };

            base.ExecuteNonQuery(IssueStoredProcedure.NewComment, parameterList, CommandType.StoredProcedure);
        }

        public IssueRepository(IConfiguration config) : base(config)
        {

        }
    }
}
