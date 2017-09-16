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

	    public ProjectRepository(IConfiguration config) : base(config)
	    {
	    }
	}
}
