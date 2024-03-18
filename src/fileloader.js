importScripts('https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js');

const loadFile = async (url) => {
    
    const response = await fetch(url);
    const text = await response.text();
    return text;
  };
  
  // Função principal do worker
  onmessage = async function(e) {
    const [state, citie, cep] = e.data;
    try {
      const [stateResponse, cityResponse, cepResponse] = await Promise.all([
        loadFile(state),
        loadFile(citie),
        loadFile(cep)
      ]);
  
      const stateData = Papa.parse(stateResponse, { header: true }).data;
      const cityData = Papa.parse(cityResponse, { header: true }).data;
      const cepData = Papa.parse(cepResponse, { header: true }).data;
  
      postMessage([stateData, cityData, cepData]);
    } catch (error) {
      console.error('Erro ao carregar os arquivos:', error);
    }
  };