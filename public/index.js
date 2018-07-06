function query() {
  ajaxRequest(`{
    getUser(id: "5b3eea48c3948111f29a68e3") {
      id
      greeting(name: "Juancho")
      age
    }
  }`);
}

function save() {
  ajaxRequest(`mutation {
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
  }`);
}

function update() {
  ajaxRequest(`mutation {
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
  }`);
}

function ajaxRequest (body) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status < 400) {
      const result = httpRequest.responseText.replace(/([{}:,])/gi, "$&&nbsp&nbsp");
      document.getElementById("result").innerHTML = "<p>" + result + "</p>";
    }
  }
  httpRequest.open("POST", "/graphql", true);
  httpRequest.setRequestHeader("content-type", "application/graphql");
  httpRequest.send(body);
}
