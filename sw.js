// Faz o app abrir sem internet.
// Página: busca na rede primeiro (pega atualização na hora) e usa a cópia salva se estiver sem sinal.
// Resto (ícones, fontes): usa a cópia salva e atualiza por trás.
// Ao mudar arquivos do app, aumente a VERSAO pra limpar o cache antigo.
const VERSAO = 'emprestimo-v1';
const ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './favicon.svg',
  './favicon-32.png', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(nomes => Promise.all(nomes.filter(n => n !== VERSAO).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copia = res.clone();
      caches.open(VERSAO).then(c => c.put('./index.html', copia));
      return res;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(salvo => {
    const rede = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copia = res.clone();
        caches.open(VERSAO).then(c => c.put(req, copia));
      }
      return res;
    }).catch(() => salvo);
    return salvo || rede;
  }));
});
