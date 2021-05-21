const app = require("express")();
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb+srv://user:user@cluster0.32ja2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");

    const db = client.db("diplom");
    const performCollection = db.collection("performs");
  }
);

const performs = [1, 2, 3];

app.get("/performs", (req, res) => {
  res.json(performs);
});

app.get("/post", (req, res) => {
  res.json(performs);
});

app.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("listent 9999...");
});
