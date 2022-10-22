<script setup>
import getPokemons from '@/services/getPokemons';
defineProps({
  pokemon_detail: {
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
    <div v-if="pokemon_detail.length !== 0" class="detail-card-pokemon">
        <!-- DETAIL CARD -->
        <article class="card" v-for="(pokemon) in pokemon_detail" :key=pokemon.id>
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
    </div>

    <div v-else class="error-list">
      <!-- EMPTY LIST -->
      <p class="error-message">{{ error_message }}</p>
      <!-- /EMPTY LIST -->
    </div>

</template>

<script>
export default {
  name: 'pokemon-detail',
  el: '.card',
  props: ['pokemon_id','error_message'],
  /*
  data() {
    return {
      pokemon_detail: [],
      start: false,
      error: false
    }
  },*/
  methods: {
    getPokemonTypeIcon(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['src'];
    },
    getPokemonTypeTitle(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['title'];
    }
  },
  /*
  mounted() {
    if ( this.pokemon_id !== '' ) {
      const result = this.getPokemonDetail(this.pokemon_id);
      
      if ( result ) {
        this.start = true;
      console.log(this.pokemon_detail);
      }
    }
  }
  */
}
</script>


<style scoped>

</style>
