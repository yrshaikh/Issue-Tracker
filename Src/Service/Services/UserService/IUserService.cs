using Service.ViewModels;
using Service.ViewModels.User;

namespace Service.Services.UserService
{
	public interface IUserService
	{
		UserViewModel Create(SignUpViewModel user);
		bool Authenticate(string email, string password);
		UserViewModel Get(string email);
	}
}