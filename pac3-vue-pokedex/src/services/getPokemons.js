import axios from 'axios'

const apiPokemon = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'applicaction/json'
    }
});

const apiPokemonSpecies = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon-species',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'applicaction/json'
    }
});

export default {
    getPokemons(offset = '0', limit = '905') {
        return apiPokemon.get( '?offset=' + offset + '&limit=' + limit );
    },
    async getPokemon(id) {
        return await apiPokemon.get('/' + id);
    },
    async getInfoSpeciesPokemon(id) {
        return await apiPokemonSpecies.get(id);
    }

}