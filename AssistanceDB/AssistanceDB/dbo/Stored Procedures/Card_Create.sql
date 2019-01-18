
CREATE PROCEDURE [dbo].[Card_Create]
(
@Title varchar(200),
@ListID int

)
AS
BEGIN
INSERT INTO [dbo].[Card] ([Title], [Details], [Sequence], [Active], [Severity],[DueDate])
VALUES (@Title, 'Not now', 1, 1, 'success',GETDATE())

INSERT INTO [dbo].[ListCardMap]([ListID],[CardID]) VALUES(@ListID, SCOPE_IDENTITY())
END