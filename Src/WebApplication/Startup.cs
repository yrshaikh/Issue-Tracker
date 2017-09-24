using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Repository.Models.Project;
using Repository.Models.User;
using Repository.Project;
using Repository.User;
using Service.Services.Project;
using Service.Services.User;
using Service.ViewModels.Project;
using Service.ViewModels.User;
using Microsoft.AspNetCore.Http;
using Repository.Issue;
using Repository.Models.Issue;
using Service.Services.Issue;
using Service.ViewModels.Issue;

namespace WebApplication
{
	public class Startup
	{
		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		public IConfigurationRoot Configuration { get; }
		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc();
			services.AddAutoMapper();
			services.AddSingleton<IConfiguration>(Configuration);
			services.AddTransient<IUserService, UserService>();
			services.AddTransient<IUserRepository, UserRepository>();
			services.AddTransient<IProjectService, ProjectService>();
			services.AddTransient<IProjectRepository, ProjectRepository>();
			services.AddTransient<IIssueService, IssueService>();
			services.AddTransient<IIssueRepository, IssueRepository>();

			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			//if (env.IsDevelopment())
			//{
			//	app.UseDeveloperExceptionPage();
			//	app.UseBrowserLink();
			//}

			//app.UseDefaultFiles(); // this line uses the html mode.
			app.UseStaticFiles();

			app.UseCookieAuthentication(new CookieAuthenticationOptions()
			{
				AutomaticAuthenticate = true,
				AutomaticChallenge = true,
				LoginPath = "/account/signin"
			});

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
			}

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller=Issue}/{action=Index}/{id?}");
			});
		}
	}

	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<UserModel, UserViewModel>();
			CreateMap<ProjectListModel, ProjectListViewModel>();
		    CreateMap<IssueSummaryModel, IssueSummaryViewModel>();
		    CreateMap<SingleIssueModel, SingleIssueViewModel>();
		    CreateMap<TimelineModel, TimelineViewModel>();
		}
	}
}
