using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Repository.Models.Project;

namespace Repository.Project
{
	sealed class ProjectStoredProcedures
	{
		public const string Insert = "Project_Insert";
		public const string Get = "Project_Get";
		public const string GetAssignees = "Project_Get_Assignees";
		public const string GetPriorities = "Project_Get_Priorities";
	}

	public class ProjectRepository : BaseDataAccess, IProjectRepository
	{
		public void Create(string name, int createdById)
		{
			List<DbParameter> parameterList = new List<DbParameter>
			{
				new SqlParameter("@name", SqlDbType.VarChar) {Value = name},
				new SqlParameter("@created_by", SqlDbType.Int) {Value = createdById},
				new SqlParameter("@created_on", SqlDbType.DateTime) {Value = DateTime.Now}
			};
			base.ExecuteNonQuery(ProjectStoredProcedures.Insert, parameterList, CommandType.StoredProcedure);
		}

		public List<ProjectListModel> Get(int userId)
		{
			List<DbParameter> parameterList = new List<DbParameter>
			{
				new SqlParameter("@user_id", SqlDbType.Int) {Value = userId}
			};
			var projects = new List<ProjectListModel>();
			using (DbDataReader dataReader = base.GetDataReader(ProjectStoredProcedures.Get, parameterList, CommandType.StoredProcedure))
			{
				if (dataReader != null && dataReader.HasRows)
				{
					while (dataReader.Read())
					{
						var project = new ProjectListModel
						{
							Id = (int) dataReader["id"],
							Name = (string) dataReader["name"],
							CreatedOn = (DateTime) dataReader["created_on"],
							UserCount = (int) dataReader["user_count"]
						};
						projects.Add(project);
					}
				}
			}

			return projects;
		}

	    public List<PrioritiesModel> GetPiorities()
	    {
            var priorities = new List<PrioritiesModel>();
	        using (DbDataReader dataReader = base.GetDataReader(ProjectStoredProcedures.GetPriorities, new List<DbParameter>(), CommandType.StoredProcedure))
	        {
	            if (dataReader != null && dataReader.HasRows)
	            {
	                while (dataReader.Read())
	                {
	                    var priority = new PrioritiesModel
                        {
	                        Id = (int)(byte)dataReader["id"],
	                        Rank = (int)(byte)dataReader["rank"],
	                        Value = (string)dataReader["value"]
	                    };
	                    priorities.Add(priority);
	                }
	            }
	        }

	        return priorities;
        }

	    public List<ProjectAssigneesModel> GetProjectAssignees(int projectId)
	    {
	        List<DbParameter> parameterList = new List<DbParameter>
	        {
	            new SqlParameter("@project_id", SqlDbType.Int) {Value = projectId}
	        };
            var assignees = new List<ProjectAssigneesModel>();
	        using (DbDataReader dataReader = base.GetDataReader(ProjectStoredProcedures.GetAssignees, parameterList, CommandType.StoredProcedure))
	        {
	            if (dataReader != null && dataReader.HasRows)
	            {
	                while (dataReader.Read())
	                {
	                    var assignee = new ProjectAssigneesModel
                        {
	                        Id = (int)dataReader["id"],
	                        FirstName = (string)dataReader["first_name"],
	                        LastName = (string)dataReader["last_name"],
	                        Email = (string)dataReader["email"]
	                    };
	                    assignees.Add(assignee);
	                }
	            }
	        }

	        return assignees;
        }

	    public ProjectRepository(IConfiguration config) : base(config)
	    {
	    }
	}
}
