/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4446)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/
USE [app]
GO
/****** Object:  StoredProcedure [dbo].[issue_get_single]    Script Date: 9/24/2017 8:22:02 PM ******/
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
