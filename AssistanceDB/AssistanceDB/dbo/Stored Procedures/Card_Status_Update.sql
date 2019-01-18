
CREATE PROCEDURE [dbo].[Card_Status_Update]
(
@CardID int,
@ListID int
)
AS
BEGIN
Update ListCardMap set [ListID] = @ListID where CardID = @CardID
Return 200
END