// Load the modules
var express = require('express'); //Express - a web application framework that provides useful utility functions like 'http'
var app = express();
var bodyParser = require('body-parser'); // Body-parser -- a library that provides functions for parsing incoming requests
app.use(bodyParser.json());              // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies
const axios = require('axios');
const qs = require('query-string');
var $ = require('jquery');
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));// Set the relative path; makes accessing the resource directory easier

var pgp = require('pg-promise')();
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'baseball_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);


app.get('/', function(req, res) {
    
  var fetch_batters = "select * from batters";
  db.any(fetch_batters)
  .then(data=>{
    console.log("data retrieved");
    res.render('pages/players', {
      my_title: "Home Page",
      error: false,
      message: '',
      data: data
    });
  })
  .catch(err=>{
    console.log('error',err);
    res.render('pages/players', {
      my_title: "Individual Project",
      players: '',
      error: true,
      message: ''
  })
  
  });
});

app.post('/filter_players', function(req, res) {
  var search = req.body;
  console.log(search);
  console.log(search.team);
  console.log(search.position);
  console.log(search.sort)
  console.log('filtering players');
  if(search.team == 'All')
  {
      if(search.position == 'batters')
      {
          if(search.sort == 'none')
          {
              query = 'select * from batters';
          }
          else
          {
              query = 'select * from batters order by ' + search.sort + ' DESC'; 
          }
      }
      else if(search.position == 'pitchers') //to  do
      {
        if(search.sort ==  'none')
          {
              query = 'select * from batters';
          }
          else
          {
              query = 'select * from batters order by ' + search.sort; 
          }
      }
      else if(search.position == '2B/SS')
      {
        if(search.sort == 'none')
        {
            query = 'select * from batters where(position = \'2B\' or position = \'SS\')';
        }
        else
        {
            query = 'select * from batters where(position = \'2B\' or position = \'SS\') order by ' + search.sort + ' DESC'; 
        }
      }
      else if(search.position == '1B/3B')
      {
        if(search.sort == 'none')
        {
            query = 'select * from batters where(position = \'1B\' or position = \'3B\')';
        }
        else
        {
            query = 'select * from batters where(position = \'1B\' or position = \'3B\') order by ' + search.sort + ' DESC'; 
        }
      }
      else //every other position
      {
        if(search.sort == 'none')
        {
            query = 'select * from batters where(position = \''+search.position+'\')';
        }
        else
        {
            query = 'select * from batters where(position = \''+search.position+'\') order by ' + search.sort + ' DESC'; 
        }
      }
  }
  else //team is not all
  {
      if(search.position == 'batters')
      {
        if(search.sort == 'none')
        {
            query = 'select * from batters where(team = \''+search.team+'\')';
        }
        else
        {
            query = 'select * from batters where(team = \''+search.team+'\') order by ' + search.sort + ' DESC'; 
        }
      }
      else if(search.position == 'pitchers')
      {

      }
      else if(search.position == '2B/SS')
      {
        
        if(search.sort == 'none')
        {
            query = 'select * from batters as b where(b.team = \'2B\' or b.position = \'SS\'));';
        }
        else
        {
            query = 'select * from batters as b where(b.team = \''+search.team+'\' and (b.position = \'2B\' or b.position = \'SS\')) order by ' + search.sort + ' DESC'; 
        }
      }
      else if(search.position == '1B/3B')
      {
        if(search.sort == 'none')
        {
            query = 'select * from batters as b where(b.team = \''+search.team+'\' and (b.position = \'1B\' or b.position = \'3B\'));';
        }
        else
        {
            query = 'select * from batters as b where(b.team = \''+search.team+'\' and (b.position = \'1B\' or b.position = \'3B\')) order by ' + search.sort + ' DESC'; 
        }
      }
      else
      {
        if(search.sort == 'none')
        {
            query = 'select * from batters as b where(b.team = \''+search.team+'\' and b.position = \''+search.position+'\' );';
        }
        else
        {
            query = 'select * from batters as b where(b.team = \''+search.team+'\' and b.position = \''+search.position+'\') order by ' + search.sort + ' DESC'; 
        }
      }
  }
  
  console.log(query);
  db.any(query)
  .then(data=>{
    console.log('sending data');
    res.render('pages/players', {
      my_title: "Home Page",
      error: false,
      message: '',
      data: data,
      filter: 'AB',
      position: search.position,

    });
  })
  .catch(err=>{
    console.log('error',err);
    res.render('pages/players', {
      my_title: "Individual Project",
      players: '',
      error: true,
      message: ''
  })
  
  });

});


app.listen(3000);
console.log('3000 is the magic port');