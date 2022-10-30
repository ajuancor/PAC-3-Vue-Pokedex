<script setup>
import getPokemons from '@/services/getPokemons';
import CardPokemon from '../components/CardPokemon.vue';
</script>

<template>
  <main class="main-llista" :class="{'error-detail' : error}">

    <div class="content-searcher">
      <div class="restart-starters">
          <button @click="restartPokemon()" id="btn-restart-starters" class="btn btn-retrostyle btn-restart-starter">Reiniciar inicials <img class="iconbtn" src="@/assets/img/iconbtn.png" /></button>
      </div>

      <div class="searcher">
          <input @input="searchPokemon($event)" type="text" value="" name="pokemonID" id="search-pokemon" placeholder="Introdueix un Pokémon..." class="input_search" />
          <!-- <button id="btn-search-pokemon" class="fa fa-search btn button_search no_link btn-retrostyle">Buscar <img class="iconbtn" src="/assets/css/img/iconbtn.jpg"></button> -->
      </div>
    </div>

    <CardPokemon
      :pokemons="pokemons"
      :error_message="error_message" />
  </main>
</template>


<script>
  export default {
  name: "main-llista",
  components: { CardPokemon },
  data() {
    return {
      pokemons: [],
      first_pokemons: [],
      error: false,
      error_message: ""
    }
  },
  methods: {
    selectPokemon() {
      // Método para seleccionar pokemons
      let starter_pokemon = getFirstPokemon();

      if (starter_pokemon === '' || starter_pokemon === null) {
        starter_pokemon = [];

        let id = 0;
        while (starter_pokemon.length < 10) {
          // Obté un id aleatori
          id = getRandomId(905);

          // Si id no esta al array l'afegeix
          if ( !starter_pokemon.includes(id) && id != 0 && id !== null ) {
              starter_pokemon.push(id);
          }
        }
      
        saveFirstPokemon(starter_pokemon);
      }

      return starter_pokemon;
    },
    restartPokemon() {
      // Elimina els primers pokemons sel·leccionats
      deleteFirstPokemon();
      this.pokemons = [];

      // Sel·lecciona nous pokemons
      const first_pkm_restart = this.selectPokemon();
      
      // Obté els nous pokemons
      this.getPokemonList(first_pkm_restart);
      this.first_pokemons = this.pokemons;
    },
    getPokemonList(pokemons_selected) {
      // Método para obtener pokemons
      pokemons_selected.forEach(id_pokemon => {
        this.getPokemonIndividual(id_pokemon);
      });
    },
    getPokemonIndividual(id_pokemon) {
      getPokemons.getPokemon(id_pokemon)
      .then( res => {
        //console.log(res.data);
        res.data['front_img'] = true;
        this.pokemons.push(res.data);
      });
    },
    setPokemonDescription(flavor_texts) {
      let text_description = "";
      text_description = pokemonDescription(flavor_texts);
      
      //console.log(text_description);
      return text_description;
    },
    // Buscador de pokemons
    searchPokemon(e) {
      var key = event.target.value;
      //console.log(key);
      
      var result = [];
      if (key != "") {
        for (let pkm of this.first_pokemons) {
          if (pkm.name.indexOf(key) === 0) {
            result.push(pkm);
          }
        }

        this.pokemons = result;

        if (result.length == 0) {
          this.setErrorMessage();
        } else {
          if ( this.error ) {
            this.error = false;
          }
        }

      } else {
        if ( this.error ) {
          this.error = false;
        }
        
        this.pokemons = this.first_pokemons;
      }
    },
    setErrorMessage() {
      this.error = true;
      this.error_message = "No s'han trobat resultats";
    }
  },
  mounted() {
    let pokemons_selected = this.selectPokemon();
    this.getPokemonList(pokemons_selected);

    this.first_pokemons = this.pokemons;
  }
}
</script>