CREATE TABLE [dbo].[UserInfoTeamMap] (
    [UserTeamMappingID] INT IDENTITY (1, 1) NOT NULL,
    [UserInfoID]        INT NOT NULL,
    [TeamID]            INT NOT NULL,
    CONSTRAINT [PK_UserTeamMap] PRIMARY KEY CLUSTERED ([UserTeamMappingID] ASC),
    CONSTRAINT [FK_UserInfoTeamMap_User] FOREIGN KEY ([UserInfoID]) REFERENCES [dbo].[UserInfo] ([UserInfoID]),
    CONSTRAINT [FK_UserTeamMap_Team] FOREIGN KEY ([TeamID]) REFERENCES [dbo].[Team] ([TeamID])
);

