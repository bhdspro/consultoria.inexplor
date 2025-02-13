const { chromium } = require('playwright');  // Usando Playwright para navegar e buscar o ucode
const axios = require('axios');  // Caso precise de axios para outras requisições

// URL que você quer acessar
const targetUrl = 'https://pay.hotmart.com/E55437390T'; // Coloque o link da página que você quer acessar

// Função para extrair o UCODE usando uma expressão regular
function extractUcode(text) {
  const regex = /"NAME","([0-9a-f-]+)"/;
  const match = regex.exec(text);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

// Função principal para buscar o conteúdo da página e extrair o UCODE
async function fetchAndExtractUcode(url) {
  try {
    // Usando Playwright para acessar o conteúdo da página
    const browser = await chromium.launch({ headless: true });  // Inicia o navegador headless
    const page = await browser.newPage();
    await page.goto(url);

    // Pega o código-fonte da página
    const pageSource = await page.content();

    // Extrai o UCODE da página
    const ucode = extractUcode(pageSource);
    console.log('Ucode encontrado:', ucode ? ucode : 'Ucode não encontrado.');

    await browser.close();
  } catch (error) {
    console.error('Erro ao buscar a página:', error);
  }
}

// Executa a função
fetchAndExtractUcode(targetUrl);
