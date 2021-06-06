const app = require("express")();
const MongoClient = require("mongodb").MongoClient;
const jsonParser = require("body-parser").json();
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");

app.use(cors());


MongoClient.connect(
  "mongodb+srv://user:user@cluster0.32ja2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");

    const db = client.db("diplom");
    const performCollection = db.collection("performs");
    
    app.get("/performs", (req, res) => {
      performCollection
        .find()
        .toArray()
        .then((results) => {
          res.json(results);
        })
        .catch((error) => console.error(error));
    });

    app.get("/perform/:id", (req, res) => {
      performCollection
        .findOne(new ObjectId(req.params.id))
        .then((result) => {
          res.json(result);
        })
        .catch((error) => console.error(error));
    });

    app.post("/perform", jsonParser, (req, res) => {
      performCollection
        .insertOne(req.body)
        .then(() => {
          res.json("success add");
        })
        .catch((error) => console.error(error));
    });

    app.put("/perform/:id", jsonParser, (req, res) => {
      performCollection
        .findOneAndUpdate(
          { _id: new ObjectId(req.params.id) },
          {
            $set: {
              ...req.body,
            },
          },
          {
            returnOriginal: false,
          }
        )
        .then((result) => {
          res.json(result);
        })
        .catch((error) => console.error(error));
    });

    app.delete("/perform/:id", jsonParser, (req, res) => {
      performCollection
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
          res.json(result);
        })
        .catch((error) => console.error(error));
    });
  }
);

app.listen(process.env.PORT || 9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("listent port..." + (process.env.PORT || 9999));
});
