# Todo
REST API for your Todo list

## Core technologies
### Backend
* ExpressJS
### Database
* PostgreSQL
### ORM
* Sequelize

## Installation
Create a local PostgreSQL database:
```bash
	createdb your_databasename
```
Create Sequelize config file:
```bash
	mkdir config
	touch config.json
```
Add configuration information:
```json
	{
		"development": {
			"username": "pg_username",
			"password": "pg_password",
			"database": "your_databasename",
			"host": "your_pg_host",
			"dialect": "postgres"
		},
		"production": {}
	}
```
Start project
```bash
	yarn run install
	yarn run dev
```
