# Configuração do Ranking para GitHub Pages

Este guia ensina como configurar o ranking do Eco Games para funcionar no GitHub Pages usando o serviço gratuito JSONbin.io.

## Por que JSONbin.io?

O GitHub Pages é um serviço de hospedagem estática, o que significa que não pode executar código de servidor (backend). Para armazenar o ranking, precisamos de uma API externa que funcione como nosso backend. O JSONbin.io é uma opção gratuita e fácil de usar.

## Passo a Passo para Configuração

### 1. Criar uma conta no JSONbin.io

1. Acesse [https://jsonbin.io/](https://jsonbin.io/)
2. Clique em "Sign Up" e crie uma conta gratuita

### 2. Obter sua Master Key

1. Após fazer login, clique no seu nome de usuário no canto superior direito
2. Vá para "API Keys"
3. Copie sua "Master Key" (será necessária para autorizar as operações de leitura/escrita)

### 3. Criar um Novo Bin

1. Clique em "Create Bin" no painel principal
2. Cole o seguinte JSON como estrutura inicial:

```json
{
  "ranking": [
    {
      "id": "1",
      "name": "Ana Silva",
      "class": "5º Ano A",
      "points": 150,
      "avatar": "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      "createdAt": "2025-06-09T19:30:00.000Z",
      "lastUpdate": "2025-06-09T19:30:00.000Z"
    },
    {
      "id": "2",
      "name": "Pedro Santos",
      "class": "4º Ano B",
      "points": 135,
      "avatar": "https://cdn-icons-png.flaticon.com/512/427/427735.png",
      "createdAt": "2025-06-09T19:25:00.000Z",
      "lastUpdate": "2025-06-09T19:25:00.000Z"
    }
  ]
}
```

3. Dê um nome como "EcoGamesRanking" e clique em "Create"
4. Após criar, copie o "Bin ID" que aparecerá

### 4. Configurar o Jogo

1. Abra o arquivo `index.html` no seu projeto
2. Encontre a seção de configuração do JSONbin.io:

```html
<!-- Configuração da API JSONbin.io -->
<script>
  window.JSONBIN_CONFIG = {
    binId: "SEU_BIN_ID_AQUI", // Substitua pelo seu Bin ID
    apiKey: "SUA_MASTER_KEY_AQUI", // Substitua pela sua Master Key
  };
</script>
```

3. Substitua `SEU_BIN_ID_AQUI` pelo Bin ID copiado anteriormente
4. Substitua `SUA_MASTER_KEY_AQUI` pela Master Key copiada anteriormente

### 5. Testar o Funcionamento

1. Abra o jogo localmente ou implante-o no GitHub Pages
2. Certifique-se de que o ranking está funcionando:
   - Ganhe alguns pontos jogando
   - Verifique se os pontos aparecem no ranking
   - Tente acessar com outro navegador para verificar se o ranking é compartilhado

## Solução de Problemas

### O ranking não aparece ou não salva

- Verifique se o Bin ID e a Master Key estão corretos
- Abra o Console do navegador (F12) para verificar se há erros
- Certifique-se de que o CORS está permitido no JSONbin.io (está ativado por padrão)

### Erro de CORS

Se encontrar erros de CORS, verifique se:

1. Está usando HTTPS no GitHub Pages
2. A configuração no JSONbin.io permite acesso de todos os domínios

## Limitações do Plano Gratuito

O plano gratuito do JSONbin.io tem algumas limitações:

- 1000 requisições por dia
- 10MB de armazenamento total
- 100KB por bin

Estas limitações são mais que suficientes para um jogo educativo, mas se o uso crescer muito, considere migrar para a versão paga ou para outro serviço.

## Segurança

**IMPORTANTE**: A Master Key dá acesso completo ao seu bin. Em uma aplicação de produção real, você deveria usar uma API Key com permissões limitadas e implementar autenticação adequada. Para um jogo educativo simples, esta abordagem é aceitável, mas não é recomendada para aplicações sensíveis.
