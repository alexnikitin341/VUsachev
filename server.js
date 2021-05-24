const app = require("express")();
const MongoClient = require("mongodb").MongoClient;
const jsonParser = require("body-parser").json();
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");

app.use(cors());

const mam = {
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

const mp = {
  name: "Москва-Петушки",
  src: "https://sti.ru/wp-content/uploads/2015/02/IVNI3697.jpg",
  genre: "поэма в 2-х частях",
  director: "Венедикт Ерофеев",
  troupe: `
  Веничка – Алексей Вертков
  Ангелы Небесные – Катерина Васильева, Елизавета Кондакова
  Девушка-баллада – Мария Курденевич, Варвара Насонова
  Официантка – Татьяна Волкова
  Дедушка Митрич – Сергей Качанов`,
  description: `Это миф об одиночестве умного интеллигентного честного человека, лишнего и ненужного в этой стране. Это диагноз целого поколения. Что касается мата, то это часть нашей жизни, истории, культуры, русского языка, и никуда мы от этого не денемся. Грязь возникает только тогда, когда матерные слова направлены на оскорбление, унижение чести и достоинства другого человека. Мир, который он создал в поэме «Москва-Петушки», – это некая мистификация, тонкая и умная игра”.`,
  scenes: [
    { id: 1, name: "Представление еще не началось", active: true },

    {
      id: 2,
      name: "Веничка Ерофеев едет из Москвы",
      description: `"И вот как раз в то время, когда Михаил Александрович рассказывал поэту о том, как ацтеки лепили из теста фигурку Вицли-Пуцли, в аллее показался первый человек."`,
      active: false,
    },
    {
      id: 3,
      name: "Веничка на вокзале",
      description: `Веничка, как он сам говорит, не идет, а влечется, преодолевая похмельную тошноту, на Курский вокзал, откуда отправляется электричка в желанные Петушки. На вокзале он заходит в ресторан, и душа его содрогается в отчаянии`,
      active: false,
    },
    {
      id: 4,
      name: "Веничка затомился.",
      description: `Разве это ему нужно? Разве по этому тоскует его душа? Нет, не это ему нужно, но — желанно. Он берет четвертинку и бутерброд, выходит в тамбур и выпускает наконец погулять свой истомившийся в заключении дух`,
      active: false,
    },
    {
      id: 5,
      name: "Веничку скинули с бригадирства.",
      description: `Производ­ственный процесс работяг состоял из игры в сику, питья вермута и разматывания кабеля. Веничка процесс упростил: кабель вообще перестали трогать, день играли в сику, день пили вермут или одеколон «Свежесть». Но сгубило его другое`,
      active: false,
    },

    {
      id: 6,
      name: "Выходит Веничка",
      description: `Выходит Веничка своему искреннему изумлению, и впрямь в Москве, где на перроне сразу подвергается нападению четверых молодчиков. Они бьют его, он пытается убежать. Начинается преследование. `,
      active: false,
    },
    { id: 999, name: "Представление закончилось", active: false },
  ],
};

const r = {
  name: "Ретро",
  src: "https://studfile.net/html/2706/740/html_dPvRkO_Qvk.swtH/img-8_CDEs.jpg",
  genre: "Современная история в двух действиях",
  director: "Владимир Туманов",
  troupe: `
  Николай Михайлович Чмутин - заслуженный артист России Борис Улитин
  Людмила, его дочь - Галина Гудова, Ирина Сотикова
  Леонид, её муж - Михаил Николаев, Андрей Толшин
  Диана Владимировна Барабанова - Людмила Вагнер`,
  description: `Трогательная, грустная и смешная история о том, что обрести себя и встретить родную душу можно в любом возрасте и при самых странных обстоятельствах…`,
  scenes: [
    { id: 1, name: "Представление еще не началось", active: true },

    {
      id: 2,
      name: "Встреча у озера",
      description: `Николай впервые встречает Людмилу`,
      active: false,
    },
    {
      id: 3,
      name: "Встреча у окна",
      description: `Николай не впервые встречает Людмилу`,
      active: false,
    },
    {
      id: 4,
      name: "Разминулись",
      description: `Николаю не удалось встретить Людмилу`,
      active: false,
    },
    {
      id: 5,
      name: "Жди меня",
      description: `Людмила ждет Николая, а он весь заждался`,
      active: false,
    },
    {
      id: 6,
      name: "Камень души",
      description: `Николай не может определиться`,
      active: false,
    },
    {
      id: 7,
      name: "Случай у стоматолога",
      description: `Людмила уходит от Николая`,
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
    // .insertOne(r)
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

app.listen(process.env.PORT || 9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("listent port..." + (process.env.PORT || 9999));
});
