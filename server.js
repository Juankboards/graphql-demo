const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

const root = {
  quoteOfTheDay: () => {
    return Math.random() <0.5? "You're Good" : null;
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() *  6));
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
