<script setup>
//import getPokemons from '@/services/getPokemons';
import CardPokemon from '../components/CardPokemon.vue';
</script>

<template>
  <main>
    <CardPokemon v-bind:list="true" />
  </main>
</template>


<script>
  /*
  export default {
  name: "app",
  data() {
    return {
      pokemons: null
    }
  },
  created() {
    getPokemons.getPokemons(0,905)
    .then( response =>  {
      this.pokemons = response.data;
      console.log(response.data);
    })

    .catch ( error => {
      console.log(error);
    })
  }*/
    /*methods: {
      getPokemons() {
        // Método para obtener la lista de usuarios
      },
      postUsuario() {
        // Método para crear un usuario
      },
      putUsuario() {
        // Método para actualizar un usuario
      },
      deleteUsuario() {
        // Método para borrar un usuario
      },
    },
    mounted() {
      this.getPokemons();
    }
  },
}
*/
</script>