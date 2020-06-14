import path from 'path';
import { dest, src } from 'gulp';
import materialDesignIcons from 'material-design-icons';
import puppeteer from 'puppeteer';
import { iconDefinition, iconRename } from '../plugins/icon-definition';
import prettierFormat from '../plugins/prettier-format';
import { iconCategories, svgSelector } from '../helpers';

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
        .pipe(prettierFormat())
        .pipe(dest(`src/icons/${iconCategory}`))
        .on('end', resolve);
    });
  });

  await Promise.all(processes);

  return await browser.close();
}
