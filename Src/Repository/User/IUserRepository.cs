using Repository.Models.User;

namespace Repository.User
{
    public interface IUserRepository
    {
	    int Create(string email, string password, string firstname, string lastname);
	    UserModel Get(string email);
    }
}
