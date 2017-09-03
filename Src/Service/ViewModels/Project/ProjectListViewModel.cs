using System;

namespace Service.ViewModels.Project
{
    public class ProjectListViewModel
    {
	    public int Id { get; set; }
	    public string Name { get; set; }
	    public DateTime CreatedOn { get; set; }
	    public int UserCount { get; set; }
	}
}
