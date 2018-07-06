const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");

const schema = buildSchema(`
  type RandomAlbum {
    songs: [Int]
    numSongs: Int!
    randomSong: Int!
    randomPlaylist(numSongs: Int!): [Int]
  }

  type Query {
    getAlbum(numSongs: Int): RandomAlbum
  }
`);

class RandomAlbum {
  constructor(numSongs) {
    this.songs = this._generateSongs(numSongs);
    this.numSongs = numSongs;
  }

  _randomNumber(max) {
    return (1 + Math.floor(Math.random() * max));
  }

  _generateSongs(numSongs) {
    var songs = [];
    for(let i=0; i < numSongs; i++) {
      songs.push(this._randomNumber(numSongs));
    }
    return songs;
  }

  randomSong() {
    return this.songs[this._randomNumber(this.numSongs) - 1];
  }

  randomPlaylist({ numSongs }) {
    var songs = [];
    for(let i=0; i < numSongs; i++) {
      songs.push(this.randomSong());
    }
    return songs;
  }
}

const root = {
  getAlbum: ({ numSongs }) => {
    return new RandomAlbum(numSongs || 1);
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
