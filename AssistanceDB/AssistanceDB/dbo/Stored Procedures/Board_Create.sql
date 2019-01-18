CREATE PROCEDURE [dbo].[Board_Create]
(
@BoardName varchar(50),
@TeamID int

)
AS
BEGIN
INSERT INTO [dbo].[Board]([BoardName],[Active]) VALUES(@BoardName, 1)
INSERT INTO [dbo].[TeamBoardMap]([TeamID],[BoardID]) VALUES(@TeamID, SCOPE_IDENTITY())
END
