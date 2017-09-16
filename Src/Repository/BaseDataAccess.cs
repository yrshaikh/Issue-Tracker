using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace Repository
{
    public class BaseDataAccess
	{
		protected string ConnectionString;

		public BaseDataAccess(IConfiguration config)
		{
			ConnectionString = config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
		}

		//public BaseDataAccess(string connectionString)
		//{
		//	this.ConnectionString = connectionString;
		//}

		private SqlConnection GetConnection()
		{
			SqlConnection connection = new SqlConnection(ConnectionString);
			if (connection.State != ConnectionState.Open)
				connection.Open();
			return connection;
		}

		protected DbCommand GetCommand(DbConnection connection, string commandText, CommandType commandType)
		{
			SqlCommand command = new SqlCommand(commandText, connection as SqlConnection);
			command.CommandType = commandType;
			return command;
		}

		protected SqlParameter GetParameter(string parameter, object value)
		{
		    SqlParameter parameterObject = new SqlParameter(parameter, value ?? DBNull.Value)
		    {
		        Direction = ParameterDirection.Input
		    };
		    return parameterObject;
		}

		protected SqlParameter GetParameterOut(string parameter, SqlDbType type, object value = null, ParameterDirection parameterDirection = ParameterDirection.InputOutput)
		{
			SqlParameter parameterObject = new SqlParameter(parameter, type);

			if (type == SqlDbType.NVarChar || type == SqlDbType.VarChar || type == SqlDbType.NText || type == SqlDbType.Text)
			{
				parameterObject.Size = -1;
			}

			parameterObject.Direction = parameterDirection;

			parameterObject.Value = value ?? DBNull.Value;

			return parameterObject;
		}

		protected int ExecuteNonQuery(string procedureName, List<DbParameter> parameters, CommandType commandType = CommandType.StoredProcedure)
		{
			int returnValue = -1;

			try
			{
				using (SqlConnection connection = GetConnection())
				{
					DbCommand cmd = GetCommand(connection, procedureName, commandType);

					if (parameters != null && parameters.Count > 0)
					{
						cmd.Parameters.AddRange(parameters.ToArray());
					}

					returnValue = cmd.ExecuteNonQuery();
				}
			}
			catch (Exception ex)
			{
				//LogException("Failed to ExecuteNonQuery for " + procedureName, ex, parameters);  
				throw;
			}

			return returnValue;
		}

		protected object ExecuteScalar(string procedureName, List<SqlParameter> parameters)
		{
			object returnValue;

			try
			{
				using (DbConnection connection = this.GetConnection())
				{
					DbCommand cmd = this.GetCommand(connection, procedureName, CommandType.StoredProcedure);

					if (parameters != null && parameters.Count > 0)
					{
						cmd.Parameters.AddRange(parameters.ToArray());
					}

					returnValue = cmd.ExecuteScalar();
				}
			}
			catch (Exception ex)
			{
				//LogException("Failed to ExecuteScalar for " + procedureName, ex, parameters);  
				throw;
			}

			return returnValue;
		}

		protected DbDataReader GetDataReader(string procedureName, List<DbParameter> parameters, CommandType commandType = CommandType.StoredProcedure)
		{
			DbDataReader ds;

			try
			{
				DbConnection connection = this.GetConnection();
				{
					DbCommand cmd = this.GetCommand(connection, procedureName, commandType);
					if (parameters != null && parameters.Count > 0)
					{
						cmd.Parameters.AddRange(parameters.ToArray());
					}

					ds = cmd.ExecuteReader(CommandBehavior.CloseConnection);
				}
			}
			catch (Exception ex)
			{
				//LogException("Failed to GetDataReader for " + procedureName, ex, parameters);  
				throw;
			}

			return ds;
		}
	}
}
