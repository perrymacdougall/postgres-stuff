const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

const name = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, to_char(birthdate, 'YYYY-MM-DD') AS birthdate FROM famous_people WHERE first_name = $1", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    } else {
      let hits = result.rows.length;
      console.log("Searching...\nFound " + hits + " person(s) by the name '" + name + "':");

      for (let i = 0; i < result.rows.length; i++) {
        let fname = result.rows[i].first_name;
        let lname = result.rows[i].last_name;
        let bday = result.rows[i].birthdate;
        console.log("- " + (i+1) + ": " + fname + " " + lname + ", born '" + bday + "'");
      }
    }
    client.end();
  });
});