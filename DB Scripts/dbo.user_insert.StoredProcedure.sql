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
/****** Object:  StoredProcedure [dbo].[user_insert]    Script Date: 9/3/2017 7:08:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 22nd August 2017  
-- Description: Insert into user table  
-- =============================================  
-- Sample Call  
-- exec user_insert 'yasser', 'shaikh', '2017-08-22 22:25:22.130', 'yrshaikh.mail@gmail.com', 'password';  
-- =============================================  
CREATE PROCEDURE [dbo].[user_insert]   
 @first_name varchar(50),  
 @last_name varchar(50),  
 @created_on datetime,  
 @email varchar(50),  
 @password varchar(50)  
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 INSERT INTO Users  
 (  
  first_name  
  , last_name  
  , created_on  
  , email  
  , password  
 )  
 VALUES  
 (  
  @first_name,  
  @last_name,  
  @created_on,  
  @email,  
  @password    
 );  
END
GO
