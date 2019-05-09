const express = require('express');
const mysql = require('mysql');

const app = express();

if(process.env.NODE_ENV === "production") { //배포모드
    console.log('PRODUCTION');
    app.use(express.static(path.join(__dirname, "client/build")));
}else{
    console.log('DEV');
}



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

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Check out the app at http://localhost:${PORT}`);
});