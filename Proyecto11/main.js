window.onload = function () {
  var getAllBtn = document.getElementById("getAllBtn");
  var filterBtn = document.getElementById("filterBtn");
  var output = document.getElementById("output");

  function createCard(character) {
    var card = document.createElement("div");
    card.className = "card";

    var img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;

    var name = document.createElement("h3");
    name.textContent = character.name;

    var status = document.createElement("p");
    status.textContent = "Estado: " + character.status;

    var species = document.createElement("p");
    species.textContent = "Especie: " + character.species;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(status);
    card.appendChild(species);

    return card;
  }

  function renderCharacters(results) {
    output.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
      var card = createCard(results[i]);
      output.appendChild(card);
    }
  }

  function handleError() {
    output.innerHTML = "<p style='color:red;'>Ocurrió un error al obtener los datos.</p>";
  }

  function getCharacters(url) {
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Error en la respuesta");
        }
        return response.json();
      })
      .then(function (data) {
        renderCharacters(data.results);
      })
      .catch(function (error) {
        handleError();
      });
  }

  getAllBtn.onclick = function () {
    getCharacters("https://rickandmortyapi.com/api/character");
  };

  filterBtn.onclick = function () {
    var name = document.getElementById("name").value;
    var status = document.getElementById("status").value;
    var species = document.getElementById("species").value;
    var type = document.getElementById("type").value;
    var gender = document.getElementById("gender").value;

    var query = [];

    if (name) query.push("name=" + encodeURIComponent(name));
    if (status) query.push("status=" + encodeURIComponent(status));
    if (species) query.push("species=" + encodeURIComponent(species));
    if (type) query.push("type=" + encodeURIComponent(type));
    if (gender) query.push("gender=" + encodeURIComponent(gender));

    var finalUrl = "https://rickandmortyapi.com/api/character";
    if (query.length > 0) {
      finalUrl += "?" + query.join("&");
    }

    getCharacters(finalUrl);
  };
};