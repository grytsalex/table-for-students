const express = require('express'); //конектим библиотеку експресс
const cors = require('cors');
const pg = require("pg"); // библиотека для работы с постгрес
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const connectionString = "pg://postgres:pog225@localhost:5432/Finval"; // connect to base (password before@ and name after/)
const database = new pg.Client(connectionString); //конект к базе данных
database.connect();



app.get('/', function (req, res) {
    database.query(`SELECT * FROM students WHERE teacherid = ${req.query.id}`).then(result => { // фильтруем по учителям у которых id равен тому что лежит locaStorage тоесть валидному 
        res.send(result.rows);
    }).catch(err => {
        console.log(err.stack);
    });
});

app.post('/', (req, res) => {
    let queryStr = `INSERT INTO students (name, last_name, age, city) VALUES ('${req.body.name}', '${req.body.last_name}', '${req.body.age}', '${req.body.city}')`;
    database.query(queryStr).then(result => {
        res.send({
            'success': true
        });
    }).catch(err => {
        res.send({
            'error': err.stack
        });
    });
});

app.put('/', function (req, res) {
    let queryStr = `UPDATE students
                    SET
                    name = '${req.body.name}',
                    last_name = '${req.body.last_name}',
                    age = '${req.body.age}',
                    city = '${req.body.city}'
                    WHERE id = '${req.body.id}'`;
    database.query(queryStr).then(result => {
        res.send({
            'success': true
        });
    }).catch(err => {
        res.send({
            'error': err.stack
        });
    });
});

app.delete('/', function (req, res) {
    let queryStr = `DELETE FROM students WHERE id='${req.body.id}'`;
    database.query(queryStr).then(result => {
        res.send({
            'success': true
        });
    }).catch(err => {
        res.send({
            'error': err.stack
        });
    });
});


app.post('/teacher', (req, res) => { // сервак и клиент общаються по этому адресу
    let queryStr = `INSERT INTO teacher (login, password, email, phone) VALUES ('${req.body.login}', '${req.body.password}', '${req.body.email}', '${req.body.phone}')`; // вставляем в таблицу значениея с такимими айди
    database.query(queryStr).then(result => { // после получения ответа вывести сообщение подтверждением
        res.send({
            'success': true
        });
    }).catch(err => { // отлавливаем ошибку и отправляем сообщение с ошибкой 
        res.send({
            'error': err.stack
        });
    });
});


app.post('/login', function (request, response) {
    console.log(JSON.stringify(request.body))
    database.query(`SELECT * FROM teacher WHERE login='${request.body.login}' AND password='${request.body.password}'`).then(result => {
        let responseBody = {
            'success': false
        };
        if (result.rows.length != 0) {
            responseBody.success = true;
            responseBody.id = result.rows[0].id;
        }
        response.send(responseBody);
    })
});


app.listen(8080, function () { // слушаем 8080 порт
    console.log('Example app listening on port 8080!');
});