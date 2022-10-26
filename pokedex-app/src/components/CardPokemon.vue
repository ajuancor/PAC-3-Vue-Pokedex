<script setup>
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
            <router-link class="btn-retro-detail" :to="{ name: 'card_detail', params: { id: pokemon.id }}">Més informació <img class="iconbtn" src="@/assets/img/iconbtn.png"></router-link>
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
