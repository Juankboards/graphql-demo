const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const { MongoClient, ObjectID } = require("mongodb");
let db;

MongoClient.connect("mongodb://localhost:27017/graphql-demo", (errDb, client) => {
  if(errDb) throw err;
  db = client.db("graphql-demo");
});


const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    age: Int!
    nationality: String
    hobbies: [String]
    greeting(name: String): String!
  }

  input UserInput {
    name: String!
    age: Int!
    nationality: String
    hobbies: [String]
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }

  type Query {
    getUser(id: ID!): User
  }
`);

class User {
  constructor(id, { name, age, nationality, hobbies }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.nationality = nationality;
    this.hobbies = hobbies;
  }

  greeting({ name }) {
    return `Hi ${ name }, I'm ${ this.name }. Nice to meet you!`
  }
}

const root = {
  getUser: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.collection("users").find(ObjectID(id)).toArray()
        .then(user => {
          if(user.length > 0){
            resolve(new User(id, user[0]));
          } else {
            resolve(`No User with ID ${ id }`);
          }
        })
        .catch(err => {
          reject(JSON.stringify(err));
        });
    });
  },
  createUser: ({ input }) => {
    return new Promise((resolve, reject) => {
      db.collection("users").save(input)
        .then(user => {
          resolve(new User(user.ops[0]._id, user.ops[0]));
        })
        .catch(err => {
          reject(JSON.stringify(err));
        });
    });
  },
  updateUser: ({ id, input }) => {
    return new Promise((resolve, reject) => {
      db.collection("users").findOneAndUpdate(ObjectID(id), { $set: input }, { returnNewDocument : true })
        .then(user => {
          if(user.value){
            resolve(new User(id, user.value));
          } else {
            resolve(`No User with ID ${ id }`);
          }
        })
        .catch(err => {
          reject(JSON.stringify(err));
        });
    });
  }
};
const app = express();
const port = process.env.PORT || 4000;
app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use(express.static('public'));
app.use("/", (req,res) => {
  res.sendFile(`${ __dirname }/public/index.html`);
});

app.listen(port, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
})
