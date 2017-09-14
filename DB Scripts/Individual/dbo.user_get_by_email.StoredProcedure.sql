USE [app]
GO
/****** Object:  StoredProcedure [dbo].[user_get_by_email]    Script Date: 9/14/2017 10:23:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 22nd August 2017  
-- Description: Get user details by email
-- =============================================  
-- Sample Call  
-- exec user_get_email 'yrshaikh.mail@gmail.com'
-- =============================================  
CREATE PROCEDURE [dbo].[user_get_by_email]  
 @email varchar(50)
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  
   
 SELECT 
	id as id,
	email as email,
	first_name as first_name,
	last_name as last_name
 FROM Users  
 WHERE email = @email;
END

GO
