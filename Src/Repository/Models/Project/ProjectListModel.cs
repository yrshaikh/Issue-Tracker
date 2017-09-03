using System;

namespace Repository.Models.Project
{
    public class ProjectListModel
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public DateTime CreatedOn { get; set; }
		public int  UserCount { get; set; }
    }
}
