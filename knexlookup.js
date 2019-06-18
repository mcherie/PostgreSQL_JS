const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const firstName = process.argv[2];
// const lastName = process.argv[3];
// const date = process.argv[4];

knex.select('*').from('famous_people')
  .where('first_name', '=', firstName)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
        console.log(rows);
        knex.destroy();
      });