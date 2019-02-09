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
	cd server
	mkdir config
	touch config.js
```
Add configuration information:
```js
	module.exports = {
		development: {
			username: 'your_user_name',
			password: 'your_password',
			database: 'database_name',
			host: '127.0.0.1',
			dialect: 'postgres',
			logging: false, // disable logging SQL queries
		},
		production: {

		}
}
```
Start project
```bash
	yarn run install
	yarn run dev
```
