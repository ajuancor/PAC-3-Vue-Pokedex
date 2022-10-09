<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="text-center">
    <div>
      <h1 class="green">{{ msg }}</h1>

      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <RouterLink to="/llista">Llista</RouterLink>
        <RouterLink to="/combat">Combat</RouterLink>
      </nav>
    </div>
    
    <div class="controls align-self-center">
        <div class="content-control">
            <label for="dark_theme">Dark</label>
            <input type="radio" name="theme" id="dark_theme" value="dark" />
        </div>

        <div class="content-control">
            <label for="light_theme">Light</label>
            <input type="radio" name="theme" id="light_theme" value="light" />
        </div>
      </div>
  </div>
</template>

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
