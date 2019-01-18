CREATE TABLE [dbo].[Card] (
    [CardID]   INT           IDENTITY (1, 1) NOT NULL,
    [Title]    VARCHAR (200) NOT NULL,
    [Details]  VARCHAR (500) NULL,
    [Sequence] INT           CONSTRAINT [DF_Card_Order] DEFAULT ((1)) NOT NULL,
    [Active]   BIT           CONSTRAINT [DF_Card_Active] DEFAULT ((1)) NOT NULL,
    [Severity] VARCHAR (50)  CONSTRAINT [DF_Card_SeverityID] DEFAULT ('success') NOT NULL,
    [DueDate]  DATE          CONSTRAINT [DF_Card_DueDate] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Card] PRIMARY KEY CLUSTERED ([CardID] ASC)
);

