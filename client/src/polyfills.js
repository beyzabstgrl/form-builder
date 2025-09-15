// global -> window
// (typeof global) güvenli kontrol, tarayıcıda ReferenceError vermez
if (typeof global === 'undefined') {
  // eslint-disable-next-line no-undef
  window.global = window;
}

// process.env -> Vite mode (bazı paketler NODE_ENV sorar)
if (typeof window.process === 'undefined') {
  window.process = { env: { NODE_ENV: import.meta.env.MODE } };
} else if (!window.process.env) {
  window.process.env = { NODE_ENV: import.meta.env.MODE };
}
