<script setup>
import getPokemons from '@/services/getPokemons';
import { ref, onMounted } from '@vue/runtime-core';

defineProps({
  pokemons: {
    type: Array,
    required: true
  },
  error_message: {
    type: String,
    required: false
  }
});
</script>

<template>

  <div v-if="pokemons.length !== 0" class="list-card-pokemon">
    <!-- LIST CARD -->
    <article class="card" v-for="(pokemon) in pokemons" :key="pokemon.id">
      <h2 class="title card-title text-center">{{ pokemon.name }}</h2>
      <!-- Img -->
      <div class="content-img-card">
          <!-- Front img -->
          <div v-if="pokemon.front_img" class="front pointer" @click="pokemon.front_img = false">
              <img v-if="pokemon.sprites.front_default !== undefined && pokemon.sprites.front_default !== null && pokemon.sprites.front_default !== ''"
              :src="pokemon.sprites.front_default" class="img-card-pokemon" />
              <img v-else
              src="../assets/img/default-pokemon.png" class="img-card-pokemon" />
          </div>

          <!-- Back img -->
          <div v-else class="back pointer" @click="pokemon.front_img = true">
              <img v-if="pokemon.sprites.back_default !== undefined && pokemon.sprites.back_default !== null && pokemon.sprites.back_default !== ''"
              :src="pokemon.sprites.back_default" class="img-card-pokemon" />
              <img v-else
              src="../assets/img/default-pokemon.png" class="img-card-pokemon" />
          </div>
      </div>
      
      <!-- Content text -->
      <div class="content-text-card mt10">
          <ul>
              <li>
                <span class="align-self-center">Tipus</span>
                <span class="content-types-pokemon">
                  <img class="img-type-pokemon" :src=getPokemonTypeIcon(pokemon.types[0].type.name) :alt=getPokemonTypeTitle(pokemon.types[0].type.name) :title=getPokemonTypeTitle(pokemon.types[0].type.name) />
                  <img v-if="pokemon.types.hasOwnProperty(1)" class="img-type-pokemon" :src=getPokemonTypeIcon(pokemon.types[1].type.name) :alt=getPokemonTypeTitle(pokemon.types[1].type.name) :title=getPokemonTypeTitle(pokemon.types[1].type.name) />
                </span>
              </li>
              <li><span>Atac</span> <span class="stat-attack">{{ pokemon.stats[1].base_stat }}</span></li>
              <li><span>Defensa</span> <span class="stat-defense">{{ pokemon.stats[2].base_stat }}</span></li>
          </ul>
      </div>
      
      <!-- v-on:button="detailCard" More info onclick="changeURL(document.querySelector('.card').dataset.pokeid); return false;"-->
      <div class="content-more-info text-center">
          <button class="btn btn-retrostyle btn-more-info">
            <router-link :to="{ name: 'card_detail', params: { id: pokemon.id }}">Més informació <img class="iconbtn" src="@/assets/img/iconbtn.jpg"></router-link>
          </button>
      </div>
    </article>
    <!-- /LIST CARD -->
  </div>
  
  <div v-else class="error-list">
      <!-- EMPTY LIST -->
      <p class="error-message">{{ error_message }}</p>
      <!-- /EMPTY LIST -->
  </div>

</template>

<script>
  export default {
  name: "cards-pokemon",
  el: ".card",
  props: ['pokemons','error_message'],
  methods: {
    getPokemonTypeIcon(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['src'];
    },
    getPokemonTypeTitle(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['title'];
    },
  }
  /* emits: ['report-error'],
  data() {
    return {
      pokemons: [],
      first_pokemons: [],
      front_img: true,
      back_img: false,
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
        this.pokemons.push(res.data);
      });
    },
    changeImgCard(e, path) {
      this.front_img = !this.front_img;
      this.back_img = !this.back_img;

      console.log(e);
      console.log(path);

      e.target.src = path;

      console.log("front: "+this.front_img);
      console.log("back: "+this.back_img);
    },
    getPokemonTypeIcon(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['src'];
    },
    getPokemonTypeTitle(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['title'];
    },
    setPokemonDescription(flavor_texts) {
      let text_description = "";
      text_description = pokemonDescription(flavor_texts);
      
      //console.log(text_description);
      return text_description;
    },
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
        }

      } else {
        this.pokemons = this.first_pokemons;
      }
    },
    setErrorMessage() {
      //console.log("Show missatge error");
      this.error_message = "No s'han trobat resultats";
    }
  },
  mounted() {
    if ( this.list ) {
      let pokemons_selected = this.selectPokemon();
      this.getPokemonList(pokemons_selected);
      this.first_pokemons = this.pokemons;
    } else {
      this.getPokemonDetail(this.pokemon_id);
      //this.getPokemonIndividual(this.pokemon_id);
    }
  }
  */
}

</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
