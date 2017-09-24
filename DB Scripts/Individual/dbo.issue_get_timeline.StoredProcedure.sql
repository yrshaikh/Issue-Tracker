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
/****** Object:  StoredProcedure [dbo].[issue_get_timeline]    Script Date: 9/24/2017 8:22:02 PM ******/
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
