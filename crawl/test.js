const axios = require("axios");
const cheerio = require("cheerio");
const pg = require('pg');

const getHtml = async () => {
  try {
    return await axios.get("https://www.transfermarkt.com/premier-league/tabelle/wettbewerb/GB1");
  } catch (error) {
    console.error(error);
  }
};

 getHtml()
  .then(html => {
    let ulList = [];
    let test = [];
    const $ = cheerio.load(html.data);;
    
    const $bodyList = $('div.row div.large-8 div.responsive-table tbody tr td').children('a');
    let j = 0;
    $bodyList.each(function(i, elem) {
      const chk = $(this).text();
      if(chk != ''){
        ulList[j] = chk;
        j = j+1;
      }
    });
	
    test = ulList.division(5);
	return test;
})
.then(res => {
    console.log(res)

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
	  console.log('Connect to DB');
      for(var i=0; i<res.length;i++){
          client.query("select fn_crawl('"+res[i][0]+"',"+res[i][2]+","+res[i][3]+","+res[i][4]+")",
          function(err, result){
              if(err) {
                  console.log(err);                    
              }
              chk = result.rows;
			  console.log(chk);
          }); 
      }
    });
    pool.end();
  });

Array.prototype.division = function (n) {
    var arr = this;
    var len = arr.length;
    var cnt = Math.floor(len / n);
    var tmp = [];
    for (var i = 0; i <= cnt; i++) {
      if(arr.length != 0)
        tmp.push(arr.splice(0, n));
    }
    return tmp;
}

