import { dest, series, src } from 'gulp';
import concatCss from 'gulp-concat-css';

async function component(inputPath: string, outputPath: string) {
  src(inputPath).pipe(concatCss(outputPath)).pipe(dest('.'));
}

async function bundle() {
  await component('./src/index.css', './dist/index.css');
}

export default series(bundle);
