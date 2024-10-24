const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(404).json({ error: "name must be unique" });
  }

  for (let person of persons) {
    if (person.name == body.name) {
      return res.status(404).end({ error: "name must be unique" });
    }
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  res.json(persons);
});

app.get("/info", (req, res) => {
  const content = `<p>Phonebook has info for ${persons.length} people</p>
  <p>${Date()}</p>`;
  res.send(content);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personToSend = persons.find((person) => person.id === id);
  if (personToSend) {
    res.json(personToSend);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(3001, (req, res) => {
  console.log("running");
});
