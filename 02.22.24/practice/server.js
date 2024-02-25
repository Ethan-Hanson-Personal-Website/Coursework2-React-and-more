const pg = require('pg');
const express = require('express');
const app = express();

const PORT =  process.env.PORT || 3000;

app.use(express.json());
app.use(require('morgan')('dev'));

// app.get('/api/categories', async(req, res, next) => {
//     try {
//         const SQL = await client.query('SELECT * FROM categories');
//         const response = await client.query(SQL);
//         res.send(response.rows);
//     } catch (error) {
//         next(error);
//     }
// });

// app.get('/api/notes', async(req, res, next) => {
//     try {
//         const SQL = await client.query('SELECT * FROM notes');
//         const response = await client.query(SQL);
//         res.send(response.rows);
//     } catch (error) {
//         next(error);
//     }
// });

// app.post('/api/notes', async(req, res, next) => {
//     try {
//         const SQL = `
//         INSERT INTO notes(txt, category_id) 
//         VALUES($1, $2)
//          RETURNING *`;

//          const {txt, category_id} = req.body;
//             const response = await client.query(SQL, [txt, category_id]);
//         res.send(response.rows);
//     } catch (error) {
//         next(error);
//     }
// });

// app.put('/api/notes/:id', async(req, res, next) => { try {
//     const SQL = `
//     UPDATE notes(txt, category_id)
//     VALUES($1, $2)
//     WHERE id = $3
//     `
//     const {txt, category_id} = req.body;
//     const response = await client.query(SQL, [txt, category_id, req.params.id]);
//     res.send(response.rows);
// } catch (error) {
//     next(error);
// }});

// app.delete('/api/notes/:id', async(req, res, next) => { try {
//     const SQL = `
//     DELETE FROM notes
//     WHERE id = $3
//     `
//     await client.query(SQL, [req.params.id]);
//     res.send(response.rows);
// } catch (error) {
//     next(error);
// }});

app.get('/api/categories', async (req, res, next) => {
  try {
    const SQL = `
      SELECT * from categories
    `
    const response = await client.query(SQL)
    res.send(response.rows)
  } catch (err) {
    next(err)
  }
})

app.get('/api/notes', async (req, res, next) => {
  try {
    const SQL = `
      SELECT * from notes ORDER BY created_at DESC;
    `
    const response = await client.query(SQL)
    res.send(response.rows)
  } catch (err) {
    next(err)
  }
})

app.post('/api/notes', async (req, res, next) => {
  try {
    const SQL = `
      INSERT INTO notes(txt, category_id)
      VALUES($1, $2)
      RETURNING *
    `
    const response = await client.query(SQL, [req.body.txt, req.body.category_id])
    res.send(response.rows[0])
  } catch (err) {
    next(err)
  }
})

app.put('/api/notes/:id', async (req, res, next) => {
  try {
    const SQL = `
      UPDATE notes
      SET txt=$1, ranking=$2, category_id=$3, updated_at= now()
      WHERE id=$4 RETURNING *
    `
    const response = await client.query(SQL, [
      req.body.txt,
      req.body.ranking,
      req.body.category_id,
      req.params.id
    ])
    res.send(response.rows[0])
  } catch (err) {
    next(err)
  }
})

app.delete('/api/notes/:id', async (req, res, next) => {
  try {
    const SQL = `
      DELETE from notes
      WHERE id = $1
    `
    const response = await client.query(SQL, [req.params.id])
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
    res.status(500).send({error: err.message});
});

const client = new pg.Client(process.env.DATABASE_URL ||'postgres://localhost/acme_notes_categories_db');


async function init(){
    client.connect();
    const SQL = `
     DROP TABLE IF EXISTS notes;
     DROP TABLE IF EXISTS categories;

        CREATE TABLE categories(
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL
        );


        CREATE TABLE notes(
            id SERIAL PRIMARY KEY,
            txt TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now(),
            ranking INTEGER DEFAULT 3 NOT NULL,
            category_id INTEGER REFERENCES categories(id) NOT NULL
        );


        INSERT INTO categories(name) VALUES('Work');
        INSERT INTO categories(name) VALUES('Reminders');
        INSERT INTO categories(name) VALUES('Class');
        INSERT INTO categories(name) VALUES('Important Stuff');

        INSERT INTO notes(txt, category_id) 
        VALUES('Take the trash out', (SELECT id FROM categories WHERE name = 'Reminders'));

        INSERT INTO notes(txt, category_id)
        VALUES('Coding more than usual', (SELECT id FROM categories WHERE name = 'Work'));

        INSERT INTO notes(txt, category_id)
        VALUES('Study for the test', (SELECT id FROM categories WHERE name = 'Class'));

        INSERT INTO notes(txt, category_id)
        VALUES('Pay the bills', (SELECT id FROM categories WHERE name = 'Important Stuff'));
    `;

    await client.query(SQL);    
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });


}

init();