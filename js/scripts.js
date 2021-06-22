//IIFE
const pokemonRepository = (function () {

  //main array
  const pokemonList = [
    { name: 'Bulbasaur', height: 7, type: ['grass', 'poison']},
    { name: 'Squirtle', height: 5, type: ['water']},
    { name: 'Charmander', height: 6, type: ['fire']},
    { name: 'Pikachu', height: 4, type: ['electric']}
  ];

  //public function
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'type' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon input incorrect')
    }
  };

  //public function
  function getAll() {
    return pokemonList;
  };

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
  };

  function showDetails(pokemon) {
    console.log(pokemon.name); //prints the pokemon's name to the console
  };

  //accessible keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };

})();

//validation of IIFE and code functionality
pokemonRepository.add({ height: '32' }); //should return Pokemon input incorrect in console
console.log(pokemonRepository.getAll());

//Function to validate and write data to DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  //calling pokeList from (function() {
  pokemonRepository.addListItem(pokemon);
});
