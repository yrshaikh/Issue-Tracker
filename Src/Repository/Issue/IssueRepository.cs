﻿using Microsoft.Extensions.Configuration;
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
	    public static string UpdateStatus = "Issue_Update_Status";
	    public static string GetTimeline = "Issue_Get_Timeline";
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
			    new SqlParameter("@priority_id", SqlDbType.Int) {Value = priorityId},
			    new SqlParameter("@assignee_id", SqlDbType.Int) {Value = assigneeId},
            };

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

	    public List<IssueSummaryModel> GetByFilters(int userId)
	    {
	        List<DbParameter> parameterList = new List<DbParameter>
	        {
	            new SqlParameter("@user_id", SqlDbType.Int) {Value = userId}
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
	                        Status = (string)dataReader["status"]
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

	                        ClosedOn = (dataReader["closed_on"] == DBNull.Value) ? null : (DateTime?) dataReader["closed_on"],
	                        ClosedBy = (dataReader["closed_by"] == DBNull.Value) ? null : (string)dataReader["closed_by"],
	                        ClosedByEmail = (dataReader["closed_by_email"] == DBNull.Value) ? null : (string)dataReader["closed_by_email"],

                            ProjectId = (int)dataReader["project_id"],
                            ProjectName = (string)dataReader["project_name"],

	                        Status = (string)dataReader["status"]
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

	    public IssueRepository(IConfiguration config) : base(config)
	    {
	        
        }
	}
}
