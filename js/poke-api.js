const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //mesma coisa que const type = types.get(0)

    pokemon.types = types
    pokemon.type = type

    //const abilities = pokeDetail.abilities.map((response) => console.log(response.ability.name))
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)

    pokemon.abilities = abilities;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //requisita
        .then((response) => response.json()) //transforma em json
        .then((jsonBody) => jsonBody.results) //pega só o result e descarta o resto
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //pega os detalhes
        .then((detailRequests) => Promise.all(detailRequests)) //espera todos detalhes voltarem
        .then((pokemonsDetails) => pokemonsDetails) //retorna detalhes
}