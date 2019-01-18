CREATE TABLE [dbo].[Board] (
    [BoardID]   INT          IDENTITY (1, 1) NOT NULL,
    [BoardName] VARCHAR (50) NOT NULL,
    [Active]    BIT          CONSTRAINT [DF_Board_Active] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_Board] PRIMARY KEY CLUSTERED ([BoardID] ASC)
);

