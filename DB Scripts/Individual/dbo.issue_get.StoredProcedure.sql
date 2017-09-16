USE [app]
GO
/****** Object:  StoredProcedure [dbo].[issue_get]    Script Date: 9/16/2017 5:43:46 PM ******/
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
	issue.created_on
 FROM Issues issue
 JOIN ProjectUsers pu 
	ON pu.user_id = @user_id
	AND pu.project_id = issue.project_id
 JOIN Users users
	ON users.id = pu.user_id;
END


GO
