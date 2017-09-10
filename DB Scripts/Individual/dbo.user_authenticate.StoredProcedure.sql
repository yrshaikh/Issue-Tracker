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
/****** Object:  StoredProcedure [dbo].[user_authenticate]    Script Date: 9/10/2017 4:49:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 2nd September 2017  
-- Description: Validate credentials of a user
-- =============================================  
-- Sample Call  
-- exec user_authenticate 'yrshaikh.mail@gmail.com', 'password'
-- =============================================  
CREATE PROCEDURE [dbo].[user_authenticate]  
 @email varchar(50),
 @password varchar(50)
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 SELECT 
	email as email	
 FROM Users  
 WHERE 
	email = @email and 
	password = @password;
END
GO
