namespace Service.ViewModels.User
{
	public abstract class BaseUserViewModel
	{
		public int Id { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}