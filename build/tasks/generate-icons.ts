import path from 'path';
import { dest, src } from 'gulp';
import materialDesignIcons from 'material-design-icons';
import puppeteer from 'puppeteer';
import { iconDefinition } from '../plugins/icon-definition';
import { iconRename } from '../plugins/icon-rename';
import prettierFormat from '../plugins/prettier-format';
import { iconCategories } from '../helpers';

const svgSelector = 'svg/production/**24px.svg';

export default async function generateIcons() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const iconPath = materialDesignIcons.STATIC_PATH;

  let processes = iconCategories.map((iconCategory) => {
    return new Promise((resolve) => {
      const svgFullSelector = path.join(iconPath, iconCategory, svgSelector);
      src(svgFullSelector)
        .pipe(iconDefinition(page))
        .pipe(iconRename())
        .pipe(prettierFormat({ parser: 'typescript' }))
        .pipe(dest(`src/icons/${iconCategory}`))
        .on('end', resolve);
    });
  });

  await Promise.all(processes);

  return await browser.close();
}
