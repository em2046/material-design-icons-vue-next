import { dest, src } from 'gulp';
import concatCss from 'gulp-concat-css';

async function component(inputPath: string, outputPath: string) {
  src(inputPath).pipe(concatCss(outputPath)).pipe(dest('.'));
}

export async function style() {
  await component('./src/index.css', './dist/index.css');
}
