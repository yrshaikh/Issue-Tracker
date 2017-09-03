using System.ComponentModel.DataAnnotations;

namespace Service.ViewModels.Project
{
    public class NewProjectViewModel
    {
	    [Required]
	    public string Name { get; set; }
	}
}
