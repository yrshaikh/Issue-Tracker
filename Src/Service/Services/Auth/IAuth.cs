namespace Service.Services.Auth
{
    public interface IAuth
    {
	    bool Authenticate(string username, string password);
    }
}
