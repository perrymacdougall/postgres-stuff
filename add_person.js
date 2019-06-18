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

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthday = process.argv[4];

if (!firstName || !lastName || !birthday) {
  console.log('Don\'t leave any fields blank!!!');
} else {
  knex('famous_people').insert([{
      id: 5,
      first_name: firstName,
      last_name: lastName,
      birthdate: birthday
    }])
    .asCallback(function(err, rows) {
      if (err) {
        return console.error(err);
      } else {
        console.log(rows);
      }
    })
}

// knex('famous_people')
//   .where({ id: 11 })
//   .del()
//   .asCallback(function(err, rows) {
//     if (err) {
//       return console.error(err);
//     } else {
//       console.log(rows);
//     }
//   })