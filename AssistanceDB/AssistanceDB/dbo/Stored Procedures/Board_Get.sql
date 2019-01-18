CREATE PROCEDURE [dbo].[Board_Get](
@BoardId int
)
AS
BEGIN
SELECT C.CardID, C.Title, C.DueDate, C.Severity,LC.ListID,L.ListName FROM BoardListMap AS BL LEFT JOIN List AS L ON BL.ListID = L.ListID LEFT JOIN ListCardMap LC ON L.ListID = LC.ListID LEFT JOIN Card AS C ON LC.CardID = C.CardID WHERE L.ListID=BL.ListID and C.CardID=LC.CardID and C.Active = 1 and L.Active = 1 and BL.BoardID = @BoardId order by C.Sequence
END