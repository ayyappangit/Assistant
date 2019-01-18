CREATE PROCEDURE [dbo].[Team_Create]
(
@TeamName varchar(50),
@UserInfoID int

)
AS
BEGIN
INSERT INTO [dbo].[Team]([TeamName],[Active]) VALUES(@TeamName, 1)
INSERT INTO [dbo].[UserInfoTeamMap]([UserInfoID],[TeamID]) VALUES(@UserInfoID, SCOPE_IDENTITY())
END