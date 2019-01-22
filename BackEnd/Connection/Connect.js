const sql = require("mssql");

const connect = function () {
  console.log("Azure DB Connected");
  const conn = new sql.ConnectionPool({
    user: "Assistant",
    password: "Password1",
    server: "eyazuresqlserver.database.windows.net",
    database: "Assistant",
    port: 1433,
    encrypt: true
  });

  // console.log("Ayyappan Local DB Connected");
  // const conn = new sql.ConnectionPool({
  //   user: "sa",
  //   password: "sa",
  //   server: "US1153935W1",
  //   database: "Assistant",
  //   port: 1433
  // });

  // console.log("Prince Local DB Connected");
  // console.log("Azure DB Connected");
  // const conn = new sql.ConnectionPool({
  //   user: "testuser",
  //   password: "Test@1234",
  //   server: "US1154823W3\\SQL2K12",
  //   database: "Assistant",
  //   port: 1433,
  //   encrypt: true
  // });

  console.log(conn);
  return conn;
};

module.exports = connect;