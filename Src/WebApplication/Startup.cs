using System.IO;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Repository.Models.User;
using Repository.User;
using Service.Services.UserService;
using Service.ViewModels.User;

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
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			//app.Use(async (context, next) =>
			//{
			//	await next();
			//	if (context.Response.StatusCode == 404 &&
			//  !Path.HasExtension(context.Request.Path.Value) &&
			//  !context.Request.Path.Value.StartsWith("/api/"))
			//	{
			//		context.Request.Path = "/index.html";
			//		await next();
			//	}
			//});
			//app.UseMvcWithDefaultRoute();
			app.UseDefaultFiles();
			app.UseStaticFiles();

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
		}
	}
}
