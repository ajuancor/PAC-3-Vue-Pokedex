<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import MenuPokemon from './components/MenuPokemon.vue';

let theme = ref('light');

const changeTheme = (e) => {
  //console.log(e.target.value);
  
  // Canvi de tema
  theme.value = e.target.value;
  document.body.className = e.target.value;

  //console.log(theme);
};
</script>

<template>
  <main class="themed" :class="theme">
    <header class="header justify-content-center">
      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

      <div class="header-content">
        <MenuPokemon msg="Pokédex" :theme="theme" @change-theme="changeTheme" />
      </div>
    </header>

    <RouterView />

    <footer class="main-footer">
        <section class="container">
            <div class="text-center">
                <span class="copyright">Copyright 2022 - Albert Juan i David Mañas</span>
            </div>
        </section>
    </footer>
  </main>
</template>

<style scoped>
.themed.light {
    background: url('@/assets/img/background_prueba_4.jpg');
    background-attachment: fixed;

}

.themed.dark {
    background: url('@/assets/img/background_prueba_2.png');
    background-attachment: fixed;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
