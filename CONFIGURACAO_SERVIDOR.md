# Configuração do Servidor para Eco Games

Este guia explica como configurar o servidor para que o ranking do Eco Games funcione corretamente quando estiver hospedado na internet.

## Estrutura Básica

O Eco Games consiste em duas partes principais:

1. **Frontend**: Arquivos estáticos HTML, CSS e JavaScript
2. **Backend (API)**: Servidor JSON Server que gerencia o ranking

## Opções de Implantação

Existem várias formas de implantar o jogo para que funcione corretamente na internet:

### Opção 1: Servidor Express com JSON Server (Recomendado)

1. Suba o servidor completo usando o Node.js:

```bash
# Instalar dependências
npm install

# Executar o servidor
node server.js
```

2. O servidor será iniciado na porta 3001 por padrão e irá:
   - Servir os arquivos estáticos (index.html, main.js, etc.)
   - Fornecer a API de ranking em `/api/ranking`

### Opção 2: Servidor Web Separado + JSON Server

Se você estiver hospedando os arquivos estáticos em um servidor web tradicional (Apache, Nginx) e quiser executar o JSON Server separadamente:

1. Configure seu servidor web para servir os arquivos estáticos

2. Configure um proxy reverso para encaminhar as solicitações para `/api` para o JSON Server:

**Exemplo de configuração Nginx:**

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # Servir arquivos estáticos
    location / {
        root /caminho/para/os/arquivos/estaticos;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy para a API JSON Server
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Execute o JSON Server:

```bash
npx json-server --watch db.json --routes routes.json --port 3001
```

### Opção 3: Hospedagem Estática + URL Configurada

Se você estiver usando uma hospedagem estática (GitHub Pages, Netlify, Vercel, etc.):

1. Hospede o frontend em sua plataforma preferida
2. Configure a API em um servidor separado (pode usar serviços como Heroku, Railway, Render, etc.)
3. Edite o arquivo `index.html` para definir a URL da API explicitamente:

```html
<!-- Configuração da API -->
<script>
  // Defina a URL completa para o seu servidor JSON
  window.API_URL = "https://seu-servidor-api.com";
</script>
```

## Verificação da Configuração

Para verificar se sua configuração está funcionando corretamente:

1. Acesse o jogo através do seu domínio
2. Verifique no console do navegador se não há erros de conexão
3. Tente adicionar pontos ao jogo e verifique se aparecem no ranking
4. Confirme que o arquivo `db.json` está sendo atualizado com os novos dados

## Resolução de Problemas

- **Erro "API não encontrada"**: Verifique se a URL da API está configurada corretamente e se o servidor está em execução
- **CORS erros**: Verifique as configurações de CORS no servidor
- **Dados não persistem**: Verifique as permissões do arquivo `db.json` e se o servidor tem acesso de escrita
