namespace Repository.Auth
{
	public interface IAuthRepository
	{
		bool Validate(string username, string password);
	}
}