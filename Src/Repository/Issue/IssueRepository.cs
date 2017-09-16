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
	}

    public class IssueRepository : BaseDataAccess, IIssueRepository
	{
		public int Create(int projectId, string title, string description, int createdBy)
		{
			List<DbParameter> parameterList = new List<DbParameter>
			{
				new SqlParameter("@project_id", SqlDbType.VarChar) {Value = projectId},
				new SqlParameter("@title", SqlDbType.VarChar) {Value = title},
				new SqlParameter("@description", SqlDbType.VarChar) {Value = description},
				new SqlParameter("@created_by", SqlDbType.Int) {Value = createdBy},
				new SqlParameter("@created_on", SqlDbType.DateTime) {Value = DateTime.Now}
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

	    public List<IssueSummaryModel> Get(int userId)
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
	                        CreatedBy = (string)dataReader["created_by"]
	                    };
	                    issues.Add(issue);
	                }
	            }
	        }

	        return issues;
        }

	    public IssueRepository(IConfiguration config) : base(config)
	    {
	    }
	}
}
