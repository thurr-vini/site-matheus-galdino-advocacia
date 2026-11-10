# Matheus Galdino Advogado — publicação

Projeto frontend em HTML, CSS e JavaScript, compilado com Vite.

## Requisitos
- Node.js (versão LTS recomendada)
- npm

## Executar localmente
1. Abra um terminal nesta pasta.
2. Execute `npm install`.
3. Execute `npm run dev`.
4. Abra o endereço local informado pelo Vite.

## Gerar a versão de produção
```bash
npm install
npm run build
```

Os arquivos finais serão gerados na pasta `dist/`.

## Publicar na Vercel via GitHub
- Envie o conteúdo desta pasta para a raiz de um repositório GitHub.
- Na Vercel, importe esse repositório.
- Framework Preset: Vite (ou detecção automática).
- Build Command: `npm run build`.
- Output Directory: `dist`.
- Install Command: `npm install` (ou o padrão automático).

## Antes de apresentar ao cliente
Edite `src/js/config.js` e substitua os campos provisórios:
- `address`, `phone`, `email` e `whatsapp`;
- os itens de `practiceAreas`, com as áreas realmente exercidas;
- confirme que `mapsEmbedUrl` aponta para o endereço correto.

**Atenção:** o formulário atual apenas valida os campos e exibe uma mensagem na página. Ele não envia nem armazena os dados. Integre um serviço de formulários/backend antes de disponibilizar o formulário ao público.

Depois de definir o domínio oficial, configure a URL canônica no `index.html` e os metadados sociais com o endereço definitivo.

A pasta `node_modules` não deve ser enviada ao GitHub. O arquivo `.gitignore` já a exclui.

## Contato via WhatsApp
O formulário solicita apenas nome e mensagem e abre o WhatsApp para o visitante confirmar o envio. Não existe envio por e-mail ou armazenamento de mensagens no site. Número configurado: 5583986101196.
