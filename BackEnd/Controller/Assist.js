const express = require("express");
const router = express.Router();
const sql = require("mssql");
const conn = require("../Connection/Connect")();

//#region Get

//Select Team
router.get("/users", (req, res) => {
  const Uid = req.params.Uid;
  conn
    .connect()
    .then(function () {
      const sqlQuery = "SELECT [UserInfoID], [UserName], [Email], [Active], [Img] FROM UserInfo where UserInfoID = " + Uid;
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

router.get("/user/:Uid/", (req, res) => {
  const Uid = req.params.Uid;
  conn
    .connect()
    .then(function () {
      const sqlQuery = "SELECT [UserInfoID], [UserName], [Email], [Active], [Img] FROM UserInfo where UserInfoID = " + Uid;
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//Select Team
router.get("/teams/:Uid/", (req, res) => {
  const Uid = req.params.Uid;
  conn
    .connect()
    .then(function () {
      const sqlQuery =
        "SELECT Team.TeamID, Team.TeamName FROM Team left JOIN UserInfoTeamMap ON Team.TeamID=UserInfoTeamMap.TeamID where Team.Active = 1 and UserInfoTeamMap.UserInfoID = " +
        Uid;
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

// Select Boards
router.get("/boards/:Tid/", (req, res) => {
  const Tid = req.params.Tid;
  conn
    .connect()
    .then(function () {
      const sqlQuery =
        "SELECT Board.BoardID, Board.BoardName FROM Board left JOIN TeamBoardMap ON Board.BoardID=TeamBoardMap.BoardID where Board.Active = 1 and TeamBoardMap.TeamID = " +
        Tid;
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

// Select List-Card
router.get("/listscards/:Bid/", (req, res) => {
  const Bid = req.params.Bid;
  conn
    .connect()
    .then(function () {
      const sqlQuery =
        "SELECT L.ListID, L.ListName, C.Active, C.CardID, c.Details, c.DueDate, c.Sequence, c.Severity, c.Title FROM BoardListMap BL LEFT OUTER JOIN List L ON BL.ListID = L.ListID LEFT OUTER JOIN ListCardMap as LC ON L.ListID = LC.ListID LEFT OUTER JOIN Card as C on LC.CardID = c.CardID where BoardID = " +
        Bid +
        " order by L.ListID asc";
      // const sqlQuery = "SELECT C.CardID, C.Title, C.DueDate, C.Severity,LC.ListID,L.ListName FROM BoardListMap AS BL LEFT JOIN List AS L ON BL.ListID = L.ListID LEFT JOIN ListCardMap LC ON L.ListID = LC.ListID LEFT JOIN Card AS C ON LC.CardID = C.CardID WHERE L.ListID=BL.ListID and C.CardID=LC.CardID and C.Active = 1 and L.Active = 1 and BL.BoardID = " + Bid + " order by C.Sequence";
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

// Select List - Not in use
router.get("/lists/:Bid/", (req, res) => {
  const Bid = req.params.Bid;
  conn
    .connect()
    .then(function () {
      const sqlQuery =
        "SELECT List.ListID, List.ListName, List.Sequence FROM List INNER JOIN BoardListMap ON List.ListID=BoardListMap.ListID where List.Active = 1 and BoardListMap.BoardID = " +
        Bid;
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

// Select Cards - not in use
router.get("/cards/:Lid/", (req, res) => {
  const Lid = req.params.Lid;
  conn
    .connect()
    .then(function () {
      const sqlQuery =
        "SELECT Card.CardID, Card.Title, Card.Sequence, Card.Severity, ListCardMap.ListID FROM Card INNER JOIN ListCardMap ON Card.CardID=ListCardMap.CardID where Card.Active = 1 and ListCardMap.ListID = " +
        Lid;
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

// Select cards by boardID - not in use
router.get("/cardsbyBoard/:boardid/", (req, res) => {
  const boardID = req.params.boardid;
  conn
    .connect()
    .then(function () {
      const sqlQuery =
        "SELECT L.ListID, L.ListName, L.Sequence, LCM.ListID, C.* from [dbo].[BoardListMap] BLM " +
        " INNER JOIN List L ON BLM.ListID = L.ListID " +
        " INNER JOIN [dbo].[ListCardMap] LCM ON BLM.ListID = LCM.LISTID " +
        " INNER JOIN Card C ON C.CardID = LCM.CardID " +
        " Where BoardID = " +
        boardID;
      const req = new sql.Request(conn);
      req
        .query(sqlQuery)
        .then(function (recordset) {
          res.send(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//#endregion

//#region Put

// Disable Card
router.put("/dcard/:cID", (req, res) => {
  const _cardID = req.params.cID;
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("CardID", sql.Int, _cardID);
          request
            .execute("Card_Delete")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {
                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err);
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err);
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//Change Status
router.put("/ucardstatus", (req, res) => {
  const _cardID = req.body.CardID;
  const _listID = req.body.ListID;
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("CardID", sql.Int, _cardID);
          request.input("ListID", sql.Int, _listID);
          request
            .execute("Card_Status_Update")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {

                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err);
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err);
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//Change Serverity
router.put("/ucardseverity", (req, res) => {
  const _cardID = req.body.CardID;
  const _severity = req.body.Severity;
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("CardID", sql.Int, _cardID);
          request.input("Severity", sql.VarChar(50), _severity);
          request
            .execute("Card_Severity_Update")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {
                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err);
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err);
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//Change Card Title
router.put("/ucardTitle", (req, res) => {
  const _cardID = req.body.CardID;
  const _cardTitle = req.body.Title;
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("CardID", sql.Int, _cardID);
          request.input("Title", sql.VarChar(200), _cardTitle);
          request
            .execute("Card_Title_Update")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {
                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err);
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err);
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//#endregion

//#region Post

//Create Board SP
router.post("/cteam", (req, res) => {
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("TeamName", sql.VarChar(50), req.body.TeamName);
          request.input("UserInfoID", sql.Int, req.body.UserInfoID);
          request
            .execute("Team_Create")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {
                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err + "Hello1");
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err + "Hello2");
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err + "Hello3");
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err + "Hello4");
    });
});

//Create Board SP
router.post("/cboard", (req, res) => {
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("BoardName", sql.VarChar(50), req.body.BoardName);
          request.input("TeamID", sql.Int, req.body.TeamID);
          request
            .execute("Board_Create")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {
                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err + "Hello1");
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err + "Hello2");
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err + "Hello3");
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err + "Hello4");
    });
});

//Create Card SP
router.post("/ccard", (req, res) => {
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("Title", sql.VarChar(200), req.body.Title);
          request.input("ListID", sql.Int, req.body.ListID);
          request
            .execute("Card_Create")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {
                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err);
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err);
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//Create List SP
router.post("/clist", (req, res) => {
  conn
    .connect()
    .then(function () {
      const sprocedure = new sql.Transaction(conn);
      sprocedure
        .begin()
        .then(function () {
          const request = new sql.Request(sprocedure);
          request.input("ListName", sql.VarChar(50), req.body.ListName);
          request.input("BoardID", sql.Int, req.body.BoardID);
          request
            .execute("List_Create")
            .then(function () {
              sprocedure
                .commit()
                .then(function (recordSet) {
                  conn.close();
                  var jsonRes = '{"status":200}';
                  res.status(200).send(JSON.stringify(jsonRes));
                })
                .catch(function (err) {
                  conn.close();
                  res.status(400).send(err);
                });
            })
            .catch(function (err) {
              conn.close();
              res.status(400).send(err);
            });
        })
        .catch(function (err) {
          conn.close();
          res.status(400).send(err);
        });
    })
    .catch(function (err) {
      conn.close();
      res.status(400).send(err);
    });
});

//#endregion

module.exports = router;