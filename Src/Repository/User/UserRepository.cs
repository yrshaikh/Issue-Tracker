using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection.Metadata;

namespace Repository.User
{
	public sealed class UserStoredProcedures
	{
		public const string INSERT = "User_Insert";
	}

	public class UserRepository : BaseDataAccess, IUserRepository
	{
		public int Create(string email, string password, string firstname, string lastname)
		{
			List<DbParameter> parameterList = new List<DbParameter>
			{
				new SqlParameter("@email", SqlDbType.VarChar) {Value = email},
				new SqlParameter("@password", SqlDbType.VarChar) {Value = password},
				new SqlParameter("@created_on", SqlDbType.DateTime) {Value = DateTime.Now},
				new SqlParameter("@first_name", SqlDbType.VarChar) {Value = firstname},
				new SqlParameter("@last_name", SqlDbType.VarChar) {Value = lastname}
			};

			int createdUserId = -1;

			using (DbDataReader dataReader = base.GetDataReader(UserStoredProcedures.INSERT, parameterList, CommandType.StoredProcedure))
			{
				if (dataReader != null && dataReader.HasRows)
				{
					while (dataReader.Read())
					{
						createdUserId = (int)dataReader["id"];
					}
				}
			}

			return createdUserId;
		}
	}
}