CREATE PROCEDURE [dbo].[List_Create]
(
@ListName varchar(50),
@BoardID int

)
AS
BEGIN
INSERT INTO [dbo].[List]([ListName],[Active]) VALUES(@ListName, 1)
INSERT INTO [dbo].[BoardListMap]([BoardID],[ListID]) VALUES(@BoardID, SCOPE_IDENTITY())
END