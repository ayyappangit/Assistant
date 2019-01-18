CREATE TABLE [dbo].[TeamBoardMap] (
    [TeamBoardMapping] INT IDENTITY (1, 1) NOT NULL,
    [TeamID]           INT NOT NULL,
    [BoardID]          INT NOT NULL,
    CONSTRAINT [PK_TeamBoardMap] PRIMARY KEY CLUSTERED ([TeamBoardMapping] ASC),
    CONSTRAINT [FK_TeamBoardMap_Board] FOREIGN KEY ([BoardID]) REFERENCES [dbo].[Board] ([BoardID]),
    CONSTRAINT [FK_TeamBoardMap_Team] FOREIGN KEY ([TeamID]) REFERENCES [dbo].[Team] ([TeamID])
);

