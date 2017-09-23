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
/****** Object:  StoredProcedure [dbo].[project_get]    Script Date: 9/23/2017 10:33:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================  
-- Author:  Yasser Shaikh  
-- Create date: 3rd September 2017  
-- Description: Get list of projects
-- =============================================  
-- Sample Call  
-- exec project_get 1
-- =============================================  
CREATE PROCEDURE [dbo].[project_get]   
 @user_id int
AS  
BEGIN  
 -- SET NOCOUNT ON added to prevent extra result sets from  
 -- interfering with SELECT statements.  
 SET NOCOUNT ON;  

 SELECT 
	p.id,
	p.name,
	p.created_on,
	(
		SELECT COUNT(*) 
		FROM ProjectUsers ipu
		WHERE ipu.project_id = p.id
	) as user_count
FROM ProjectUsers pu
INNER JOIN Projects p
	ON pu.project_id = p.id
WHERE 
	pu.user_id = @user_id
     
END
GO
