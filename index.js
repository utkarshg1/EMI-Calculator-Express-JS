import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/calculate-emi", (req, res) => {
    console.log(req.body);
    const loanAmount = parseFloat(req.body["loanAmount"]);
    const interestRate = parseFloat(req.body["interestRate"]);
    const loanTenure = parseFloat(req.body["loanTenure"]);
    const x = Math.pow(1+ (interestRate/1200), loanTenure*12);
    const emi = (loanAmount*(interestRate/1200)*x)/(x-1);
    console.log(emi.toFixed(2));
    res.render("index.ejs", {
        "emi" : emi
    });
});

app.listen(port, () => {
  console.log(`Server Listening on Port : ${port}`);
});
