import express from "express"
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("api is running")
});

app.listen(1337, ()=>console.log("api is running"))