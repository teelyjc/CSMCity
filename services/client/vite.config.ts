import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

const srcPath = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@asset": path.resolve(srcPath, 'assets'),
			"@component": path.resolve(srcPath, 'components'),
			"@hook": path.resolve(srcPath, 'hooks'),
			"@page": path.resolve(srcPath, 'pages'),
			"@style": path.resolve(srcPath, 'styles'),
			"@util": path.resolve(srcPath, 'utils'),
		}
	},
  server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			}
		}
  },
	plugins: [react()],
})
