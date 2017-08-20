using System.ComponentModel.DataAnnotations;

namespace WebApplication.ViewModels
{
    public class SignUpViewModel
    {
		[Required]
		public string FirstName { get; set; }
	    [Required]
		public string LastName { get; set; }
	    [Required]
		public string Email { get; set; }
	    [Required]
		public string Password { get; set; }
    }
}
