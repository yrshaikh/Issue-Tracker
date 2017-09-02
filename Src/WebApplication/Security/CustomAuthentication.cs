using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Service.ViewModels.User;

namespace WebApplication.Security
{
	public sealed class RoleConstants
	{
		public const string Admin = "admin";
	}
	
    public class CustomAuthentication
    {
	    public async Task SignIn(HttpContext context, UserViewModel user)
	    {
			var claims = new List<Claim>()
		    {
			    new Claim(ClaimTypes.Name, string.Format("{0} {1}", user.FirstName, user.LastName)),
			    new Claim(ClaimTypes.Role, RoleConstants.Admin),
			    new Claim(ClaimTypes.Email, user.Email)
		    };
		    var userPrincipal = new ClaimsPrincipal(new ClaimsIdentity(claims, "blackmagic"));
		    await context.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(userPrincipal));
		}

	    public async Task SignOut(HttpContext context)
	    {
			await context.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
		}
	}
}
