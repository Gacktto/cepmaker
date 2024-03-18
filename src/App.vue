<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
  <div class="main">
    <RouterView/>
  </div>
  <nav>
    <RouterLink class="nav-button" to="/generateCep">Gerador de CEPs</RouterLink>
    <RouterLink class="nav-button" to="">Meus Arquivos</RouterLink>
  </nav>
</template>

<style scoped>
nav{
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-button{
  padding: 2vh;
  background-color: rgb(80, 80, 80);
  border-radius: 1vh;
  border: 2px solid transparent;
}

.nav-button:first-child{
  margin-right: 2vh;
}

.nav-button:hover{
  border: 2px solid white;
}

.nav-button:hover{
}

.main{
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  max-height: 90vh;
  width: 100vw;
  /* overflow: hidden; */
}

@media screen and (max-width: 700px){
  nav, .wrap-select{
    display: none;
  }

  .main{
    min-height: 100vh;
    max-height: 100vh;
  }
}
</style>

