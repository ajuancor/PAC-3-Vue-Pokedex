<script setup>
import getPokemons from '@/services/getPokemons';

defineProps({
  list: {
    type: Boolean,
    required: true
  },
  pokemon_id: {
    type: String,
    required: false
  }
})
</script>

<template>

  <div v-if="list" class="content-searcher">
    <div class="restart-starters">
        <button v-on:click="restartPokemon()" id="btn-restart-starters" class="btn btn-retrostyle btn-restart-starter">Reiniciar inicials <img class="iconbtn" src="@/assets/img/iconbtn.jpg"></button>
    </div>

    <div class="searcher">
        <input @input="searchPokemon($event)" type="text" value="" name="pokemonID" id="search-pokemon" placeholder="Introdueix un Pokémon..." class="input_search" />
        <!-- <button id="btn-search-pokemon" class="fa fa-search btn button_search no_link btn-retrostyle">Buscar <img class="iconbtn" src="/assets/css/img/iconbtn.jpg"></button> -->
    </div>
  </div>

  <div v-if="list && pokemons.length !== 0" class="list-card-pokemon">
    <!-- LIST CARD -->
    <article class="card" v-for="(pokemon) in pokemons" v-bind:key="pokemon.id">
      <h2 class="title card-title text-center">{{ pokemon.name }}</h2>
      <!-- Img -->
      <div class="content-img-card">
          <!-- Front img -->
          <div class="front pointer" onclick="changeCardImg(this); return false;">
              <img :src="pokemon.sprites.front_default" class="img-card-pokemon" />
          </div>
          
          <!-- Back img -->
          <div class="back pointer" onclick="changeCardImg(this); return false;" style="display: none;">
              <img :src="pokemon.sprites.back_default" class="img-card-pokemon" />
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

  <div v-else-if="!list && pokemons.length !== 0" class="detail-card-pokemon">
    <!-- DETAIL CARD -->
    <article class="card" v-for="(pokemon) in pokemons" v-bind:key="pokemon.id">
        <h2 class="title card-title text-center">{{ pokemon.name }}</h2>
        
        <div class="row">
            <div class="col-12 col-md-6">
                <!-- Content Imgs -->
                <div class="imgs-pokemon">
                
                    <!-- Img Default pokemon -->
                    <div class="default-pokemon">
                        <div class="content-img-card">
                            <!-- Front img -->
                            <div class="front">
                                <img :src="pokemon.sprites.front_default" class="img-card-pokemon" />
                            </div>
                        </div>
                        
                        <div class="content-img-card">
                            <!-- Back img -->
                            <div class="back">
                                <img :src="pokemon.sprites.back_default" class="img-card-pokemon" />
                            </div>
                        </div>
                    </div>
        
                    <!-- Img Shiny pokemon -->
                    <div class="shiny-pokemon">
                        <div class="content-img-card">
                            <!-- Front img -->
                            <div class="front">
                                <img :src="pokemon.sprites.front_shiny" class="img-card-pokemon" />
                            </div>
                        </div>
                        
                        <div class="content-img-card">
                            <!-- Back img -->
                            <div class="back">
                                <img :src="pokemon.sprites.back_shiny" class="img-card-pokemon" />
                            </div>
                        </div>    
                    </div>
        
                </div>
            </div>

            <div class="col-12 col-md-6">
                <!-- Content text -->
                <div class="content-text-card mt10">
                    <div class="description-pokemon"><p>{{ pokemon.text_description }}</p></div>

                    <ul class="types-pokemon">
                        <li><span class="align-self-center">Tipus</span></li>
                        <li>
                          <span class="content-types-pokemon">
                            <img class="img-type-pokemon" :src=getPokemonTypeIcon(pokemon.types[0].type.name) :alt=getPokemonTypeTitle(pokemon.types[0].type.name) :title=getPokemonTypeTitle(pokemon.types[0].type.name) />
                            <img v-if="pokemon.types.hasOwnProperty(1)" class="img-type-pokemon" :src=getPokemonTypeIcon(pokemon.types[1].type.name) :alt=getPokemonTypeTitle(pokemon.types[1].type.name) :title=getPokemonTypeTitle(pokemon.types[1].type.name) />
                          </span>
                        </li>
                    </ul>
                    
                    <ul>
                        <li class="stats-pokemon">
                            <ul>
                                <li><span>Punts de salut</span></li>
                                <li><span class="stat-hp">{{ pokemon.stats[0].base_stat }}</span></li>
                            </ul>
                            <ul>
                                <li><span>Atac</span></li>
                                <li><span class="stat-attack">{{ pokemon.stats[1].base_stat }}</span></li>
                            </ul>
                            <ul>
                                <li><span>Defensa</span></li>
                                <li><span class="stat-defense">{{ pokemon.stats[2].base_stat }}</span></li>
                            </ul>
                        </li>
                        <li class="stats-pokemon">
                            <ul>
                                <li><span>Atac especial</span></li>
                                <li><span class="stat-attack-special">{{ pokemon.stats[3].base_stat }}</span></li>
                            </ul>
                            <ul>
                                <li><span>Defensa especial</span></li>
                                <li><span class="stat-defense-special">{{ pokemon.stats[4].base_stat }}</span></li>
                            </ul>
                            <ul>
                                <li><span>Velocitat</span></li>
                                <li><span class="stat-speed">{{ pokemon.stats[5].base_stat }}</span></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </article>
    <!-- /DETAIL CARD -->
  </div>
  
  <div v-else class="error-list">
      <!-- EMPTY LIST -->
      <p class="error-message">{{ error_message }}</p>
      <!-- /EMPTY LIST -->
  </div>

</template>

<script>
  export default {
  name: "app",
  el: ".card",
  props: ['list', 'pokemon_id'],
  emits: ['report-error'],
  data() {
    return {
      pokemons: [],
      first_pokemons: [],
      searcher: true,
      error: false,
      error_message: ""
    }
  },
  /*
  created() {
    getPokemons.getPokemons(0,10)
    .then( response =>  {
      let all_pokemons = response.data;
      console.log(response.data);

      for (let poke in all_pokemons.results) {
        getPokemons.getPokemon(poke)
        .then( res => {
          console.log(res.data);
          this.pokemons.push(res.data);
        })
      }
    })

    .catch ( error => {
      console.log(error);
    })
  }*/
  methods: {
    selectPokemon() {
      // Método para seleccionar pokemons
      let starter_pokemon = getFirstPokemon();
      //console.log(starter_pokemon);

      if (starter_pokemon == '' || starter_pokemon === null) {
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
        /* getPokemons.getPokemon(id_pokemon)
        .then( res => {
          //console.log(res.data);
          this.pokemons.push(res.data);
        });
        */
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
    // Obté més dades d'un Pokémon
    async getPokemonDetail(id) {
      let error_promise = false;
      let results = await Promise.all( [ getPokemons.getPokemon(id), getPokemons.getInfoSpeciesPokemon(id) ] )
      .then((values) => {
        //console.log(values);
        this.pokemons.push(values[0].data);
        //this.pokemons[0].species = values[1].data;

        this.pokemons[0].text_description = this.setPokemonDescription(values[1].data.flavor_text_entries);
      })
      .catch(function(err) {
        //console.log(err.message); // some coding error in handling happened
        error_promise = true;
      });

      if (error_promise) {
        this.error = true;
        
        // Envia un emit al pare per indica que hi hagut un error
        this.$emit('report-error');

        this.setErrorMessage(); 
        //addFooterBottom(true);
      } else {
        //addFooterBottom(false);
      }
    },
    getPokemonTypeIcon(name_type) {
      //let img_type = stringToHtml( selectPokemonType(type) );
      let img_type = selectPokemonType(name_type);
      return img_type['src'];
    },
    getPokemonTypeTitle(name_type) {
      //let img_type = stringToHtml( selectPokemonType(type) );
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
}
//}
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
