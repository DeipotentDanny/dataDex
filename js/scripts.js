//IIFE
const pokemonRepository = (function () {
  //main array
  const pokemonList = [];
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
    let pokeList = document.querySelector('.list-group');
    //creating list elements
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('group-list-item');
    //adding img to list items
    // let pokemonImg = document.createElement('img');
    // pokemonImg.classList.add('list-img');
    //Adding button to each pokemon
    let button = document.createElement('button');
    // pokemonImg.src = ""
    button.innerText = pokemon.name; //accesses the name from pokemonRepository
    button.classList.add('btn', 'btn-block') //adds class for manipulation in css
    //event listener
    button.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal');
    // listPokemon.appendChild(pokemonImg);
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
        let listNameCaps = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        let pokemon = {
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
    let url = item.detailsUrl;
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
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //clear all modal content
    modalBody.empty();
    modalTitle.empty();

    //Pokemon name
    let nameElement = $('<h1>' + item.name + '</h1>');

    //pokemon types
    let pokemonTypes = $('<p>' + 'Types: ' + item.types + '</p>');

    //pokemon abilities
    let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    //Pokemon height
    let pokemonHeight = $('<p>' + 'Height: ' + item.height + 'm' + '</p>');

    //pokemon image front
    let pokemonImageFront = $('<img class="modal-img" style="width:20%" alt="Sprite Front">');
    pokemonImageFront.attr('src', item.imageUrl);

    //pokemon image back
    let pokemonImageBack = $('<img class="modal-img" style="width:20%" alt="Sprite Back">');
    pokemonImageBack.attr('src', item.imageUrlBack);

    //append all elements created to the modal
    modalTitle.append(nameElement);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);

    $('#pokemonModal').modal('toggle');
  });
}

// Search Bar will be completed at a later time
// function searchFunction() {
//  var input, filter, ul, li, a, i, txtValue;
//  input = document.getElementById('searchBar');
//  filter = input.value.toUpperCase();
//  ul = document.getElementById('list-group');
//  li = ul.getElementsByTagName('li');
//  for (i = 0; i < li.length; i++) {
//    a = li[i].getElementsByTagName('button')[0];
//    txtValue = a.textContent || a.innerText;
//    if (txtValue.toUpperCase().indexOf(filter) > -1) {
//      li[i].style.display = '';
//    } else {
//      li[i].style.display = 'none';
//    }
//  }
// }

  //accessible keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
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
// pokemonRepository.add({ height: '32' }); //should return Pokemon input incorrect in console
// console.log(pokemonRepository.getAll());
