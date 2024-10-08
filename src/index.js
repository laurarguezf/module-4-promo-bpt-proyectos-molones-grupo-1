//Servidor de Express

//Importar bibliotecas
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const getConnection = require('./db/db');


//Crear servidor
const server = express();
const serverPort = 3000;

//Config
server.use(cors());
server.use(express.json({ limit: '50Mb' }));	
server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('./public'));


//MySQL connection
const conn = getConnection();


//Arrancar el servidor
server.listen(serverPort, () => {
	console.log(`Server listening at http://localhost:${serverPort}`);
});

//Programar el servidor de estáticos
const staticPath = path.join(__dirname, '../web/src');
server.use(express.static(staticPath));


//ENDPOINTS

// -------- Listar todos los proyectos --------
server.get('/projects', async (req, res) => {
	//Nos conectamos
	const connection = await getConnection();

	if (!connection) {
		res.status(500).json({ success: false, error: 'Error con la conexión.' });
		return;
	}

	//Obtenemos los datos
	const [results] = await connection.query(`SELECT * from project
	JOIN Author ON project.Author_idAuthor = Author.idAuthor;`);

	//Devolvemos los resultados
	if (!results) {
		res.status(500).json({
			success: false,
			error: 'Datos no encontrados'
		})
	}
	else {

		const data = {
			success: true,
			projects: results
		};
		res.status(200).json(results);
	}

	//Cerramos conexión
	await connection.close();
});

server.get('/projects/:id', async (req, res) => {
    const connection = await getConnection();
    
    const projectId = req.params.id;

    try {
        const [results] = await connection.query(`SELECT * FROM project
        JOIN Author ON project.Author_idAuthor = Author.idAuthor WHERE project.idproject = ?`, [projectId]);

        if (results.length === 0) {
            res.status(404).send('Proyecto no encontrado');
            return;
        }
		console.log(results)

        // 
        res.render('cards', { project: results[0] }); 

    } catch (error) {
        res.status(500).send('Error al recuperar el proyecto');
    }

    await connection.close();
});




// -------- Insertar una nueva entrada en 'projects' --------
server.post('/projects', async (req, res) => {
	console.log(req.body);

	//Nos conectamos
	const connection = await getConnection();

	if (!connection) {
		res.status(500).json({ success: false, error: 'Error con la conexión.' });
	}

	//Comprobamos que están todos los datos


	// INSERT DATA

	//Author
	try {
		const [authorInsertResult] = await connection.execute(
			`INSERT INTO freedb_proyectos_molones.Author (author_name, author_job, author_photo) 
		VALUES (?, ?, ?)`,
			[
				req.body.author_name,
				req.body.author_job,
				req.body.author_photo
			]
		);
		console.log(authorInsertResult);
		//Project
		const [results] = await connection.execute(
			`INSERT INTO freedb_proyectos_molones.project (project_name, project_slogan, project_repo, project_demo, project_technologies, project_description, project_image, Author_idAuthor)
			VALUES (?, ?, ?, ?, ?, ?,?,?)` ,
			[
				req.body.project_name,
				req.body.project_slogan,
				req.body.project_repo,
				req.body.project_demo,
				req.body.project_technologies,
				req.body.project_description,
				req.body.project_image,
				authorInsertResult.insertId //value returned from Author ID
			]

		);
		//Devolvemos un JSON en función de los resultados del insert
		res.status(201).json({
			success: true,
			id: results.insertId,
			message: 'Proyecto creado correctamente!'
		});

	}
	catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			error: 'Ha ocurrido un error. Datos no insertados'
		})
	}
	//Cerramos conexión
	connection.close();
	
});

// -------- Modificar una entrada en 'projects' --------
server.put('/projects/:idproject', async (req, res) => {
	console.log(req.body);
	console.log(req.params);
	
  
	// Conn a bbdd
  
	const conn = await getConnection();
	
	if( !conn ) {
	  res.status(500).send('Se rompió');
	  return;
	}
  
	// Preparo y ejecuto el UPDATE  -> results
  
	await conn.execute(
		`UPDATE freedb_proyectos_molones.Author 
		SET author_name = ?, author_job = ?, author_photo = ? 
		WHERE idAuthor = (SELECT Author_idAuthor FROM freedb_proyectos_molones.project WHERE idproject = ?)`,
		[req.body.author_name, req.body.author_job, req.body.author_photo, req.params.idproject]
	);

	const [results] = await conn.execute(
		`UPDATE freedb_proyectos_molones.project 
		SET project_name = ?, project_slogan = ?, project_repo = ?, project_demo = ?, 
			project_technologies = ?, project_description = ?, project_image = ?
		WHERE idproject = ?`,
		[
			req.body.project_name,
			req.body.project_slogan,
			req.body.project_repo,
			req.body.project_demo,
			req.body.project_technologies,
			req.body.project_description,
			req.body.project_image,
			req.params.idproject
		]
	);
	
  
	// Si ha afectado a 1 fila, devuelvo success: true
  
	if( results.affectedRows === 1 ) {
	  res.json({
		success: true
	  });
	}
	else {
	  // Si no, devuelvo success: false
  
	  res.json({
		success: false
	  });
	}
  
	await conn.close();
  });

