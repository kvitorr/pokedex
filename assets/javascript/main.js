const pokemonList = document.getElementById('pokemons')
const loadMorePokemon = document.getElementById('button')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(pokemonType => `<li class="type ${pokemonType}">${pokemonType}</li>`).join('')}
                    </ol>   
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
       const newHtml = pokemons.map(convertPokemonToLi).join('');
       pokemonList.innerHTML += newHtml
    })  
}

loadPokemonItens(offset, limit)

loadMorePokemon.addEventListener('click', () => {
    offset += limit

    loadPokemonItens(offset, limit)
})