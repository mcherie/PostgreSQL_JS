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
  client.query(`SELECT first_name, last_name, to_char(birthdate, 'Mon DD, YYYY') AS birthdate FROM famous_people WHERE UPPER(first_name) = UPPER($1)`, [firstName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Found two people named ' + firstName + ": ");
    // console.log('the "result" is :', result.rows)
    for ( let i =0; i <= result.rows.length -1; i++) {
      let first_name = result.rows[i].first_name
      let last_name = result.rows[i].last_name
      let birthdate = result.rows[i].birthdate
 
      console.log("- " + (i+1) + " " + first_name + " " +last_name + "," + " born " + birthdate)
    }
   
    client.end();
  });
});