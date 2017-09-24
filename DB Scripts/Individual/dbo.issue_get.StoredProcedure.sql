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
/****** Object:  StoredProcedure [dbo].[issue_get]    Script Date: 9/24/2017 8:22:02 PM ******/
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
