USE [master]
GO
/****** Object:  Database [app]    Script Date: 12/29/2017 1:02:09 PM ******/
CREATE DATABASE [app]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'app', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\app.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'app_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\app_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [app].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [app] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [app] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [app] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [app] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [app] SET ARITHABORT OFF 
GO
ALTER DATABASE [app] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [app] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [app] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [app] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [app] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [app] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [app] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [app] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [app] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [app] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [app] SET  DISABLE_BROKER 
GO
ALTER DATABASE [app] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [app] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [app] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [app] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [app] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [app] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [app] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [app] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [app] SET  MULTI_USER 
GO
ALTER DATABASE [app] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [app] SET DB_CHAINING OFF 
GO
ALTER DATABASE [app] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [app] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
USE [app]
GO
/****** Object:  StoredProcedure [dbo].[issue_get]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  -- Author:  Yasser Shaikh  -- Create date: 14rd September 2017  -- Description: Get list of issues-- =============================================  -- Sample Call  -- exec issue_get 2-- =============================================  
CREATE PROCEDURE [dbo].[issue_get]    @user_id int, @status int = 1AS  BEGIN   -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.
 SET NOCOUNT ON;

 CREATE TABLE #TempTable
 	(
		id INT
		, title VARCHAR(100)
		, created_by VARCHAR(100)
		, created_by_email VARCHAR(100)
		, created_on DATETIME
		, status_id INT
		, status VARCHAR(10)
	)

 INSERT INTO #TempTable
	(
		id
		, title
		, created_by
		, created_by_email
		, created_on
		, status_id
		, status
	)
 SELECT
	issue.id
	, issue.title
	, users.first_name + ' ' + users.last_name as created_by
	, users.email as created_by_email
	, issue.created_on
	, status.id as status_id
	, status.value as status
 FROM Issues issue
 INNER JOIN ProjectUsers pu
	ON pu.user_id = @user_id
	AND pu.project_id = issue.project_id
 INNER JOIN Users users
	ON users.id = pu.user_id
 INNER JOIN Status status 	ON status.id = issue.status;

 DECLARE @open INT, @closed INT;
 SET @open = (SELECT COUNT(*) FROM #TempTable WHERE status_id = 1);
 SET @closed = (SELECT COUNT(*) FROM #TempTable WHERE status_id = 2);

 SELECT 
	id
	, title
	, created_by
	, created_by_email
	, created_on
	, status
	, @open as open_count
	, @closed as closed_count
 FROM #TempTable	
 WHERE status_id = @status

END



GO
/****** Object:  StoredProcedure [dbo].[issue_get_single]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 16th September 2017  
-- Description: Get details of issue.
-- =============================================  
-- Sample Call  
-- exec issue_get_single 1
-- =============================================  
CREATE PROCEDURE [dbo].[issue_get_single]   
 @issue_id int
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  

 SELECT 
	DISTINCT(issue.id) as issue_id,

	issue.title as title,
	issue.description as description,

	users_opened.first_name + ' ' + users_opened.last_name as created_by,
	users_opened.email as created_by_email,
	issue.created_on,

	users_closed.first_name + ' ' + users_closed.last_name as closed_by,
	users_closed.email as closed_by_email,
	issue.closed_on,

	projects.id as project_id,
	projects.name as project_name,

	users_assignee.id as assignee_id,
	users_assignee.first_name + ' ' + users_assignee.last_name as assignee_name,

	priority.id as priority_id,
	priority.value as priority_value,	

	status.value as status
 FROM Issues issue
 JOIN ProjectUsers pu 
	ON
	pu.project_id = issue.project_id
 INNER JOIN Users users_opened
	ON users_opened.id = issue.created_by
 LEFT OUTER JOIN Users users_closed
	ON users_closed.id = issue.closed_by
 LEFT OUTER JOIN Users users_assignee
	ON users_assignee.id = issue.assigned_to
 LEFT OUTER JOIN Priority priority
	ON priority.id = issue.priority_id
 INNER JOIN Projects projects
	ON projects.id = issue.project_id
 INNER JOIN Status status
	ON status.id = issue.status
 WHERE issue.id = @issue_id;
END

GO
/****** Object:  StoredProcedure [dbo].[issue_get_timeline]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:  Yasser Shaikh 
-- Create date: 16th September 2017
-- Description: Get details of issue.
-- =============================================
-- Sample Call 
-- exec issue_get_timeline 3
-- =============================================  
CREATE PROCEDURE [dbo].[issue_get_timeline]   

 @issue_id int

AS  

BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from 
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;

IF OBJECT_ID ('tempdb..#TempTimeline') IS NOT NULL
	DROP TABLE #TempTimeline;
CREATE TABLE #TempTimeline(TYPE VARCHAR(10), created_on DATETIME, created_by VARCHAR(50), created_by_email VARCHAR(50), content VARCHAR(max));

INSERT INTO #TempTimeline
 SELECT 
	'status' as type,
	history.created_on as created_on,
	users.first_name + ' ' + users.last_name as created_by,
	users.email as created_by_email,
	status.value as content
 FROM StatusHistory history
 JOIN Issues issue
	ON issue.id = history.issue_id
 JOIN Status status
	ON status.id = history.status_id
 JOIN Users users
	ON  users.id = history.created_by
 WHERE issue_id = @issue_id;

 INSERT INTO #TempTimeline
  SELECT 
	'priority' as type,
	history.created_on as created_on,
	users.first_name + ' ' + users.last_name as created_by,
	users.email as created_by_email,
	priority.value as content
 FROM PriorityHistory history
 JOIN Issues issue
	ON issue.id = history.issue_id
 JOIN Priority priority
	ON priority.id = history.priority_id
 JOIN Users users
	ON  users.id = history.created_by
 WHERE issue_id = @issue_id;

  INSERT INTO #TempTimeline
  SELECT 
	'assignee' as type,
	history.created_on as created_on,
	users.first_name + ' ' + users.last_name as created_by,
	users.email as created_by_email,
	usersa.first_name + ' ' + usersa.last_name as content
 FROM AssigneeHistory history
 --JOIN Issues issue
	--ON issue.id = history.issue_id
 JOIN Users usersa
	ON usersa.id = history.assignee_id
 JOIN Users users
	ON  users.id = history.created_by
 WHERE issue_id = @issue_id;

  INSERT INTO #TempTimeline
  SELECT 
	'comment' as type,
	history.created_on as created_on,
	users.first_name + ' ' + users.last_name as created_by,
	users.email as created_by_email,
	history.comment as content
 FROM CommentHistory history
 JOIN Users users
	ON  users.id = history.created_by
 WHERE issue_id = @issue_id;

 SELECT * FROM #TempTimeline
 ORDER BY created_on;

END




GO
/****** Object:  StoredProcedure [dbo].[issue_insert]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 9th September 2017  
-- Description: Insert into issues table  
-- =============================================  
-- Sample Call  
-- exec issue_insert 1, 'sample title of an issue', 'description of the issue', 1,  '2017-08-22 22:25:22.130', 3, 1;  
-- =============================================  
CREATE PROCEDURE [dbo].[issue_insert]
 @project_id int,   
 @title varchar(100),
 @description varchar(MAX),
 @created_by int,  
 @created_on datetime, 
 @priority_id int,
 @assignee_id int = NULL
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 INSERT INTO Issues  
 (
  project_id  
  , title
  , description  
  , created_by  
  , created_on
  , status
  , priority_id
  , assigned_to
  , assigned_on
 )  
 VALUES  
 (
  @project_id
  , @title
  , @description
  , @created_by
  , @created_on
  , 1
  , @priority_id
  , @assignee_id
  , @created_on
 );  

 SELECT SCOPE_IDENTITY() as issue_id;

END


GO
/****** Object:  StoredProcedure [dbo].[issue_new_comment]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  

-- Author:  Yasser Shaikh
-- Create date: 28th October 2017
-- Description: Create new comment

-- =============================================  

-- Sample Call
-- exec issue_new_comment 1, 'my first comment', 1, '2017-08-22 22:25:22.130';  

-- =============================================  

CREATE PROCEDURE [dbo].[issue_new_comment]

 @issue_id int,
 @comment varchar(max),
 @created_by int,
 @created_on datetime

AS  

BEGIN  

 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.  

 SET NOCOUNT ON;   

 UPDATE Issues
 SET
	updated_by = @created_by,
	updated_on = @created_on
 WHERE id = @issue_id;

 INSERT INTO CommentHistory(issue_id, comment, created_by, created_on)
 VALUES (@issue_id, @comment, @created_by, @created_on);
 
END




GO
/****** Object:  StoredProcedure [dbo].[issue_update_assignee]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ============================================= 
-- Author:  Yasser Shaikh
-- Create date: 10th October 2017
-- Description: Update issue assignee
-- =============================================  
-- Sample Call
-- exec issue_update_assignee 1, 2, 1, '2017-08-22 22:25:22.130';  
-- =============================================  

CREATE PROCEDURE [dbo].[issue_update_assignee]
 @issue_id int,
 @assignee_id int = null,
 @updated_by int,
 @updated_on datetime

AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.
 SET NOCOUNT ON;

 UPDATE Issues
 SET
	assigned_to = @assignee_id,
	assigned_on = @updated_on,
	updated_by = @updated_by,
	updated_on = @updated_on
 WHERE id = @issue_id;

 INSERT INTO AssigneeHistory(issue_id, assignee_id, created_by, created_on)
 VALUES (@issue_id, @assignee_id, @updated_by, @updated_on);
 
END




GO
/****** Object:  StoredProcedure [dbo].[issue_update_priority]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  

-- Author:  Yasser Shaikh
-- Create date: 10th October 2017
-- Description: Update issue priority

-- =============================================  

-- Sample Call
-- exec issue_update_priority 1, 2, 1, '2017-08-22 22:25:22.130';  

-- =============================================  

CREATE PROCEDURE [dbo].[issue_update_priority]

 @issue_id int,
 @priority_id int,
 @updated_by int,
 @updated_on datetime

AS  

BEGIN  

 -- SET NOCOUNT ON added to prevent extra result sets from
 -- interfering with SELECT statements.  

 SET NOCOUNT ON;   

 UPDATE Issues
 SET
	priority_id = @priority_id,
	assigned_on = @updated_on,
	updated_by = @updated_by,
	updated_on = @updated_on
 WHERE id = @issue_id;

 INSERT INTO PriorityHistory(issue_id, priority_id, created_by, created_on)
 VALUES (@issue_id, @priority_id, @updated_by, @updated_on);
 
END




GO
/****** Object:  StoredProcedure [dbo].[issue_update_status]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 23rd September 2017  
-- Description: Update issue status 
-- =============================================  
-- Sample Call  
-- exec issue_update_status 1, 2, 1, '2017-08-22 22:25:22.130';  
-- =============================================  
CREATE PROCEDURE [dbo].[issue_update_status]
 @issue_id int,   
 @status_id int,
 @created_by int,  
 @created_on datetime
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 UPDATE Issues
 SET
	status = @status_id,
	updated_by = @created_by,
	updated_on = @created_on,
	closed_by = @created_by,
	closed_on = @created_on
 WHERE id = @issue_id;
 
 INSERT INTO StatusHistory(issue_id, status_id, created_by, created_on) 
	VALUES(@issue_id, @status_id, @created_by, @created_on);

END


GO
/****** Object:  StoredProcedure [dbo].[issue_update_title_description]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 17th September 2017  
-- Description: Update title and description of issue
-- =============================================  
-- Sample Call  
-- exec issue_update_title_description 1, 'udpated title', 'updated desc', 1, '2017-08-22 22:25:22.130';
-- =============================================  
CREATE PROCEDURE [dbo].[issue_update_title_description]   
 @issue_id int,
 @title varchar(100),
 @description varchar(MAX),
 @updated_by int,
 @updated_on datetime
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;

 UPDATE Issues
	SET 
		title = @title,
		description = @description,
		updated_by = @updated_by,
		updated_on = @updated_on
 WHERE id = @issue_id;

END





GO
/****** Object:  StoredProcedure [dbo].[project_get]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 3rd September 2017  
-- Description: Get list of projects
-- =============================================  
-- Sample Call  
-- exec project_get 1
-- =============================================  
CREATE PROCEDURE [dbo].[project_get]   
 @user_id int
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  

 SELECT 
	p.id,
	p.name,
	p.created_on,
	(
		SELECT COUNT(*) 
		FROM ProjectUsers ipu
		WHERE ipu.project_id = p.id
	) as user_count
FROM ProjectUsers pu
INNER JOIN Projects p
	ON pu.project_id = p.id
WHERE 
	pu.user_id = @user_id
     
END


GO
/****** Object:  StoredProcedure [dbo].[project_get_assignees]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 27th September 2017  
-- Description: Get list of users for assignee
-- =============================================  
-- Sample Call  
-- exec project_get_assignees 5
-- =============================================  
CREATE PROCEDURE [dbo].[project_get_assignees]
 @project_id int
AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  

 SELECT 
	 users.id,
	 users.first_name,
	 users.last_name,
	 users.email
 FROM Users users
 JOIN ProjectUsers pusers
	ON pusers.user_id = users.id
	AND pusers.project_id = @project_id;
END



GO
/****** Object:  StoredProcedure [dbo].[project_get_priorities]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 27th September 2017  
-- Description: Get list of users for assignee
-- =============================================  
-- Sample Call  
-- exec project_get_priorities
-- =============================================  
CREATE PROCEDURE [dbo].[project_get_priorities]
AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  

 SELECT 
	 id,
	 value,
	 rank
 FROM Priority
END



GO
/****** Object:  StoredProcedure [dbo].[project_insert]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 29th August 2017  
-- Description: Insert into project table  
-- =============================================  
-- Sample Call  
-- exec project_insert 'yasser', 'shaikh', '2017-08-22 22:25:22.130', 'yrshaikh.mail@gmail.com', 'password';  
-- =============================================  
CREATE PROCEDURE [dbo].[project_insert]   
 @name varchar(50),  
 @created_by int,  
 @created_on datetime
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 INSERT INTO Projects  
 (  
  name  
  , created_by  
  , created_on
  , status
 )  
 VALUES  
 (  
  @name,  
  @created_by,  
  @created_on,
  1
 );  

 INSERT INTO ProjectUsers 
 (  
  project_id  
  , user_id  
  , created_on
 )  
 VALUES  
 (  
  SCOPE_IDENTITY(),  
  @created_by,  
  @created_on
 );  
END

GO
/****** Object:  StoredProcedure [dbo].[user_authenticate]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 2nd September 2017  
-- Description: Validate credentials of a user
-- =============================================  
-- Sample Call  
-- exec user_authenticate 'yrshaikh.mail@gmail.com', 'password'
-- =============================================  
CREATE PROCEDURE [dbo].[user_authenticate]  
 @email varchar(50),
 @password varchar(50)
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 SELECT 
	email as email	
 FROM Users  
 WHERE 
	email = @email and 
	password = @password;
END


GO
/****** Object:  StoredProcedure [dbo].[user_get_by_email]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 22nd August 2017  
-- Description: Get user details by email
-- =============================================  
-- Sample Call  
-- exec user_get_email 'yrshaikh.mail@gmail.com'
-- =============================================  
CREATE PROCEDURE [dbo].[user_get_by_email]  
 @email varchar(50)
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 SELECT 
	id as id,
	email as email,
	first_name as first_name,
	last_name as last_name
 FROM Users  
 WHERE email = @email;
END


GO
/****** Object:  StoredProcedure [dbo].[user_insert]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 22nd August 2017  
-- Description: Insert into user table  
-- =============================================  
-- Sample Call  
-- exec user_insert 'yasser', 'shaikh', '2017-08-22 22:25:22.130', 'yrshaikh.mail@gmail.com', 'password';  
-- =============================================  
CREATE PROCEDURE [dbo].[user_insert]   
 @first_name varchar(50),  
 @last_name varchar(50),  
 @created_on datetime,  
 @email varchar(50),  
 @password varchar(50)  
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 INSERT INTO Users  
 (  
  first_name  
  , last_name  
  , created_on  
  , email  
  , password  
 )  
 VALUES  
 (  
  @first_name,  
  @last_name,  
  @created_on,  
  @email,  
  @password    
 );  
END


GO
/****** Object:  Table [dbo].[AssigneeHistory]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssigneeHistory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[issue_id] [int] NOT NULL,
	[assignee_id] [int] NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
 CONSTRAINT [PK_AssigneeHistory] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CommentHistory]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CommentHistory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[issue_id] [int] NOT NULL,
	[comment] [varchar](max) NOT NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
 CONSTRAINT [PK_CommentHistory] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Issues]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Issues](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[title] [varchar](100) NOT NULL,
	[description] [varchar](max) NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
	[updated_by] [int] NULL,
	[updated_on] [datetime] NULL,
	[status] [tinyint] NULL,
	[closed_by] [int] NULL,
	[closed_on] [datetime] NULL,
	[priority_id] [tinyint] NULL,
	[assigned_to] [int] NULL,
	[assigned_on] [datetime] NULL,
 CONSTRAINT [PK_Issues] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Priority]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Priority](
	[id] [tinyint] NOT NULL,
	[value] [varchar](10) NOT NULL,
	[rank] [tinyint] NOT NULL,
 CONSTRAINT [PK_Priority] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PriorityHistory]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriorityHistory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[issue_id] [int] NOT NULL,
	[priority_id] [tinyint] NOT NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
 CONSTRAINT [PK_PriorityHistory] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Projects]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Projects](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
	[status] [tinyint] NULL,
 CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ProjectUsers]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectUsers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
 CONSTRAINT [PK_ProjectUsers] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Status]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Status](
	[id] [tinyint] NOT NULL,
	[value] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[StatusHistory]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusHistory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[issue_id] [int] NOT NULL,
	[status_id] [tinyint] NOT NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
 CONSTRAINT [PK_StatusHistory] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 12/29/2017 1:02:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[created_on] [datetime] NOT NULL,
	[email] [varchar](250) NOT NULL,
	[password] [varchar](250) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[AssigneeHistory]  WITH CHECK ADD  CONSTRAINT [FK_AssigneeHistory_Issues] FOREIGN KEY([issue_id])
REFERENCES [dbo].[Issues] ([id])
GO
ALTER TABLE [dbo].[AssigneeHistory] CHECK CONSTRAINT [FK_AssigneeHistory_Issues]
GO
ALTER TABLE [dbo].[AssigneeHistory]  WITH CHECK ADD  CONSTRAINT [FK_AssigneeHistory_Users] FOREIGN KEY([assignee_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[AssigneeHistory] CHECK CONSTRAINT [FK_AssigneeHistory_Users]
GO
ALTER TABLE [dbo].[AssigneeHistory]  WITH CHECK ADD  CONSTRAINT [FK_AssigneeHistory_Users1] FOREIGN KEY([created_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[AssigneeHistory] CHECK CONSTRAINT [FK_AssigneeHistory_Users1]
GO
ALTER TABLE [dbo].[CommentHistory]  WITH CHECK ADD  CONSTRAINT [FK_CommentHistory_Issues] FOREIGN KEY([issue_id])
REFERENCES [dbo].[Issues] ([id])
GO
ALTER TABLE [dbo].[CommentHistory] CHECK CONSTRAINT [FK_CommentHistory_Issues]
GO
ALTER TABLE [dbo].[CommentHistory]  WITH CHECK ADD  CONSTRAINT [FK_CommentHistory_Users] FOREIGN KEY([created_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[CommentHistory] CHECK CONSTRAINT [FK_CommentHistory_Users]
GO
ALTER TABLE [dbo].[Issues]  WITH CHECK ADD  CONSTRAINT [FK_Issues_Priority] FOREIGN KEY([priority_id])
REFERENCES [dbo].[Priority] ([id])
GO
ALTER TABLE [dbo].[Issues] CHECK CONSTRAINT [FK_Issues_Priority]
GO
ALTER TABLE [dbo].[Issues]  WITH CHECK ADD  CONSTRAINT [FK_Issues_Projects] FOREIGN KEY([project_id])
REFERENCES [dbo].[Projects] ([id])
GO
ALTER TABLE [dbo].[Issues] CHECK CONSTRAINT [FK_Issues_Projects]
GO
ALTER TABLE [dbo].[Issues]  WITH CHECK ADD  CONSTRAINT [FK_Issues_Status] FOREIGN KEY([status])
REFERENCES [dbo].[Status] ([id])
GO
ALTER TABLE [dbo].[Issues] CHECK CONSTRAINT [FK_Issues_Status]
GO
ALTER TABLE [dbo].[Issues]  WITH CHECK ADD  CONSTRAINT [FK_Issues_Users] FOREIGN KEY([created_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Issues] CHECK CONSTRAINT [FK_Issues_Users]
GO
ALTER TABLE [dbo].[Issues]  WITH CHECK ADD  CONSTRAINT [FK_Issues_Users_ClosedBy] FOREIGN KEY([closed_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Issues] CHECK CONSTRAINT [FK_Issues_Users_ClosedBy]
GO
ALTER TABLE [dbo].[Issues]  WITH CHECK ADD  CONSTRAINT [FK_Issues_Users_UpdatedBy] FOREIGN KEY([updated_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Issues] CHECK CONSTRAINT [FK_Issues_Users_UpdatedBy]
GO
ALTER TABLE [dbo].[PriorityHistory]  WITH CHECK ADD  CONSTRAINT [FK_PriorityHistory_Issues] FOREIGN KEY([issue_id])
REFERENCES [dbo].[Issues] ([id])
GO
ALTER TABLE [dbo].[PriorityHistory] CHECK CONSTRAINT [FK_PriorityHistory_Issues]
GO
ALTER TABLE [dbo].[PriorityHistory]  WITH CHECK ADD  CONSTRAINT [FK_PriorityHistory_Priority] FOREIGN KEY([priority_id])
REFERENCES [dbo].[Priority] ([id])
GO
ALTER TABLE [dbo].[PriorityHistory] CHECK CONSTRAINT [FK_PriorityHistory_Priority]
GO
ALTER TABLE [dbo].[PriorityHistory]  WITH CHECK ADD  CONSTRAINT [FK_PriorityHistory_Users] FOREIGN KEY([created_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[PriorityHistory] CHECK CONSTRAINT [FK_PriorityHistory_Users]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Projects] FOREIGN KEY([id])
REFERENCES [dbo].[Projects] ([id])
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Projects]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Status] FOREIGN KEY([status])
REFERENCES [dbo].[Status] ([id])
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Status]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Users] FOREIGN KEY([created_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Users]
GO
ALTER TABLE [dbo].[ProjectUsers]  WITH CHECK ADD  CONSTRAINT [FK_ProjectUsers_Projects] FOREIGN KEY([project_id])
REFERENCES [dbo].[Projects] ([id])
GO
ALTER TABLE [dbo].[ProjectUsers] CHECK CONSTRAINT [FK_ProjectUsers_Projects]
GO
ALTER TABLE [dbo].[ProjectUsers]  WITH CHECK ADD  CONSTRAINT [FK_ProjectUsers_Users] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[ProjectUsers] CHECK CONSTRAINT [FK_ProjectUsers_Users]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Issues] FOREIGN KEY([issue_id])
REFERENCES [dbo].[Issues] ([id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Issues]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Status] FOREIGN KEY([status_id])
REFERENCES [dbo].[Status] ([id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Status]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Users] FOREIGN KEY([created_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Users]
GO
USE [master]
GO
ALTER DATABASE [app] SET  READ_WRITE 
GO
