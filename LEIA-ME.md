# Site – Lava Jato Sport Car

Site estático (HTML + CSS + JS puro), sem dependências. Basta enviar a pasta para qualquer hospedagem.

## Estrutura

```
index.html              Página única com todas as seções + SEO + Schema (AutoWash/LocalBusiness e FAQPage)
assets/css/style.css    Estilos (mobile-first, responsivo)
assets/js/main.js       Cards de serviço, links do WhatsApp, menu mobile, antes/depois,
                        "aberto agora", formulário de agendamento via WhatsApp, animações
assets/img/             Imagens (coloque aqui as fotos reais – veja abaixo)
robots.txt, sitemap.xml SEO
site.webmanifest        Ícone/tema ao salvar na tela inicial do celular
.htaccess               HTTPS, compressão e cache (hospedagem Apache)
```

## Antes de publicar (checklist)

1. **Domínio**: o site usa `https://brenotocchio.github.io/lava-jato-sport-car/`. Se comprar um domínio próprio, troque pelo domínio real em
   `index.html` (canonical, og:url, og:image, Schema), `robots.txt` e `sitemap.xml`.
2. **Fotos** – salve em `assets/img/` com estes nomes (JPG, até ~200 KB cada; use https://squoosh.app para comprimir):
   - `hero.jpg` (1200×900) – carro brilhando. Substitui a ilustração do topo automaticamente.
   - `antes.jpg` e `depois.jpg` (1600×900, mesmo enquadramento) – comparativo.
   - `fachada.jpg`, `lavagem.jpg`, `interior.jpg` (800×600) – fotos do espaço.
   - `og-image.jpg` (1200×630) – imagem que aparece ao compartilhar o link no WhatsApp/Facebook.
   - `apple-touch-icon.png` (180×180) – ícone para iPhone.
   Enquanto uma foto não existir, o site mostra um marcador no lugar.
3. **Redes sociais**: troque os links do Instagram e Facebook no rodapé do `index.html`.
4. **Avaliações**: em `assets/js/main.js`, troque `REVIEWS_URL` pelo link direto do Perfil
   da Empresa no Google, se tiver. Para mostrar depoimentos, copie avaliações reais do Google
   no bloco comentado da seção "Depoimentos" do `index.html`.
5. **Sábado e domingo**: a tabela de horários diz "Fechado". Ajuste se atenderem.

## Onde hospedar

- **Grátis**: Netlify (arraste a pasta em app.netlify.com/drop), Vercel ou GitHub Pages.
- **Hospedagem comum** (Hostinger, HostGator, Locaweb): envie o conteúdo da pasta para `public_html`.

## Depois de publicar

- Cadastre o site no **Google Search Console** e envie o `sitemap.xml`.
- No **Perfil da Empresa no Google**, coloque o link do site.
- Teste o Schema em https://search.google.com/test/rich-results
