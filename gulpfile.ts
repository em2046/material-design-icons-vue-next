import { parallel, series } from 'gulp';
import cleanDirectories from './build/tasks/clean-directories';
import generateIcons from './build/tasks/generate-icons';
import generateIndex from './build/tasks/generate-index';
import generateDemo from './build/tasks/generate-demo';

export default series(
  cleanDirectories,
  generateIcons,
  parallel(generateIndex, generateDemo)
);
