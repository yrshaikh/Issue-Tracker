﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Service.Services.User;
using Service.ViewModels;
using WebApplication.Security;

namespace WebApplication.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        public IActionResult SignUp()
        {
            if (User.Identity.IsAuthenticated)
                return Redirect("/");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(SignUpViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _userService.Create(model);
                await new CustomAuthentication().SignIn(HttpContext, user);
                return Redirect("/");
            }
            return View(model);
        }

        public IActionResult SignIn()
        {
            if (User.Identity.IsAuthenticated)
                return Redirect("/");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(SignInViewModel model)
        {
            if (ModelState.IsValid
                && _userService.Authenticate(model.Email, model.Password))
            {
                var user = _userService.Get(model.Email);
                await new CustomAuthentication().SignIn(HttpContext, user);
                return Redirect("/");
            }
            ModelState.AddModelError("Login Failed", "Invalid username or password");
            return View(model);
        }

        public async Task<IActionResult> SignOut()
        {
            await new CustomAuthentication().SignOut(HttpContext);
            return RedirectToAction("signin");
        }
    }
}