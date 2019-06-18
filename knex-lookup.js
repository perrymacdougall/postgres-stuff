const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const name = process.argv[2];

knex.select('first_name', 'last_name', 'birthdate').from('famous_people')
    .where('first_name', '=', name)
    .asCallback(function(err, rows) {
      if (err) {
        return console.error(err);
      } else {
        let hits = rows.length;
        console.log("Searching...\nFound " + hits + " person(s) by the name '" + name + "':");

        for (let i = 0; i < rows.length; i++) {
          let fname = rows[i].first_name;
          let lname = rows[i].last_name;
          let bday = rows[i].birthdate;
          console.log("- " + (i+1) + ": " + fname + " " + lname + ", born '" + bday + "'");
        }

      }

    });