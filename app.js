var express = require("express"),
	util = require("util"),
	// TODO openid = require("openid"),
	// TODO auth = require("connect-auth"),
	app = express.createServer();

app.use(express.logger());
app.use(express.cookieDecoder());
app.use(express.session());
app.use(express.bodyDecoder());
app.use(express.conditionalGet());
app.use(express.cache());
app.use(express.gzip());


var SITE_NAME = "GetRandom!",
	make_page_title = function (title)
	{
		return title + " | " + SITE_NAME;
	};


app.get("/", function (req, res) {
	res.redirect("/home", 301);
});


app.get("/home", function (req, res) {
	res.render("home.jade", {
		locals: {
			page_title: make_page_title("Home"),
			user: req.session.user || "Mister X",
			random: Math.random() + ""
		}
	});
});


app.get("/login", function (req, res) {
	res.render("login.jade", {
		locals: {
			page_title: make_page_title("Log In"),
			action_url: "/login"
		}
	});
});

function authenticate (req, res, next)
{
	if (req.body.user_name !== "foo" || req.body.user_password !== "bar") {
		next(new Error("Cannot authenticate user"));
	}
	next();
};

app.post("/login", authenticate, function (req, res) {
	console.log("POST /login");
	req.session.regenerate(function ()
	{
		req.session.user = req.body.user_name;
		res.redirect("back");
	});
});

/* TODO OpenID login */
/*
app.post("/login", function (req, res) {
	openid.authenticate(req.body.openid_identifier,
		"http://localhost/openid-verify",
		null,
		false,
		function (authURL) {
			req.redirect(authURL);
		});
});


app.get("/openid-verify", function (req, res) {
	var result = openid.verifyAssertion(req);
	if (result.authenticated) {
		console.log("authenticated");
	} else {
		console.log("NOT authenticated");
	}
});
*/


app.listen(8000);
