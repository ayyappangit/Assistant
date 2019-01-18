CREATE TABLE [dbo].[Team] (
    [TeamID]   INT          IDENTITY (1, 1) NOT NULL,
    [TeamName] VARCHAR (50) NOT NULL,
    [Active]   BIT          CONSTRAINT [DF_Team_Active] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_Team] PRIMARY KEY CLUSTERED ([TeamID] ASC)
);



