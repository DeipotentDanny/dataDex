const pokemonList = [
  { name: 'Bulbasaur', height: 7, type: ['grass', 'poison']},
  { name: 'Squirtle', height: 5, type: ['water']},
  { name: 'Charmander', height: 6, type: ['fire']},
  { name: 'Pikachu', height: 4, type: ['electric']}
];

for (let i=0; i < pokemonList.length; i++) {
  //Prints pokemon name to DOM
  document.write(pokemonList[i].name + " (height :" + pokemonList[i].height + ")");
  //Checks if pokemon height is greater than 6
  if (pokemonList[i].height > 6) {
    document.write(" -Wow, that's big!");
  }
  //Adds breaks between items
  document.write("<br>")
}
