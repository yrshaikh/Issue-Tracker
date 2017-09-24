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
/****** Object:  StoredProcedure [dbo].[issue_update_status]    Script Date: 9/24/2017 8:22:02 PM ******/
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
