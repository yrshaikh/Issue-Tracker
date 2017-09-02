using Service.ViewModels;
using Service.ViewModels.User;

namespace Service.Services.UserService
{
	public interface IUserService
	{
		UserViewModel Create(SignUpViewModel user);
	}
}