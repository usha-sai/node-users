var express = require('express');
var app = express();
 var db=require('./db.js');
 var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// register page
app.get('/register', function(req, res) {
  res.render('pages/register');
});
// view page
app.get('/view', function(req, res) {
 db.query('SELECT * FROM contacts ORDER BY id asc',function(err,rows)     {
 
        if(err){
         req.flash('error', err); 
         res.render('list',{page_title:"Users - Node.js",data:''});   
        }else{
            
            res.render('pages/view',{page_title:"Users - Node.js",data:rows});
        }
                            
         });
});
app.get("/users/edit/:id", function(req, res) {
 db.query(`SELECT * FROM contacts WHERE id=${req.params.id}`,function(error,rows)     {
    if (error) {
    return console.error(error.message);
  }
            res.render('pages/edit',{page_title:"Edit Users - Node.js",data:rows});
			 console.log(req.params.id);
			 console.log(rows);
          });                   
         });

app.get("/users/delete/:id", (req, res) => {


  db.query(`DELETE FROM contacts WHERE id=${req.params.id}`, function (err, result) { 
        if (err) throw err;
    });
	 res.redirect('/view');
    res.send("Post deleted...");

  });
app.post('/users/edit/:id', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
	var f_name = req.body.first_name;
  var l_name = req.body.last_name;
  var email = req.body.email;
  var sql = `UPDATE contacts SET f_name="${f_name}", l_name="${l_name}", email="${email}" WHERE id=${req.params.id}`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record updated');
  //  console.log(sql);
  //  req.flash('success', 'Data added successfully!');
    //res.redirect('/');
	 res.redirect('/view');
  });
  app.get('/to', (req, res) => res.send('Hello, World!'));

    //res.sendStatus(200);
});

app.post('/register', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
	var f_name = req.body.first_name;
  var l_name = req.body.last_name;
  var email = req.body.email;
  var sql = `INSERT INTO contacts (f_name, l_name, email, created_at) VALUES ("${f_name}", "${l_name}", "${email}", NOW())`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
  //  req.flash('success', 'Data added successfully!');
    //res.redirect('/');
	 res.redirect('/view');
  });
  app.get('/to', (req, res) => res.send('Hello, World!'));

    //res.sendStatus(200);
});
app.listen(8080);
console.log('Server is listening on port 8080');
