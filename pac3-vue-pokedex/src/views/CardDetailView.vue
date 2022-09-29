<script setup>
import CardPokemon from '../components/CardPokemon.vue';
</script>

<template>
  <main>
    <CardPokemon v-bind:list="false" v-bind:pokemon_id="this.$route.params.id" />
  </main>
</template>
