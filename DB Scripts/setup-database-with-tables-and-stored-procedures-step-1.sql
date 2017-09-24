/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4446)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/
USE [master]
GO
/****** Object:  Database [app]    Script Date: 9/24/2017 8:21:34 PM ******/
CREATE DATABASE [app]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'app', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\app.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'app_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\app_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [app] SET COMPATIBILITY_LEVEL = 130
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
ALTER DATABASE [app] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [app] SET QUERY_STORE = OFF
GO
USE [app]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [app]
GO
/****** Object:  Table [dbo].[Issues]    Script Date: 9/24/2017 8:21:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
 CONSTRAINT [PK_Issues] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 9/24/2017 8:21:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  Table [dbo].[ProjectUsers]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  Table [dbo].[Status]    Script Date: 9/24/2017 8:21:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  Table [dbo].[StatusHistory]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 9/24/2017 8:21:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
/****** Object:  StoredProcedure [dbo].[issue_get]    Script Date: 9/24/2017 8:21:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 14rd September 2017  
-- Description: Get list of issues
-- =============================================  
-- Sample Call  
-- exec issue_get 1
-- =============================================  
CREATE PROCEDURE [dbo].[issue_get]   
 @user_id int
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  

 SELECT 
	issue.id,
	issue.title,
	users.first_name + ' ' + users.last_name as created_by,
	users.email as created_by_email,
	issue.created_on,
	status.value as status
 FROM Issues issue
 JOIN ProjectUsers pu 
	ON pu.user_id = @user_id
	AND pu.project_id = issue.project_id
 JOIN Users users
	ON users.id = pu.user_id
 JOIN Status status
	ON status.id = issue.status
END

GO
/****** Object:  StoredProcedure [dbo].[issue_get_single]    Script Date: 9/24/2017 8:21:34 PM ******/
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

	status.value as status
 FROM Issues issue
 JOIN ProjectUsers pu 
	ON 
	--pu.user_id = issue.created_by AND 
	pu.project_id = issue.project_id
 INNER JOIN Users users_opened
	ON users_opened.id = issue.created_by
 INNER JOIN Users users_closed
	ON users_closed.id = issue.closed_by
 JOIN Projects projects
	ON projects.id = issue.project_id
 JOIN Status status
	ON status.id = issue.status
 WHERE issue.id = @issue_id;
END


GO
/****** Object:  StoredProcedure [dbo].[issue_get_timeline]    Script Date: 9/24/2017 8:21:34 PM ******/
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
-- exec issue_get_timeline 2
-- =============================================  
CREATE PROCEDURE [dbo].[issue_get_timeline]   
 @issue_id int
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;

IF OBJECT_ID ('tempdb..#TempTimeline') is not null
drop table TempTimeline;

 SELECT 
	'status' as type,
	history.created_on as created_on,
	users.first_name + ' ' + users.last_name as created_by,
	users.email as created_by_email,
	status.value as content
 INTO #TempTimeline
 FROM StatusHistory history
 JOIN Issues issue
	ON issue.id = history.issue_id
 JOIN Status status
	ON status.id = history.status_id
 JOIN Users users
	ON  users.id = history.created_by
 WHERE issue_id = @issue_id;

-- To get last 4 weeks Letters count
 INSERT INTO #TempTimeline
 SELECT 'label', GETDATE(), 'John Doe', 'john@doe.com', 'enhancement';

 SELECT * FROM #TempTimeline;
END
GO
/****** Object:  StoredProcedure [dbo].[issue_insert]    Script Date: 9/24/2017 8:21:34 PM ******/
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
-- exec issue_insert 1, 'sample title of an issue', 'description of the issue', 1,  '2017-08-22 22:25:22.130';  
-- =============================================  
CREATE PROCEDURE [dbo].[issue_insert]
 @project_id int,   
 @title varchar(100),
 @description varchar(MAX),  
 @created_by int,  
 @created_on datetime
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
 )  
 VALUES  
 (
  @project_id,  
  @title,
  @description,  
  @created_by,  
  @created_on,
  1
 );  

 SELECT SCOPE_IDENTITY() as issue_id;

END
GO
/****** Object:  StoredProcedure [dbo].[issue_update_status]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[issue_update_title_description]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[project_get]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[project_insert]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[user_authenticate]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[user_get_by_email]    Script Date: 9/24/2017 8:21:34 PM ******/
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
/****** Object:  StoredProcedure [dbo].[user_insert]    Script Date: 9/24/2017 8:21:34 PM ******/
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
USE [master]
GO
ALTER DATABASE [app] SET  READ_WRITE 
GO
