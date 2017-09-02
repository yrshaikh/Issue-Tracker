namespace Repository.Models.User
{
	public abstract class BaseUserModel
    {
		public int Id { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
    }
}
