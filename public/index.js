function query() {
  const body = {
    query: `{
        getAlbum(numSongs: 12) {
          randomSong
          randomPlaylist(numSongs: 4)
          songs
        }
      }`
    };
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status < 400) {
      const result = httpRequest.responseText.replace(/([{}:,])/gi, "$&&nbsp&nbsp");
      document.getElementById("root").innerHTML = "<p>" + result + "</p>";
    }
  }
  httpRequest.open("POST", "/graphql", true);
  httpRequest.setRequestHeader("content-type", "application/json");
  httpRequest.send(JSON.stringify(body));
}
