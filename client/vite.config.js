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
        target: 'https://url-shortner-iota-amber.vercel.app',
        secure: false,
      }
    }
  },
  plugins: [react()],
})
