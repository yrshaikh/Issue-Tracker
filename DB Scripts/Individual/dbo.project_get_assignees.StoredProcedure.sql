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
/****** Object:  StoredProcedure [dbo].[project_get_assignees]    Script Date: 9/28/2017 12:33:46 AM ******/
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
