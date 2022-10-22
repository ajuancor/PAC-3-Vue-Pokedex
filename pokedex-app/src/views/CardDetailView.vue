<script setup>
import getPokemons from '@/services/getPokemons';
import CardPokemonDetail from '../components/CardPokemonDetail.vue';
</script>

<template>
  <main class="main-detail" :class="{'error-detail' : error_detail}">
    <CardPokemonDetail
      :pokemon_detail="pokemon_detail"
      :error_message="error_message" />
  </main>
</template>

<script>
export default {
  name: 'detail-main',
  el: '.main-detail',
  emits: ['report-error'],
  components: { CardPokemonDetail },
  data() {
    return {
      pokemon_detail: [],
      error_detail: false,
      error_message: ""
    }
  },
  methods: {
    // Obté més dades d'un Pokémon
    async getPokemonDetail(id) {
      let error_promise = false;
      await Promise.all( [ getPokemons.getPokemon(id), getPokemons.getInfoSpeciesPokemon(id) ] )
      .then((values) => {
        //console.log(values);
        this.pokemon_detail.push(values[0].data);

        //this.pokemons[0].species = values[1].data;

        this.pokemon_detail[0].text_description = this.setPokemonDescription(values[1].data.flavor_text_entries);
      })
      .catch(function(err) {
        //console.log(err.message); // some coding error in handling happened
        error_promise = true;
      });

      if (error_promise) {
        this.error_detail = true;
        
        this.setErrorMessage();
        // Envia un emit al pare per indica que hi hagut un error
        //this.$emit('report-error');
      }
    },
    /*
    getPokemonTypeIcon(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['src'];
    },
    getPokemonTypeTitle(name_type) {
      let img_type = selectPokemonType(name_type);
      return img_type['title'];
    },
    */
    setPokemonDescription(flavor_texts) {
      let text_description = "";
      text_description = pokemonDescription(flavor_texts);
      
      //console.log(text_description);
      return text_description;
    },
    setErrorMessage() {
      this.error_message = "No s'han trobat resultats";
    },
    /*
    showError() {
      this.error_detail = true;
    }
    */
  },
  mounted() {
    const id_param = this.$route.params.id;
    if ( id_param !== '' ) {
      this.getPokemonDetail(id_param);
      //console.log(this.pokemon);

      /*
      if ( result ) {
        this.start = true;
        console.log(this.pokemon_detail);
      }
      */

    }
  }
}
</script>