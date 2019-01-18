CREATE TABLE [dbo].[UserInfo] (
    [UserInfoID] INT           IDENTITY (1, 1) NOT NULL,
    [UserName]   VARCHAR (100) NOT NULL,
    [Email]      VARCHAR (50)  NOT NULL,
    [Active]     BIT           CONSTRAINT [DF_User_Active] DEFAULT ((1)) NOT NULL,
    [Img]        VARCHAR (500) NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([UserInfoID] ASC)
);

