//IIFE
const pokemonRepository = (function () {
  //main array
  const pokemonList = [];
  //searchBar
  const searchBar = document.querySelector('#searchBar');
  //apiUrl for fetching pokemonList
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    const pokeList = document.querySelector('.list-group');
    //creating list elements
    const listPokemon = document.createElement('li');
    listPokemon.classList.add('group-list-item');
    const button = document.createElement('button');
    button.innerText = pokemon.name; //accesses the name from pokemonRepository
    button.classList.add('btn', 'btn-block') //adds class for manipulation in css
    //event listener
    button.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal');
    listPokemon.appendChild(button);
    pokeList.appendChild(listPokemon);

    button.addEventListener('click', function (event) {
      showDetails(pokemon); //calls the showDetails function
    });
  }

  //fetching list data from apiUrl and converting it for DOM through Promise
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        //To capitalize the List names
        const listNameCaps = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        const pokemon = {
          name: listNameCaps,
          detailsUrl: item.url
        };
        add(pokemon); //adding the apiUrl list to the pokemonList array
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //fetching pokemon details from apiUrl
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      //pokemon types
      item.types = [];
      for (var i=0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      //pokemon abilities
      item.abilities = [];
      for (var i=0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }

    }).catch(function (e) {
      console.error(e);
    });
  }

  //reveals pokemon details when button is clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon); //Loads Modal of pokemon's details
    });
  }

  // modal function
  function showModal(item) {
    pokemonRepository.loadDetails(item).then(function() {
    const modalBody = $('.modal-body');
    const modalTitle = $('.modal-title');

    //clear all modal content
    modalBody.empty();
    modalTitle.empty();

    const pokemonTypes = $('<p>' + 'Types: ' + item.types + '</p>');

    //pokemon abilities
    const pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    //Pokemon height
    const pokemonHeight = $('<p>' + 'Height: ' + item.height + 'm' + '</p>');

    //pokemon image front
    const pokemonImageFront = $('<img class="modal-img" style="width:20%" alt="Sprite Front">');
    pokemonImageFront.attr('src', item.imageUrl);

    //pokemon image back
    const pokemonImageBack = $('<img class="modal-img" style="width:20%" alt="Sprite Back">');
    pokemonImageBack.attr('src', item.imageUrlBack);

    //append all elements created to the modal
    modalTitle.append(item.name);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);

    $('#pokemonModal').modal('toggle');
  });
}

//Search Bar
searchBar.addEventListener('input', function () {
   const listPokemon = document.querySelectorAll('li');
   const value = searchBar.value.toUpperCase();

   listPokemon.forEach(function (pokemon) {
     if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
       pokemon.style.display = '';
     } else {
       pokemon.style.display = 'none';
     }
   });
 });

  //accessible keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };

})();

//calling the loadList function to fetch data from API
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
