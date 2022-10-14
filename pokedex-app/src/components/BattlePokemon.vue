<script setup>
import getPokemons from '@/services/getPokemons';
</script>

<template>

  <div v-if="pokemons.length !== 0" class="list-card-pokemon selected-cards">
    <!-- LIST CARD -->
    <article class="card ocult-card" v-for="(pokemon) in pokemons" v-bind:key="pokemon.id" v-on:click.once="e => !finish_battle && ( selectCard(pokemon), showCard(e) )" :disabled="finish_battle">
      <div class="content-card">
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
      </div>
    <!-- /LIST CARD -->
    </article>
    
  </div>
  
  <div v-if="result_battle != ''" id="battle-detail" class="content-detail-battle text-center">
   <!-- BOX RESULT -->
   <div class="detail-battle">
      <h1>{{ result_battle }}</h1>
    </div>

    <button class="btn btn-retrostyle btn-repeat-battle mt30" onclick="location.reload();">Tornar a fer un combat <img class="iconbtn" src="@/assets/img/iconbtn.jpg"></button>  
    <!-- /BOX RESULT -->
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
  data() {
    return {
      pokemons: [],
      first_pokemon: [],
      second_pokemon: [],
      finish_battle: false,
      result_battle: "",
      error_message: ""
    }
  },
  methods: {
    selectPokemon() {
      // Método para seleccionar pokemons
      let starter_pokemon = [];

      if (starter_pokemon.length === 0 || starter_pokemon === null) {
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
      }

      return starter_pokemon;
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
    getPokemonTypeIcon(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['src'];
    },
    getPokemonTypeTitle(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['title'];
    },
    selectCard(card) {
      let card_pokemon = JSON.parse(JSON.stringify(card));
      //console.log(card_pokemon);
      
      if ( this.first_pokemon.length == 0 ) {
        this.first_pokemon.push(card_pokemon);
      } else if ( this.second_pokemon.length == 0 ) {
        this.second_pokemon.push(card_pokemon);
        this.startBattle();
      }
    },
    showCard(event) {
      //console.log(event.currentTarget);
      let card_selected = event.currentTarget;
      card_selected.classList.remove('ocult-card');
    },
    setPokemonDescription(flavor_texts) {
      let text_description = "";
      text_description = pokemonDescription(flavor_texts);
      
      //console.log(text_description);
      return text_description;
    },
    setErrorMessage() {
      //console.log("Show missatge error");
      this.error_message = "No s'han trobat resultats";
    },
    startBattle() {
      let first_pkm = JSON.parse(JSON.stringify(this.first_pokemon));
      first_pkm = first_pkm[0];
      let second_pkm = JSON.parse(JSON.stringify(this.second_pokemon));
      second_pkm = second_pkm[0];

      const name_first_pokemon = first_pkm.name.charAt(0).toUpperCase() + first_pkm.name.slice(1);
      const name_second_pokemon = second_pkm.name.charAt(0).toUpperCase() + second_pkm.name.slice(1);

      // Si el primer pokemon té més atac i el segon té menys defensa
      if ( first_pkm.stats[1].base_stat > second_pkm.stats[2].base_stat ) {
        this.result_battle = name_first_pokemon +" ataca i guanya a "+ name_second_pokemon;
      } else if ( first_pkm.stats[1].base_stat <= second_pkm.stats[2].base_stat ) {
        this.result_battle = name_first_pokemon +" ataca i perd contra "+ name_second_pokemon;
      } else {
        this.result_battle = "No hi ha guanyadors";
      }

      this.finish_battle = true;
    }
  },
  mounted() {
    let pokemons_selected = this.selectPokemon();
    this.getPokemonList(pokemons_selected);
  }
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
