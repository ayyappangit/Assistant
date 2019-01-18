CREATE TABLE [dbo].[List] (
    [ListID]   INT          IDENTITY (1, 1) NOT NULL,
    [ListName] VARCHAR (50) NOT NULL,
    [Active]   BIT          CONSTRAINT [DF_List_Active] DEFAULT ((1)) NOT NULL,
    [Sequence] INT          CONSTRAINT [DF_List_Order] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_List] PRIMARY KEY CLUSTERED ([ListID] ASC)
);

