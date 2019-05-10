const express = require('express');
const mysql = require('mysql');
const pg = require('pg');
const path = require('path');

const app = express();

if(process.env.NODE_ENV === "production") { //배포모드
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

app.get("/api/ranks",(req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        post: 3306,
        user: 'root',
        password: '1234',
        database: 'epl'
    });
    connection.connect();
    connection.query('call sp_getrank()', function(err, rows, fields){
        connection.end();
        if(!err) {
            console.log(rows);
            const result = JSON.stringify(rows);
            res.send(result);
        }else{
            console.log('query error: ' + err);
            res.send(err);
        }
    });
});

app.get("/api/teams",(req, res) => {
    //res.sendFile(path.join(__dirname, "client/build", "index.html"));
    const connection = mysql.createConnection({
        host: 'localhost',
        post: 3306,
        user: 'root',
        password: '1234',
        database: 'epl'
    });
    connection.connect();
    connection.query('select aa.*, bb.rank_team, cc.poster_path from teams aa left join teamranks bb on aa.team_ID = bb.rank_team left join badge cc on aa.team_ID = cc.poster_id order by (bb.rank_win * 3)+(bb.rank_draw*1) desc'
        , function(err, rows, fields){
        connection.end();
        if(!err) {
            console.log(rows);
            const result = JSON.stringify(rows);
            res.send(result);
        }else{
            console.log('query error: ' + err);
            res.send(err);
        }
    });
});

const config = {
    /*host: '192.168.0.152',
    user: 'postgres',
    database: 'test',
    password: '1123',
    port: 5432*/
    host: 'ec2-23-23-228-132.compute-1.amazonaws.com',
    user: 'qycrdqbyahxetd',
    password: '32c61acaa21d6eea06935b02c9bca8dc704806ffa1ba3ad8ca647376c438df79',
    database: 'd5664ruc6g6v5l',
    port: 5432,
    ssl: true
};

app.get("/api/test",(req, res) => {
    var pool = new pg.Pool(config);
    pool.connect(function(err, client) { 
        if(err) {
            console.log("Can not connect to DB " + err)
        }
        client.query('select aa.*, bb.rank_team, cc.poster_path from teams aa left join teamranks bb on aa.team_ID = bb.rank_team left join badge cc on aa.team_ID = cc.poster_id order by (bb.rank_win * 3)+(bb.rank_draw*1) desc',function(err, result){
            if(err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);
            res.status(200).send(result.rows);
        }); 
    });
    pool.end();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Check out the app at http://localhost:${PORT}`);
});