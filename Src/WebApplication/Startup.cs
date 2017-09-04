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
using React.AspNet;

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
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddReact();

			services.AddMvc();
			services.AddAutoMapper();
			services.AddSingleton<IConfiguration>(Configuration);
			services.AddTransient<IUserService, UserService>();
			services.AddTransient<IUserRepository, UserRepository>();
			services.AddTransient<IProjectService, ProjectService>();
			services.AddTransient<IProjectRepository, ProjectRepository>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			//app.UseDefaultFiles();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				app.UseBrowserLink();
			}

			// Initialise ReactJS.NET. Must be before static files.
			app.UseReact(config =>
			{
				// If you want to use server-side rendering of React components,
				// add all the necessary JavaScript files here. This includes
				// your components as well as all of their dependencies.
				// See http://reactjs.net/ for more information. Example:
				//config
				//  .AddScript("~/Scripts/First.jsx")
				//  .AddScript("~/Scripts/Second.jsx");

				// If you use an external build too (for example, Babel, Webpack,
				// Browserify or Gulp), you can improve performance by disabling
				// ReactJS.NET's version of Babel and loading the pre-transpiled
				// scripts. Example:
				//config
				//  .SetLoadBabel(false)
				//  .AddScriptWithoutTransform("~/Scripts/bundle.server.js");
			});

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
					template: "{controller=Home}/{action=Index}/{id?}");
			});
		}
	}

	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<UserModel, UserViewModel>();
			CreateMap<ProjectListModel, ProjectListViewModel>();
		}
	}
}
