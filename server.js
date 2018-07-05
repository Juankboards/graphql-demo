const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random(max: Int): Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const root = {
  quoteOfTheDay: () => {
    return Math.random() <0.5? "You're Good" : null;
  },
  random: ({ max }) => {
    return Math.random() * (max || 1);
  },
  rollDice: ({ numDice, numSides }) => {
    let rollResult = [];
    for(let i=0; i < numDice; i++) {
      rollResult.push( 1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return rollResult;
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
