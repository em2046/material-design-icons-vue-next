import { iconCategories } from '../helpers';
import { dest, src } from 'gulp';
import cancat from 'gulp-concat';
import prettierFormat from '../plugins/prettier-format';
import {
  listDefinition,
  itemDefinition,
  listRename,
} from '../plugins/demo-definition';
import {
  indexTemplate,
  panesTemplate,
  paneTemplate,
} from '../templates/demo-template';
import fs from 'fs';
import path from 'path';

async function index() {
  let indexContent = iconCategories
    .map((category) => {
      return indexTemplate(category);
    })
    .join('\n')
    .concat('\n');
  fs.writeFileSync(
    path.join(__dirname, '../../src/views/icons/index.ts'),
    indexContent
  );
}

async function list() {
  let processes = iconCategories.map((iconCategory) => {
    return new Promise((resolve) => {
      let categoryPath = `src/icons/${iconCategory}`;

      src(`${categoryPath}/**.tsx`)
        .pipe(itemDefinition(iconCategory))
        .pipe(cancat(`${iconCategory}.tsx`))
        .pipe(listDefinition(iconCategory))
        .pipe(prettierFormat({ parser: 'typescript' }))
        .pipe(listRename())
        .pipe(dest('src/views/icons'))
        .on('end', resolve);
    });
  });

  await Promise.all(processes);
}

async function panes() {
  let panesContent = iconCategories
    .map((iconCategory) => {
      return paneTemplate(iconCategory);
    })
    .join('\n');
  let demo = panesTemplate(panesContent);
  fs.writeFileSync(path.join(__dirname, '../../src/views/IconPanes.tsx'), demo);
}

export default async function generateDemo() {
  await list();
  await index();
  await panes();
}
