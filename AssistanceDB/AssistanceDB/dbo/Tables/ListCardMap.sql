CREATE TABLE [dbo].[ListCardMap] (
    [ListCardMapID] INT IDENTITY (1, 1) NOT NULL,
    [ListID]        INT NOT NULL,
    [CardID]        INT NOT NULL,
    CONSTRAINT [PK_ListCardMap] PRIMARY KEY CLUSTERED ([ListCardMapID] ASC),
    CONSTRAINT [FK_ListCardMap_Card] FOREIGN KEY ([CardID]) REFERENCES [dbo].[Card] ([CardID]),
    CONSTRAINT [FK_ListCardMap_List] FOREIGN KEY ([ListID]) REFERENCES [dbo].[List] ([ListID])
);

