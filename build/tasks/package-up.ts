import { build } from 'esbuild';

export function packageUp(cb: () => void) {
  build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.js',
    sourcemap: 'external',
    bundle: true,
    format: 'esm',
    target: 'es6',
    external: ['vue'],
    jsxFactory: 'vueJsxCompat',
  })
    .then(() => {
      cb();
    })
    .catch(() => process.exit(1));
}
