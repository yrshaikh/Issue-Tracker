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
/****** Object:  StoredProcedure [dbo].[project_insert]    Script Date: 9/2/2017 6:06:18 PM ******/
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
 )  
 VALUES  
 (  
  @name,  
  @created_by,  
  @created_on
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
