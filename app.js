var express = require('express'),
	app = express.createServer();

app.use(express.logger());
//app.use(express.cookieDecode());
//app.use(express.session());
app.use(express.conditionalGet());
app.use(express.cache());
app.use(express.gzip());


app.get("/", function (req, res) {
	res.redirect("/home", 301);
});


app.get("/home", function (req, res) {
	res.render("home.jade", {
		layout: "page",
		locals: {
			page_title: "Home | Get Random!",
			random: Math.random() + ""
		}
	});
});

app.listen(8000);
