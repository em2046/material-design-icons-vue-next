import rename from 'gulp-rename';
import { getComponentName } from '../helpers';

export function iconRename() {
  return rename((p: rename.ParsedPath) => {
    const baseName = p.basename;

    if (!baseName) {
      return;
    }

    const componentName = `${getComponentName(baseName)}`;

    return {
      dirname: '/',
      basename: componentName,
      extname: '.tsx',
    };
  });
}
