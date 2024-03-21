<script setup>
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';
</script>

<template>
    <div class="sidemenu">
        <div class="nav">
            <RouterLink class="nav-button" to="/generateCep">Gerador de CEPs</RouterLink>
            <RouterLink class="nav-button" to="">Meus Arquivos</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.close{
    background-color: red;
    position: absolute;
    top: 0;
    right: 0;
}

.sidemenu{
    position: absolute;
    background-color: rgb(80, 80, 80);
    height: 100vh;
    top: 0;
    left: 0;
    width: 50vw;
    border-radius: 0 1vh 1vh 0;
    box-shadow: 30px 0 100px rgba(0, 0, 0, 1);
    display: flex;
    align-items: start;
    justify-content: start;
    box-sizing: border-box;
    padding: 5vw;
}

.sidemenu .nav{
    display: flex;
    justify-content: start;
    flex-direction: column;
}

.sidemenu .nav .nav-button{
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: start;
}

.sidemenu .nav .nav-button:hover{
    font-weight: 600;
}

@media screen and (max-width: 450px){
  .sidemenu {
    width: 80vw;
  }
}

</style>