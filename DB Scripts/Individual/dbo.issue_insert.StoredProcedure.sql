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
/****** Object:  StoredProcedure [dbo].[issue_insert]    Script Date: 9/10/2017 4:49:49 PM ******/
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
 )  
 VALUES  
 (
  @project_id,  
  @title,
  @description,  
  @created_by,  
  @created_on
 );  

 SELECT SCOPE_IDENTITY() as issue_id;

END
GO
