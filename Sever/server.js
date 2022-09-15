const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const appRouter = express.Router();

// Middlewares
app.use(bodyParser.json())
app.use("/",appRouter)

// home page
appRouter.route("/").get(homeGET)

// SignUp & Login page
appRouter.route("/login").get(loginGET).post(loginPOST)

//Product page
appRouter.route("/product").get(productGET)

//contact page
appRouter.route("/contact").get(contactGET)

// Admin page
appRouter.route("/Admin").get(adminGET)

app.listen(4000)
