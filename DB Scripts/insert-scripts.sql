INSERT INTO [dbo].[Status] ([id],[value]) VALUES (1, 'open');

INSERT INTO [dbo].[Status] ([id],[value]) VALUES (2, 'closed');

INSERT INTO [dbo].[Status] ([id],[value]) VALUES (3, 'reopened');



INSERT INTO Priority(id, value, rank)

VALUES

	(1, 'critical', 1),

	(2, 'high', 2),

	(3, 'normal', 3),

	(4, 'low', 4),

	(5, 'trivial', 5);