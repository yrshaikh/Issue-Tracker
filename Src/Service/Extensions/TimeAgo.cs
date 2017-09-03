using System;

namespace Service.Extensions
{
    public static class TimeAgo
    {
	    const int Second = 1;
	    const int Minute = 60 * Second;
	    const int Hour = 60 * Minute;
	    const int Day = 24 * Hour;
	    const int Month = 30 * Day;

		public static string ToTimeAgo(this DateTime yourDate)
	    {
		    var ts = new TimeSpan(DateTime.Now.Ticks - yourDate.Ticks);
		    double delta = Math.Abs(ts.TotalSeconds);

		    if (delta < 1 * Minute)
			    return ts.Seconds == 1 ? "one second ago" : ts.Seconds + " seconds ago";

		    if (delta < 2 * Minute)
			    return "a minute ago";

		    if (delta < 45 * Minute)
			    return ts.Minutes + " minutes ago";

		    if (delta < 90 * Minute)
			    return "an hour ago";

		    if (delta < 24 * Hour)
			    return ts.Hours + " hours ago";

		    if (delta < 48 * Hour)
			    return "yesterday";

		    if (delta < 30 * Day)
			    return ts.Days + " days ago";

		    if (delta < 12 * Month)
		    {
			    int months = Convert.ToInt32(Math.Floor((double)ts.Days / 30));
			    return months <= 1 ? "one month ago" : months + " months ago";
		    }
		    else
		    {
			    int years = Convert.ToInt32(Math.Floor((double)ts.Days / 365));
			    return years <= 1 ? "one year ago" : years + " years ago";
		    }
		}
    }
}
