const pokemonList = document.getElementById('pokemons')
const loadMorePokemon = document.getElementById('button')



const maxRecords = 151
const limit = 20
let offset = 0;

// ./pokemon.html?name=${pokemon.name}

function convertPokemonToHtml(pokemon) {
    return `
    <a href="./pokemon.html?name=${pokemon.name}">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(pokemonType => `<li class="type ${pokemonType}">${pokemonType}</li>`).join('')}
                    </ol>
                    <div>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>   
                </div>
            </li>
    </a>
    `
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
       const newHtml = pokemons.map(convertPokemonToHtml).join('');
       pokemonList.innerHTML += newHtml
    })  
}

loadPokemonItens(offset, limit)

loadMorePokemon.addEventListener('click', () => {
    offset += limit

    loadPokemonItens(offset, limit)
})