<script setup>
  import { RouterView, RouterLink } from 'vue-router';
  import SideMenu from '@/components/sidemenu.vue';
  import { ref } from 'vue';

  const menuState = ref(true);

    const onOffSideMenu = () => {
        menuState.value = !menuState.value
        console.log('click');
    };
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
  <SideMenu v-if="menuState == true"/>
  <div class="toggle-menu" @click="onOffSideMenu">=</div>
</template>

<style scoped>
.toggle-menu{
  position: absolute;
  top: 10px;
  left: 10px;
}

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

@media screen and (min-width: 700px){
  .sidemenu {
    display: none;
  }
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

