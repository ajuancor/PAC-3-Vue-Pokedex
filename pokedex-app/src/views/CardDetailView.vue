<script setup>
import CardPokemon from '../components/CardPokemon.vue';
</script>

<template>
  <main class="main-detail" v-bind:class="{'error-detail' : error_detail}">
    <CardPokemon v-bind:list="false" v-bind:pokemon_id="this.$route.params.id" @report-error="showError" />
  </main>
</template>

<script>
export default {
  name: 'detail-main',
  el: '.main-detail',
  components: { CardPokemon },
  data() {
    return {
      error_detail : false
    }
  },
  methods: {
    showError() {
      this.error_detail = true;
    }
  },
  //mounted() {}
}
</script>