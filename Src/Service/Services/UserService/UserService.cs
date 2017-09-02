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

			return GetUserByEmail(user.Email);
		}

		public bool Authenticate(string email, string password)
		{
			return _userRepository.Authenticate(email, password);
		}

		public UserViewModel Get(string email)
		{
			return GetUserByEmail(email);
		}

		private UserViewModel GetUserByEmail(string email)
		{
			var userModel = _userRepository.Get(email);
			return _mapper.Map<UserModel, UserViewModel>(userModel);
		}
	}
}
