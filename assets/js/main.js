const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const modalDetails = document.getElementById('modal-details');
const modal = document.getElementById('modal-id');

const maxRecords = 151;
const limit = 3;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
            <li id=${pokemon.number} class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        <li class="type">poison</li>
                    </ol>
                    <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                </div>
            </li>
    `).join('')
    pokemonList.innerHTML += newHtml

        
    const newPokemonItems = document.querySelectorAll('.pokemon');
        newPokemonItems.forEach((item) => {
            item.addEventListener('click', function(event) {
                const liClicado = event.currentTarget;
                const urlClicado = `https://pokeapi.co/api/v2/pokemon/${liClicado.id}`;
                modal.style.display = "block";
                fetch(urlClicado)
                .then(response => response.json())
                .then(dataPokemon => {
                    const pokemonInfo = new PokemonDetails(
                        dataPokemon.name,
                        dataPokemon.height,
                        dataPokemon.weight,
                        dataPokemon.species.name,
                        dataPokemon.sprites.front_default,
                        
                    )
                    modalInfo(pokemonInfo);
                    console.log(pokemonInfo)
                })
                fetch(urlClicado)
                .then(response => response.json())
                .then(extraDataPokemon => {
                    
                    const abilities = extraDataPokemon.abilities.map(ability => ability.ability.name)

                    document.getElementById('pokemon-abilities').innerText = `Abilities: ${abilities}`

                })
    })

    function modalInfo(pokemonInfo) {
        document.getElementById('pokemon-name').innerText = `${pokemonInfo.name}`
        document.getElementById('pokemon-height').innerText = `Height: ${pokemonInfo.height / 10} meters`
        document.getElementById('pokemon-weight').innerText = `Weight: ${pokemonInfo.weight / 10} kilograms`
        document.getElementById('pokemon-species').innerText = `Species: ${pokemonInfo.species}`

        const modalphoto = document.getElementById('pokemon-photo')
        modalphoto.src = pokemonInfo.photo
        modalphoto.alt = pokemonInfo.name    
    }

})
    })
}
 
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {

    loadPokemonItens(offset, limit)
    }
})

function closeModal() {
    modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
    if(event.target === modal) {
        closeModal()
    }
})