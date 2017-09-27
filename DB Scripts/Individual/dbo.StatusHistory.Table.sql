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
/****** Object:  Table [dbo].[StatusHistory]    Script Date: 9/28/2017 12:33:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusHistory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[issue_id] [int] NOT NULL,
	[status_id] [tinyint] NOT NULL,
	[created_by] [int] NOT NULL,
	[created_on] [datetime] NOT NULL,
 CONSTRAINT [PK_StatusHistory] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Issues] FOREIGN KEY([issue_id])
REFERENCES [dbo].[Issues] ([id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Issues]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Status] FOREIGN KEY([status_id])
REFERENCES [dbo].[Status] ([id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Status]
GO
ALTER TABLE [dbo].[StatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Users] FOREIGN KEY([created_by])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[StatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Users]
GO
