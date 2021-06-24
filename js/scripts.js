//IIFE
const pokemonRepository = (function () {

  //main array
  const pokemonList = [];
  //apiUrl for fetching pokemonList
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //public function
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon input incorrect')
    }
  }

  //public function
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    //DOM manipulation of pokemonList
    let pokeList = document.querySelector('.pokemon-list');
    //creating list elements
    let listPokemon = document.createElement('li');
    //Adding button to each pokemon
    let button = document.createElement('button');
    button.innerText = pokemon.name; //accesses the name from pokemonRepository
    button.classList.add('button-class') //adds class for manipulation in css
    //event listener
    button.addEventListener('click', function (event) {
      showDetails(pokemon); //calls the showDetails function
    });
    listPokemon.appendChild(button);
    pokeList.appendChild(listPokemon);
  }

  //reveals pokemon details when button is clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon); //prints the pokemon's deatils to the console
    });
  }

  //fetching list data from apiUrl and converting it for DOM through Promise
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon); //adding the apiUrl list to the pokemonList array
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //fetching pokemon details from apiUrl
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //accessible keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

//calling the loadList function to fetch data from API
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//validation of IIFE and code functionality
pokemonRepository.add({ height: '32' }); //should return Pokemon input incorrect in console
console.log(pokemonRepository.getAll());

//Function to validate and write data to DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon); //calling pokeList from function
});
