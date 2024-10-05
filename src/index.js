//Servidor de Express

//Importar bibliotecas
const express = require('express');
const cors = require('cors');
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


// -------- Insertar una nueva entrada en 'projects' --------
server.post('/projects', async (req, res) => {
	//Nos conectamos
	const connection = await getConnection();

	if (!connection) {
		res.status(500).json({ success: false, error: 'Error con la conexión.' });
	}

	//Comprobamos que están todos los datos

	//Insertamos nuevos datos

	//Devolvemos un JSON en función de los resultados del insert
	if (results.affectedRows === 1) {
		res.status(201).json({
			success: true,
			message: 'Proyecto creado correctamente',
			id: results.insertId
		})
	} else {
		res.status(500).json({
			success: false,
			error: 'Datos no insertados'
		})
	};

	//Cerramos conexión
	await connection.close();
});

