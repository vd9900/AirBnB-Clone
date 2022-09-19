const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express();
const appRouter = express.Router();

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use("/", appRouter)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
app.get('/home', function (req res) {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});
// home page
// appRouter.route("/").get(homeGET)

// // SignUp & Login page
// appRouter.route("/login").get(loginGET).post(loginPOST)
// appRouter.route("/signin").post(signinPOST)
app.post("/signin", (req, res) => {

  res.redirect("/home")
})

//Product page
// appRouter.route("/product").get(productGET)

//contact page
// appRouter.route("/contact").get(contactGET)

// Admin page
// appRouter.route("/Admin").get(adminGET)

function signinPOST(req, res) {
  res.send(req.body);
}
app.listen(4000)
