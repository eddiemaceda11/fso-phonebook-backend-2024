const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`<h1>Phonebook has info for ${persons.length} people</h1> <br /> <p>${Date.now()}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  let maxId = persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body, "is the body");
  if (!body.name || !body.number) {
    res.status(404).json({
      error: "name missing",
    });
  }

  for (let person in persons) {
    if (persons[person].name === body.name) {
      res.status(404).json({
        error: "name already exists",
      });
    }
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = 5500;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
