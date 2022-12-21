const pokeApi = {}

function pokeDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    const types = pokeDetail.types.map(typesSlot => typesSlot.type.name);

    pokemon.type = types[0];
    pokemon.types = types;

    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return (fetch(pokemon.url)
    .then(pokeDetail => pokeDetail.json()))
    .then(pokeDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequest => Promise.all(detailRequest))
    .then(pokemonsDetails => pokemonsDetails)
}