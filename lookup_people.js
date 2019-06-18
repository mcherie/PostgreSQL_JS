const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const firstName = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE UPPER(first_name) = UPPER($1)", [firstName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('the "result" is :', result.rows)
    client.end();
  });
});