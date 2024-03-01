// //export a postgres client 
// const { Client } = require('pg');
// const uuid = require('uuid');

// const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/acme_talent_agency_db');

// async function createTables() {
//     const SQL = `
//     DROP TABLE IF EXISTS users_skills;
//     DROP TABLE IF EXISTS users;
//     DROP TABLE IF EXISTS skills;

//     CREATE TABLE users(
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(100) UNIQUE NOT NULL,
//         password VARCHAR(100) NOT NULL
//     );

//     CREATE TABLE skills(
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) UNIQUE NOT NULL
//     );

//     CREATE TABLE users_skills(
//         id SERIAL PRIMARY KEY,
//         "user_id" INTEGER REFERENCES users(id),
//         "skill_id" INTEGER REFERENCES skills(id),
//         CONSTRAINT user_skill UNIQUE("user_id", "skill_id")
//     );
//     `;
//     await client.query(SQL);
// }

// async function createUser(username, password){
//     const SQL = `
//     INSERT INTO users(id, username, password)
//     VALUES($1, $2, $3);
//     `;
//     const response = await client.query(SQL, [uuid.v4(), username, await bcrypt.hash(password, 5)]);
//   return response.rows[0];
// }

// async function createSkill(name){
//     const SQL = `
//         INSERT INTO skills(id, name)
//         values($1, $2);
//     `;
//    await client.query(SQL, [uuid.v4(), name]);
// }

// const createUserSkill = async({ user_id, skill_id })=> {
//     const SQL = `
//       INSERT INTO user_skills(id, user_id, skill_id) VALUES($1, $2, $3) RETURNING *
//     `;
//     const response = await client.query(SQL, [uuid.v4(), user_id, skill_id]);
//     return response.rows[0];
//   }
  

// async function fetchUsers(){
//     const SQL = `
//     SELECT * FROM users;
//     `;
//     const response = await client.query(SQL);
//     return response.rows;
// }

// async function fetchSkills(){
//     const SQL = `
//     SELECT * FROM skills;
//     `;
//     const response = await client.query(SQL);
//     return response.rows;

// }

// async function fetchUserSkills(userId){
//     const SQL = `
//     SELECT skills.name
//     FROM skills
//     JOIN skills ON user_skills.skills.id = skill_id
//     WHERE user_skills.user_id = $1;
//     `;
//     const response = await client.query(SQL, [userId]);
//     return response.rows;

// }

// const deleteUserSkill = async({id, user_id})=> {
//     const SQL = `
//     DELETE FROM users_skills
//     WHERE id = $1 AND user_id = $2;
//     `;
//     await client.query(SQL, [id, user_id]);
// }

// module.exports = {
//     client,
//     createTables,
//     createUser,
//     createSkill,
//     createUserSkill,
//     fetchUsers,
//     fetchSkills,
//     fetchUserSkills,
//     deleteUserSkill
// };

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_travel_agency_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const createTables = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS user_skills;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS skills;
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE skills(
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );
    CREATE TABLE user_skills(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      skill_id UUID REFERENCES skills(id) NOT NULL,
      CONSTRAINT unique_user_id_skill_id UNIQUE (user_id, skill_id)
    );
  `;
  await client.query(SQL);

};

const createUser = async({ username, password })=> {
  const SQL = `
    INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ uuid.v4(), username, await bcrypt.hash(password, 5)]);
  return response.rows[0];
};

const createSkill = async({ name })=> {
  const SQL = `
    INSERT INTO skills(id, name) VALUES ($1, $2) RETURNING * 
  `;
  const response = await client.query(SQL, [ uuid.v4(), name]);
  return response.rows[0];
};

const createUserSkill = async({ user_id, skill_id })=> {
  const SQL = `
    INSERT INTO user_skills(id, user_id, skill_id) VALUES ($1, $2, $3) RETURNING * 
  `;
  const response = await client.query(SQL, [ uuid.v4(), user_id, skill_id]);
  return response.rows[0];
};

const fetchUsers = async()=> {
  const SQL = `
    SELECT id, username 
    FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchSkills = async()=> {
  const SQL = `
    SELECT *
    FROM skills
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchUserSkills = async(user_id)=> {
  const SQL = `
    SELECT *
    FROM user_skills
    WHERE user_id = $1
  `;
  const response = await client.query(SQL, [ user_id ]);
  return response.rows;
};

const deleteUserSkill = async({user_id, id})=> {
  const SQL = `
    DELETE
    FROM user_skills
    WHERE user_id = $1 AND id = $2
  `;
  await client.query(SQL, [ user_id, id ]);
};

module.exports = {
  client,
  createTables,
  createUser,
  createSkill,
  fetchUsers,
  fetchSkills,
  createUserSkill,
  fetchUserSkills,
  deleteUserSkill
};