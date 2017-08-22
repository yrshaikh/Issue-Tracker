using Repository.User;
using Service.ViewModels;

namespace Service.Services.UserService
{
	public class UserService : IUserService
	{
		public SignUpViewModel Create(SignUpViewModel user)
		{
			int createdUserId = new UserRepository().Create(
				user.Email,
				user.Password,
				user.FirstName,
				user.LastName
			);
			return user;
		}
	}
}
