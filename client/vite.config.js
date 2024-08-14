import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch:{
      usePolling: true,
    },
    proxy: {
      '/url': {
        target: 'https://url-shortner-y9c4.vercel.app',
        secure: false,
      }
    }
  },
  plugins: [react()],
})
