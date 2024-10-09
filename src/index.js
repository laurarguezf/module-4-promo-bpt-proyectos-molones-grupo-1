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

//MySQL connection
const conn = getConnection();


//Arrancar el servidor
server.listen(serverPort, () => {
	console.log(`Server listening at http://localhost:${serverPort}`);
});


//ENDPOINTS

// -------------- Listar todos los proyectos --------------
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


// -------------- Insertar una nueva entrada en 'projects' --------------
server.post('/projects', async (req, res) => {
	console.log(req.body);

	//Nos conectamos
	const connection = await getConnection();

	if (!connection) {
		res.status(500).json({ success: false, error: 'Error con la conexión.' });
	}

	//Autora
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


//Endpoint para el detalle de un proyecto, que acabo de crear
server.get('/projects/:id', async (req, res) => {
	//Me conecto a la db
	const connection = await getConnection();
	//Obtener el id el proyecto de la url
	const projectId = req.params.id;

	try {
		//Crear el sql filtrado por id de proyecto y
		//Ejecutar el sql query()
		const [results] = await connection.query(`SELECT * FROM project
			JOIN Author ON project.Author_idAuthor = Author.idAuthor 
			WHERE project.idproject = ?`, [projectId]);

		if (results.length === 0) {
			res.status(404).send('Proyecto no encontrado');
			return;
		}

		//Renderizar una vista de ejs con los datos del proyecto y envíar el objeto con los datos del proyecto
		res.render('cards', { project: results[0] });

	} catch (error) {
		res.status(500).send('Error al recuperar el proyecto');
	}
	//Cerrar conexión
	await connection.close();
});


// Servidor de estáticos

const staticUrl = './src/public-react' //Servidor de estáticos para react
server.use(express.static(staticUrl));
server.use(express.static('./public/styles')); //Servidor de estáticos para los estilos del motor de plantillas 
