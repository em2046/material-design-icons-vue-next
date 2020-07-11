import generateDemo from './build/tasks/generate-demo';
import generateIcons from './build/tasks/generate-icons';
import generateIndex from './build/tasks/generate-index';
import { style } from './build/tasks/style';
import { apiExtractor } from './build/tasks/api-extractor';
import { bundleScript } from './build/tasks/bundle-script';
import { cleanDist, cleanSrc } from './build/tasks/clean-directories';
import { parallel, series } from 'gulp';
import { rollupDts } from './build/tasks/rollup-dts';

const icon = series(
  cleanSrc,
  generateIcons,
  parallel(generateIndex, generateDemo)
);

const lib = series(cleanDist, rollupDts, apiExtractor, bundleScript);

export { icon, style, lib };
