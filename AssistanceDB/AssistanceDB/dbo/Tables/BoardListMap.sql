CREATE TABLE [dbo].[BoardListMap] (
    [BoardListMapID] INT IDENTITY (1, 1) NOT NULL,
    [BoardID]        INT NOT NULL,
    [ListID]         INT NOT NULL,
    CONSTRAINT [PK_BoardListMap] PRIMARY KEY CLUSTERED ([BoardListMapID] ASC),
    CONSTRAINT [FK_BoardListMap_Board] FOREIGN KEY ([BoardID]) REFERENCES [dbo].[Board] ([BoardID]),
    CONSTRAINT [FK_BoardListMap_List] FOREIGN KEY ([ListID]) REFERENCES [dbo].[List] ([ListID])
);

