USE [app]
GO
/****** Object:  StoredProcedure [dbo].[issue_get_single]    Script Date: 9/16/2017 5:43:46 PM ******/
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
	issue.id as issue_id,
	issue.title as title,
	issue.description as description,
	users.first_name + ' ' + users.last_name as created_by,
	issue.created_on,
	projects.id as project_id,
	projects.name as project_name
 FROM Issues issue
 JOIN ProjectUsers pu 
	ON pu.user_id = issue.created_by
	AND pu.project_id = issue.project_id
 JOIN Users users
	ON users.id = pu.user_id
 JOIN Projects projects
	ON projects.id = issue.project_id
 WHERE issue.id = @issue_id;
END



GO
