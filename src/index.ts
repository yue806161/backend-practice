import app from './app';
import { CONFIG } from './config';

app.listen(CONFIG.port, () => {
  console.log(`Server running on  http://localhost:${CONFIG.port}`);
  console.log(`debug mode: ${CONFIG.debug}`);
});
