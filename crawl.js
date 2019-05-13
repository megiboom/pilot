const axios = require("axios");
const cheerio = require("cheerio");
const pg = require('pg');



const getHtml = async () => {
  try {
    return await axios.get("https://www.oddschecker.com/football/english/premier-league");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    const $ = cheerio.load(html.data);
    let test = [];
    let j = 0;
    $('tr').children('td').each(function(i, e){
        if(i%7 == 1){
          test[j] = ($(this).text());
          if(test[j].indexOf("\'") !== -1){
              test[j] = test[j].replace("\'","_");
          }
          j=j+1;
        }if(i%7 == 3){
          test[j] = ($(this).text());
          j=j+1;
        }if(i%7 == 4){
          test[j] = ($(this).text());
          j=j+1;
        }if(i%7 == 5){
          test[j] = ($(this).text());
          j=j+1;
        }
    });
    return test;
  })
  .then(res => {
      let t = [];
      let w = [];
      let d = [];
      let l = [];

      let j = 0;

      res.forEach(function(v,i,a){
        if(i%4 == 0) {t[j] = res[i];}
        if(i%4 == 1) {w[j] = res[i];}
        if(i%4 == 2) {d[j] = res[i];}
        if(i%4 == 3) {l[j] = res[i]; j=j+1;}
      })
      
    const config = {
        host: 'ec2-75-101-128-10.compute-1.amazonaws.com',
        user: 'uncchwbvxutngo',
        password: 'd4588296df74581072054ebaecdb44fd14ccc49c14a1d86e285ff27a964de9d3',
        database: 'd9qnqnh0i4mcv7',
        port: 5432,
        ssl: true
    };
    var pool = new pg.Pool(config);
    var chk;
    pool.connect(function(err, client) { 
      if(err) {
        console.log("Can not connect to DB " + err)
      }
      for(var i=0; i<j;i++){
          client.query("select fn_crawl('"+t[i]+"',"+w[i]+","+d[i]+","+l[i]+")",
          function(err, result){
              if(err) {
                  console.log(err);                    
              }
              chk = result.rows;
          }); 
      }
    });
        console.log('end');
        pool.end();
  });