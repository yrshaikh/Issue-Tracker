using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Repository.Models.User;

namespace Repository.User
{
	sealed class UserStoredProcedures
	{
		public const string Insert = "User_Insert";
		public const string Get = "User_Get_By_Email";
		public const string Authenticate = "User_Authenticate";
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

			using (DbDataReader dataReader = base.GetDataReader(UserStoredProcedures.Insert, parameterList, CommandType.StoredProcedure))
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

		public UserModel Get(string email)
		{
			List<DbParameter> parameterList = new List<DbParameter>
			{
				new SqlParameter("@email", SqlDbType.VarChar) {Value = email}
			};
			
			var user = new UserModel();
			using (DbDataReader dataReader = base.GetDataReader(UserStoredProcedures.Get, parameterList, CommandType.StoredProcedure))
			{
				if (dataReader != null && dataReader.HasRows)
				{
					while (dataReader.Read())
					{
						user.Id = (int)dataReader["id"];
						user.Email = (string)dataReader["email"];
						user.FirstName = (string)dataReader["first_name"];
						user.LastName = (string)dataReader["last_name"];
					}
				}
			}

			return user;
		}
    
		public bool Authenticate(string email, string password)
		{
			List<DbParameter> parameterList = new List<DbParameter>
			{
				new SqlParameter("@email", SqlDbType.VarChar) {Value = email},
				new SqlParameter("@password", SqlDbType.VarChar) {Value = password},
			};

			bool valid = false;

			using (DbDataReader dataReader = base.GetDataReader(UserStoredProcedures.Authenticate, parameterList, CommandType.StoredProcedure))
			{
				if (dataReader != null && dataReader.HasRows)
				{
					valid = true;
				}
			}

			return valid;
		}

	    public UserRepository(IConfiguration config) : base(config)
	    {
	    }
	}
}