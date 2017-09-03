using System.Linq;
using System.Security.Claims;

namespace WebApplication.Security
{
    public class AuthenticatedUser
    {
	    public static int UserId(ClaimsPrincipal user)
	    {
		    var id = user.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;
		    return int.Parse(id);
	    }
    }
}
