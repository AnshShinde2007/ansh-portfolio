import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  content: [join(__dirname, 'src/**/*.{js,jsx,ts,tsx}')],
  theme: {
    extend: {},
  },
  plugins: [],
};
