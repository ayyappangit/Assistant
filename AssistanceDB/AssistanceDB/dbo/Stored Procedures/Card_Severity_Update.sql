
CREATE PROCEDURE [dbo].[Card_Severity_Update]
(
@CardID int,
@Severity varchar(50)
)
AS
BEGIN
update Card set Severity = @Severity where CardID = @CardID
return 200
END