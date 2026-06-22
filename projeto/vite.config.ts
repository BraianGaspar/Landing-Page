import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-svgs',
      closeBundle() {
        const assetsDir = resolve(__dirname, 'dist/assets');
        const srcAssetsDir = resolve(__dirname, 'src/assets');

        // Criar diretório se não existir
        if (!existsSync(assetsDir)) {
          mkdirSync(assetsDir, { recursive: true });
        }

        // Copiar todos os SVGs
        const svgs = [
          'check.svg',
          'star.svg',
          'star-empty.svg',
          'leaf.svg',
          'hamburguer.svg',
          'close.svg',
          'logo.svg',
          'champion.svg',
        ];
        svgs.forEach((svg) => {
          const src = resolve(srcAssetsDir, svg);
          const dest = resolve(assetsDir, svg);
          try {
            copyFileSync(src, dest);
            console.log(`Copiado: ${svg}`);
          } catch (e) {
            console.log(`${svg} não encontrado em: ${src}`);
          }
        });
      },
    },
  ],
  server: {
    port: 5173,
    open: true,
  },
});
