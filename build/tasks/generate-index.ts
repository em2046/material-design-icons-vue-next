import path from 'path';
import fs from 'fs';
import { dest, src } from 'gulp';
import cancat from 'gulp-concat';
import { iconCategories } from '../helpers';
import { indexDefinition } from '../plugins/index-definition';
import prettierFormat from '../plugins/prettier-format';
import categoriesIndexTemplate from '../templates/categories-index-template';

async function categoriesIndex() {
  let indexContent = iconCategories
    .map((category) => {
      return categoriesIndexTemplate(category);
    })
    .join('\n')
    .concat('\n');
  fs.writeFileSync(
    path.join(__dirname, '../../src/icons/index.ts'),
    indexContent
  );
}

async function categoryIndex() {
  let processes = iconCategories.map((iconCategory) => {
    return new Promise((resolve) => {
      let categoryPath = `src/icons/${iconCategory}`;
      src(`${categoryPath}/**.tsx`)
        .pipe(indexDefinition())
        .pipe(cancat('index.ts'))
        .pipe(prettierFormat({ parser: 'typescript' }))
        .pipe(dest(categoryPath))
        .on('end', resolve);
    });
  });

  await Promise.all(processes);
}

export default async function generateIndex() {
  await categoryIndex();
  await categoriesIndex();
}
