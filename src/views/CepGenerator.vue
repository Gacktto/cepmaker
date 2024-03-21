<script setup>
  import { ref, watchEffect } from 'vue';
  // import Papa from 'papaparse';
  import state from '@/assets/csv/states.csv';
  import citie from '@/assets/csv/cities.csv';
  import cep from '@/assets/csv/sp_ceps.csv';

  const stateCsv = ref([]);
  const citieCsv = ref([]);
  const cepCsv = ref([]);
  const filteredCities = ref([]);
  const filteredCeps = ref([]);
  const selectedState = ref('');
  const selectedCity = ref('');

  let CHUNK_SIZE = 20;

  const loadLocalFiles = async () => {
    const worker = new Worker(new URL('@/fileLoader.js', import.meta.url));

    worker.onmessage = function(event) {
      const [stateData, cityData, cepData] = event.data;
      stateCsv.value = stateData;
      citieCsv.value = cityData;
      cepCsv.value = cepData;
    };

    worker.postMessage([state, citie, cep]);
  };

  const handleSelectChange = (event) => {
    const selectedStateID = event.target.value;

    // Filtrar as cidades com base no estado selecionado
    filteredCities.value = citieCsv.value.filter(cidade => cidade.IDstates === selectedStateID);
    
    const selectedStateData = stateCsv.value.find(state => state.IDstates === selectedStateID);
    selectedState.value = selectedStateData ? selectedStateData.uf : '';
  };

  const handleSelectChange2 = (event) => {
    const selectedCityID = event.target.value;

    filteredCeps.value = cepCsv.value.filter(cep => cep.IDcities === selectedCityID).slice(0, CHUNK_SIZE);
    selectedCity.value = citieCsv.value.find(city => city.IDcities === selectedCityID)?.cidade || '';
  };

  watchEffect(() => {
    selectedState.value = '';
    selectedCity.value = '';
  });


  loadLocalFiles();

  const formatarCEP = (cep) => {
    if (typeof cep === 'string' && cep.length === 8) {
      return cep.slice(0, 5) + '-' + cep.slice(5);
    } else {
      return cep;
    }
  };

  const abrirNoGoogleMaps = (cep) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${cep}`, '_blank');
  };

  const copiarParaAreaDeTransferencia = (elemento) => {
    const textoACopiar = elemento.querySelector('.logradouro').innerText;

    // Cria um elemento textarea temporário
    const textareaTemporario = document.createElement('textarea');
    textareaTemporario.value = textoACopiar;

    // Adiciona o elemento à página
    document.body.appendChild(textareaTemporario);

    // Seleciona o texto no elemento textarea
    textareaTemporario.select();

    // Copia o texto para a área de transferência
    document.execCommand('copy');

    // Remove o elemento de textarea temporário
    document.body.removeChild(textareaTemporario);
  };
</script>

<template>
  <div class="wrap-select">
    <div class="wrap-title">
      Definir região
    </div>
    <div class="wrap-select-option">
      <select name="estado" @change="handleSelectChange">
        <option value="default">Selecione</option>
        <option v-for="(estado, index) in stateCsv" :key="index" :value="estado.IDstates">{{ estado.estado }}</option>
      </select>
      <select name="cidade" @change="handleSelectChange2">
        <option value="default">Selecione</option>
        <option v-for="(cidade, index) in filteredCities" :key="index" :value="cidade.IDcities">{{ cidade.cidade }}</option>
      </select>
    </div>
  </div>
  <div class="cards">
    <div class="card" v-for="(cep, index) in filteredCeps" :key="index">
      <div class="city-info">
        {{ selectedCity }}, {{ selectedState }}
      </div>
      <div class="cep">{{ formatarCEP(cep.cep) }}</div>
      <div class="logradouro" v-if="cep.logradouro1 || cep.logradouro2">
        {{ cep.logradouro1 }} {{ cep.logradouro2 }} - {{ cep.bairro }}
      </div>
      <div class="logradouro" style="opacity: 0.5;" v-else>
        Endereço não encontrado
      </div>
      <div class="card-buttons">
        <span id="gotToMapsButton" class="material-symbols-rounded" @click="abrirNoGoogleMaps(cep.cep)">location_on</span>
        <span id="copyClipboardButton"  class="material-symbols-rounded" @click="copiarParaAreaDeTransferencia($event.target.parentElement.parentElement)">content_copy</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap-select{
  height: 20vh;
  width: 100vw;
  padding: 1vw;
  box-sizing: border-box;
}

.wrap-title{
}

.wrap-select-option{
}

select{
}

.cards{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  gap: 1vw;
  box-sizing: border-box;
}

.card{
  min-width: 300px;
  max-width: 300px;
  min-height: 150px;
  max-height: 150px;
  border-radius: 1vh;
  background-color: rgb(80, 80, 80);
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
}

.city-info{
  height: 30px;
  font-weight: 600;
  color: orange;
}

.cep{
  font-weight: 600;
  height: 25px;
  width: 100px;
  text-indent: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: rgb(90, 90, 90);
  border-radius: 1vh;
}

.logradouro{
  height: 45px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px 5px 0;
  box-sizing: border-box;
}

.card-buttons{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
}

#gotToMapsButton, #copyClipboardButton{
  cursor: pointer;
  opacity: 0.7;
}

#gotToMapsButton:hover, #copyClipboardButton:hover{
  opacity: 1;
}

@media screen and (max-width: 700px){
  nav{
    display: none;
  }

  .main{
    min-height: 100vh;
    max-height: 100vh;
  }

  .wrap-select{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 50vh;
    gap: 2vh;
  }
  
  .wrap-select-option{
    display: flex;
    flex-direction: column;
    width: 50vw;
    gap: 2vh;
  }

  .wrap-select-option select{
    width: 50vw;
    height: 5vh;
  }
}
</style>