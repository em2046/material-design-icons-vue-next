import { series } from 'gulp';
import cleanDirectories from './tasks/pre-process/clean-directories';
import generateIcons from './tasks/generate/generate-icons';

export default series(cleanDirectories, generateIcons);
