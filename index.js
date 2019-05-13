const express = require('express');
const mysql = require('mysql');
const pg = require('pg');
const path = require('path');


const schedule = require('node-schedule');

const app = express();

if(process.env.NODE_ENV === "production") { //배포모드
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

//매일 24시마다 최신화
var scheduler = schedule.scheduleJob('* * 24 * * *', function(){ 
    const crawl = require('./crawl');
});

const config = {
    host: 'ec2-75-101-128-10.compute-1.amazonaws.com',
    user: 'uncchwbvxutngo',
    password: 'd4588296df74581072054ebaecdb44fd14ccc49c14a1d86e285ff27a964de9d3',
    database: 'd9qnqnh0i4mcv7',
    port: 5432,
    ssl: true
};

app.get("/api/teams",(req, res) => {
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
            res.status(200).send(result.rows);
        }); 
    });
    pool.end();
});

// app.get("/api/ranks",(req, res) => {
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         post: 3306,
//         user: 'root',
//         password: '1234',
//         database: 'epl'
//     });
//     connection.connect();
//     connection.query('call sp_getrank()', function(err, rows, fields){
//         connection.end();
//         if(!err) {
//             console.log(rows);
//             const result = JSON.stringify(rows);
//             res.send(result);
//         }else{
//             console.log('query error: ' + err);
//             res.send(err);
//         }
//     });
// });

// app.get("/api/teams",(req, res) => {
//     //res.sendFile(path.join(__dirname, "client/build", "index.html"));
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         post: 3306,
//         user: 'root',
//         password: '1234',
//         database: 'epl'
//     });
//     connection.connect();
//     connection.query('select aa.*, bb.rank_team, cc.poster_path from teams aa left join teamranks bb on aa.team_ID = bb.rank_team left join badge cc on aa.team_ID = cc.poster_id order by (bb.rank_win * 3)+(bb.rank_draw*1) desc'
//         , function(err, rows, fields){
//         connection.end();
//         if(!err) {
//             console.log(rows);
//             const result = JSON.stringify(rows);
//             res.send(result);
//         }else{
//             console.log('query error: ' + err);
//             res.send(err);
//         }
//     });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Check out the app at http://localhost:${PORT}`);
});