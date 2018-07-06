function query() {
  const body = {
    query: `{
        getUser(id: "5b3eea48c3948111f29a68e3") {
          id
          greeting(name: "Juancho")
          age
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

function save() {
  const body = `mutation {
    createUser(input: {
      name: "Juan Ruiz",
      age: 27,
      nationality: "colombian",
      hobbies: ["pizza", "music"]
    }) {
      id
      name
      hobbies
    }
  }`;
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status < 400) {
      const result = httpRequest.responseText.replace(/([{}:,])/gi, "$&&nbsp&nbsp");
      document.getElementById("root").innerHTML = "<p>" + result + "</p>";
    }
  }
  httpRequest.open("POST", "/graphql", true);
  httpRequest.setRequestHeader("content-type", "application/graphql");
  httpRequest.send(body);
}

function update() {
  const body = `mutation {
    updateUser(id: "5b3eea48c3948111f29a68e3", input: {
      name: "Juancho Ruiz",
      age: 35,
      nationality: "colombian",
      hobbies: ["pizza", "music", "read"]
    }) {
      id
      name
      hobbies
    }
  }`;
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status < 400) {
      const result = httpRequest.responseText.replace(/([{}:,])/gi, "$&&nbsp&nbsp");
      document.getElementById("root").innerHTML = "<p>" + result + "</p>";
    }
  }
  httpRequest.open("POST", "/graphql", true);
  httpRequest.setRequestHeader("content-type", "application/graphql");
  httpRequest.send(body);
}
