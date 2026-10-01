# Simulação Empréstimo 💰

App de uma página só pra simular empréstimo no cartão da Zicão Store.
Digita quanto o cliente quer receber e aparece a tabela de 1x a 18x (parcela e total).
Um toque copia o texto alinhado pra mandar no WhatsApp.

**No ar:** https://thiagogaldinozicao-source.github.io/emprestimo/

## Como rodar
Abre o `index.html` no navegador. Não precisa instalar nada.
Pra testar o modo sem internet, sirva a pasta com um servidor local (`python3 -m http.server`) e acesse `http://localhost:8000`.

## Como publicar
Sobe os arquivos na branch `main`. O GitHub Pages atualiza sozinho em 1 ou 2 minutos.
**Mudou alguma coisa? Aumenta a `VERSAO` no `sw.js`** (ex.: `emprestimo-v2`), senão o celular pode continuar com a versão antiga guardada.

## Onde mexer
| O quê | Onde |
|---|---|
| Fatores de cada parcela (taxas da maquininha) | `FATORES` no `index.html` |
| Os 20% em cima do valor (12x = recebido × 1,20) | `simular()` no `index.html` |
| Texto que vai pro WhatsApp | `gerarTexto()` no `index.html` |
| Cores | `:root` no começo do `<style>` |
| Ícones | `icone.svg` (original), PNGs gerados a partir dele, links com `?v=` no `<head>` |
| Modo sem internet | `sw.js` |

## Arquivos
- `index.html`: o app inteiro (visual, conta e copiar)
- `sw.js`: guarda o app no celular pra abrir sem internet
- `manifest.webmanifest`: nome e ícones quando instala na tela inicial
- `icone.svg`, `apple-touch-icon.png`, `icon-*.png`, `favicon.*`: ícones (o saquinho é o emoji 💰 do Google Noto, licença aberta OFL)
