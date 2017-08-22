using Service.ViewModels;

namespace Service.Services.UserService
{
	public interface IUserService
	{
		SignUpViewModel Create(SignUpViewModel user);
	}
}