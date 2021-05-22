const app = require("express")();
const MongoClient = require("mongodb").MongoClient;
const jsonParser = require("body-parser").json();
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");

app.use(cors());

const performs = {
  name: "Мастер и Маргарита",
  src: "https://sti.ru/wp-content/uploads/2015/05/IVSH0357.jpg",
  genre: "Драма",
  director: "Сергей Женовач",
  troupe: `
            Берлиоз, писатель - Сергей АБРОСКИН
            Наташа, домработница Маргариты - Катерина ВАСИЛЬЕВА
            Воланд - Алексей ВЕРТКОВ
            Гелла - Татьяна ВОЛКОВА
            Маргарита - Дарья МУРЕЕВА
            Бегемот, кот - Вячеслав ЕВЛАНТЬЕВ
            Мастер - Игорь ЛИЗЕНГЕВИЧ`,
  description: `Режиссер Сергей Женовач о спектакле: «Изначально нам не хотелось идти по пути иллюстрирования сюжета. А хотелось вникнуть в замысел романа и выдумать свою сценическую реальность. В сочинении этого спектакля нам очень помогли черновики и варианты редакций великого романа».`,
  scenes: [
    { id: 1, name: "Представление еще не началось", active: true },

    {
      id: 2,
      name: "Берлиоз. Бездомный. Консультант.",
      description: `"И вот как раз в то время, когда Михаил Александрович рассказывал поэту о том, как ацтеки лепили из теста фигурку Вицли-Пуцли, в аллее показался первый человек."`,
      active: false,
    },
    {
      id: 3,
      name: "Первая встреча Мастера и Маргариты.",
      description: `"Она несла в руках отвратительные тревожные жёлтые цветы..."`,
      active: false,
    },
    {
      id: 4,
      name: "Гелла и буфетчик.",
      description: `"Ему открыли немедленно, но буфетчик вздрогнул, попятился и вошёл не сразу. Это было понятно. открыла дверь девица, на которой ничего не было, кроме кокетливого кружевного фартучка и белой наколки на голове. На ногах, впрочем, были золотые туфельки."`,
      active: false,
    },
    {
      id: 5,
      name: "Встреча Маргариты с Азазелло в Александровском саду.",
      description: `"Рыжий огляделся и сказал таинственно:
    - Меня прислали, чтобы вас сегодня вечером пригласить в гости."`,
      active: false,
    },
    {
      id: 6,
      name: "Бал у Сатаны.",
      description: `"Бал упал на неё сразу в виде света, вместе с ним - звука и запаха.
    ...Возвышавшийся перед оркестром человек во фраке, увидев Маргариту, побледнел, заулыбался и вдруг взмахом руки поднял весь оркестр. Ни на мгновенье не прерывая музыки, оркестр, стоя, окатывал Маргариту звуками."`,
      active: false,
    },
    {
      id: 7,
      name: "Возвращение Мастера.",
      description: `"Она целовала его в лоб, в губы, прижималась к колючей щеке, и долго сдерживаемые слёзы теперь бежали ручьями по её лицу. Она произносила только одно слово, бессмысленно повторяя его:
    - Ты... ты, ты...`,
      active: false,
    },
    { id: 999, name: "Представление закончилось", active: false },
  ],
};

MongoClient.connect(
  "mongodb+srv://user:user@cluster0.32ja2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");

    const db = client.db("diplom");
    const performCollection = db.collection("performs");
    // performCollection
    // .insertOne(performs)
    // .then((result) => {
    //   res.json("success add");
    // })
    // .catch((error) => console.error(error));
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
        .then((result) => {
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

app.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("listent 9999...");
});
