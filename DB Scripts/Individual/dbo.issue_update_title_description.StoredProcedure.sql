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
/****** Object:  StoredProcedure [dbo].[issue_update_title_description]    Script Date: 9/23/2017 10:33:07 PM ******/
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
