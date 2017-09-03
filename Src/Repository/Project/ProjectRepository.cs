using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace Repository.Project
{
	sealed class ProjectStoredProcedures
	{
		public const string Insert = "Project_Insert";
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
	}
}
