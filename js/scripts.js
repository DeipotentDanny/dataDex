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
      'name' in pokemon
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

  //accessible keys
  return {
    add: add,
    getAll: getAll
  };

})();

//validation of IIFE and code functionality
pokemonRepository.add({ height: '32' }); //should return Pokemon input incorrect in console
console.log(pokemonRepository.getAll());

//Function to validate and write data to DOM
pokemonRepository.getAll().forEach(function(list) {
    //Prints pokemon data to DOM
    document.write("<p>" + list.name + " (height :" + list.height + ")" + "</p>");
    //Checks if pokemon height is greater than 6
    if (list.height > 6) {
      document.write("<p> -Wow, that's big! </p>");
    }
    //Prints the array to the console for validation
    console.log(list.name);
});
