using AutoMapper;
using Repository.Models.User;
using Repository.User;
using Service.ViewModels;
using Service.ViewModels.User;

namespace Service.Services.UserService
{
	public class UserService : IUserService
	{
		private readonly IUserRepository _userRepository;
		private readonly IMapper _mapper;

		public UserService(IUserRepository userRepository, IMapper mapper)
		{
			_userRepository = userRepository;
			_mapper = mapper;
		}

		public UserViewModel Create(SignUpViewModel user)
		{
			int createdUserId = _userRepository.Create(
				user.Email,
				user.Password,
				user.FirstName,
				user.LastName
			);

			// getting from repo and not constructing model from above, to make this service future proof.
			var userModel = _userRepository.Get(user.Email);
			return _mapper.Map<UserModel, UserViewModel>(userModel);
		}
	}
}
