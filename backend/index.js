import app from './server.js';

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
