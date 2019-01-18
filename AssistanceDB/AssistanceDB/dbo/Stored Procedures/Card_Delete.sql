
CREATE PROCEDURE [dbo].[Card_Delete]
(
    @CardID int
)
AS
BEGIN
    Update Card set [Active] = 0 where CardID = @CardID 
	print '200'
END
