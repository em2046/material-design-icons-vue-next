import { series } from 'gulp';
import cleanDirectories from './build/tasks/clean-directories';
import generateIcons from './build/tasks/generate-icons';
import generateIndex from './build/tasks/generate-index';

export default series(cleanDirectories, generateIcons, generateIndex);
