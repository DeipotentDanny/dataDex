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
    let pokeList = document.querySelector('.pokemon-list');
    //creating list elements
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('list-item');
    //adding img to list items
    let pokemonImg = document.createElement('img');
    pokemonImg.classList.add('list-img');
    //Adding button to each pokemon
    let button = document.createElement('button');
    pokemonImg.src = ""
    button.innerText = pokemon.name; //accesses the name from pokemonRepository
    button.classList.add('button-class') //adds class for manipulation in css
    //event listener
    listPokemon.appendChild(pokemonImg);
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
      item.image = details.sprites.front_default;
      item.height = details.height;
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

  //modal for hidden pokemon info
  let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let imgElement = document.createElement('img');
    imgElement.classList.add('pokemon-img');
    let nameElement = document.createElement('h1');
    nameElement.classList.add('pokemon-name');
    nameElement.innerText = pokemon.name;
    let heightElement = document.createElement('p');
    heightElement.classList.add('pokemon-height');
    heightElement.innerText = 'Height: ' + pokemon.height + 'm';

    imgElement.src = pokemon.image;

    modal.appendChild(closeButtonElement);
    modal.appendChild(imgElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

//   document.querySelector('#show-modal').addEventListener('click', () => {
//     showModal('Modal', 'This is a modal...');
// });

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
