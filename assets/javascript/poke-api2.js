const urlOrients = new URLSearchParams(window.location.search)
const nameOrient = urlOrients.get("name")
const url = `https://pokeapi.co/api/v2/pokemon/${nameOrient}`


function convertPokemonToHtml2 (pokeDetail) {

    const pokemonDesc = document.getElementById('body')

    const pokemon = new Pokemon();
    const types = pokeDetail.types.map(typesSlot => typesSlot.type.name);

    pokemon.type = types[0];
    pokemon.types = types;

    const stats = pokeDetail.stats.map(statsSlot => statsSlot.base_stat)

    pokemon.hp = stats[0]
    pokemon.attack = stats[1]
    pokemon.defense = stats[2]
    pokemon.specialAttack = stats[3]
    pokemon.specialDefense = stats[4]
    pokemon.speed = stats[5]

    console.log(stats)
    

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    
    console.log(pokemonDesc)

    console.log(pokemonDesc.innerHTML);

    pokemonDesc.innerHTML = `
    <main class="${pokemon.type}">
        <section id="main-content">
            <div id="seta-voltar">
                <a href="./index.html">
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M 6.2383 28.0000 C 6.2383 28.5859 6.4961 29.1250 6.9648 29.5703 L 22.5273 45.1094 C 23.0195 45.5547 23.5117 45.7656 24.0508 45.7656 C 25.2227 45.7656 26.1133 44.9219 26.1133 43.7500 C 26.1133 43.1875 25.9024 42.6250 25.5273 42.2734 L 20.3008 36.9297 L 12.3789 29.7344 L 18.0742 30.0859 L 47.6992 30.0859 C 48.9179 30.0859 49.7617 29.2188 49.7617 28.0000 C 49.7617 26.7812 48.9179 25.9141 47.6992 25.9141 L 18.0742 25.9141 L 12.4024 26.2656 L 20.3008 19.0703 L 25.5273 13.7266 C 25.9258 13.3515 26.1133 12.8125 26.1133 12.2500 C 26.1133 11.0781 25.2227 10.2344 24.0508 10.2344 C 23.5117 10.2344 22.9961 10.4219 22.4805 10.9375 L 6.9648 26.4297 C 6.4961 26.8750 6.2383 27.4141 6.2383 28.0000 Z"/></svg>
                </a>
            </div>
            <div id="pokemon-label">
                <div id="pokemon-name-types">
                    <p id="pokemon-name">${pokemon.name}</p>
                    <ul id="pokemon-types">
                    ${pokemon.types.map(pokemonType => `<li class="type ${pokemonType}">${pokemonType}</li>`).join('')}
                    </ul>
                </div>
                <div>#${pokemon.number}</div>
            </div>

            <div id="pokemon-img">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </section>
        
        <section id="section-about-stats">
            <div class="flex">
                <p>Info</p>
            </div>

            <div class="flex-2">
            <div>
                <p class="value">${pokemon.height}</p>    
                <p class="value-name">Height</p>
            </div>
            <div class="divisoria">
            </div>
            <div>
                <p class="value">${pokemon.weight}</p>
                <p class="value-name">Weight</p>
            </div>
            </div>

            <div class="flex-4">
                <p>Base Stats</p>
            </div>

            <div class="flex-3">
                <div class="titles">
                    <p>HP</p>
                    <p>Attack</p>
                    <p>Defense</p>
                    <p>Special-attack</p>
                    <p>Special-defense</p>
                    <p>Speed</p>
                </div>
                <div class="values">
                    <div class="titles-value">
                        <div class="barra">
                            <div class="${pokemon.type}" style="width: ${pokemon.hp}%;"></div>
                        </div>
                        <div class="barra">
                            <div class="${pokemon.type}" style="width: ${pokemon.attack}%"></div>
                        </div>
                        <div class="barra">
                            <div class="${pokemon.type}" style="width: ${pokemon.defense}%"></div>
                        </div>
                        <div class="barra">
                            <div class="${pokemon.type}" style="width: ${pokemon.specialAttack}%"></div>
                        </div>
                        <div class="barra">
                            <div class="${pokemon.type}" style="width: ${pokemon.specialDefense}%"></div>
                        </div>
                        <div class="barra">
                            <div class="${pokemon.type}" style="width: ${pokemon.speed}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        </div>
    </main>
    `
}

fetch(url)
.then(response => response.json())
.then(jsonBody => convertPokemonToHtml2(jsonBody))
