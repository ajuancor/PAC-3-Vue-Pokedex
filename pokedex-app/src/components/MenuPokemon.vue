<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  }
})
</script>

<template>
  
  <div class="container ">
    <div class="row">
      <div class="d-flex align-self-center justify-content-center">

        <h1 class="main-title">{{ msg }}</h1>

        <div class="controls align-self-center">
          <div class="content-control">
            <label for="dark_theme">Dark</label>
            <input type="radio" name="theme" id="dark_theme" value="dark" v-model="theme" @change="$emit('change-theme', $event,'dark')" />
          </div>

          <div class="content-control">
            <label for="light_theme">Light</label>
            <input type="radio" name="theme" id="light_theme" value="light" v-model="theme" @change="$emit('change-theme', $event,'light')" />
          </div>

        </div>
      </div>
    </div>
  </div>
  
  <div class="main-menu">
    <div class="container">
      <nav class="navbar-menu">
        <ul>
          <li >
            <!-- <RouterLink to="/">Home</RouterLink> -->
            <RouterLink class="button" to="/llista">Llista</RouterLink>
            
            
            <RouterLink class="button" to="/combat">Combat</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 4em;
  top: 0;
  
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
