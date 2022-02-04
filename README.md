# Workplace-Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


This is an app for keeping track of Employees, Job Titles, Departments, and Salaries at your business. It uses an elegant command line interface using node.js and inquirer. Data is stored using a mySQL database.



##

- Inquirer is used for interactivity.

```
function askQuestion(questionSet) {  //questionSet located in ./public/questions.js
    console.log('\n');
    inquirer
        .prompt(questionSet)
        .then((response) => {
```
- mySQL queries are used to retrieve data from the database.

```
SELECT CONCAT(first_name," ",last_name, " (id: ", id, ")") AS name FROM employee
```

## [Watch the demo video](https://antieatingactivist.github.io/Workplace-Tracker/)

![Screen Recording 2022-02-03 at 8 04 55 PM](https://user-images.githubusercontent.com/1414728/152470117-14dfcfe1-9122-4388-b98c-884fb0843abb.gif)


## Installation

node.js and mySQL are required to run this application. mySQL username "root" and password "password" are used. You will have to modify the credentials in index.js if you wish to use a different username or password. 

- clone the respository and enter the directory

`git clone <repository> && cd <cloned directory>`

- install dependencies

`npm install`

- add schema to mySQL database

`npm run schema`

- optionally seed the database with data for testing purposes

`npm run seed`

- start the application

`npm start`




## Built With

* [mySQL](https://www.mysql.com)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [node.js](https://nodejs.dev) 
* [inquirer](https://github.com/SBoudrias/Inquirer.js)



## Authors

Garrett Corbin

- [https://github.com/antieatingactivist/](https://github.com/)
- [https://www.linkedin.com/in/garrett-corbin-7a7777227/](https://www.linkedin.com/)

## License

This project is licensed under The MIT license

