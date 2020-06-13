import * as path from 'path';
import { dest, src } from 'gulp';
import rename from 'gulp-rename';
import materialDesignIcons from 'material-design-icons';
import through2 from 'through2';
import puppeteer from 'puppeteer';
import icon from '../../build/templates/icon';
import { getComponentName } from '../../build/helpers';

const ICON_CATEGORIES = [
  'action',
  'alert',
  'av',
  'communication',
  'content',
  'device',
  'editor',
  'file',
  'hardware',
  'image',
  'maps',
  'navigation',
  'notification',
  'places',
  'social',
  'toggle',
];
const svgPath = 'svg/production/**24px.svg';

async function svgConverter(
  page: puppeteer.Page,
  xml: string
): Promise<string> {
  return await page.evaluate((xml) => {
    let wrap = document.createElement('div');
    wrap.innerHTML = xml;
    let svg = wrap.querySelector('svg');
    if (!svg) {
      return xml;
    }
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('width', '1em');
    svg.setAttribute('height', '1em');
    svg.removeAttribute('xmlns');
    return wrap.innerHTML;
  }, xml);
}

export default async function generateIcons() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const staticPath = materialDesignIcons.STATIC_PATH;
  let processes = ICON_CATEGORIES.map((category) => {
    return new Promise((resolve) => {
      const svgFiles = path.join(staticPath, category, svgPath);
      src(svgFiles)
        .pipe(
          through2.obj(async (chunk, enc, callback) => {
            const fileName = chunk.stem;
            const xml = chunk.contents.toString(enc);
            let svgHTML = await svgConverter(page, xml);
            let vueComponent = icon(svgHTML, getComponentName(fileName));
            chunk.contents = Buffer.from(vueComponent);
            callback(null, chunk);
          })
        )
        .pipe(
          rename((p) => {
            const baseName = p.basename;
            if (!baseName) {
              return;
            }
            const fileName = `${getComponentName(baseName)}`;
            return {
              dirname: '/',
              basename: fileName,
              extname: '.tsx',
            };
          })
        )
        .pipe(dest(`src/icons/${category}`))
        .on('end', resolve);
    });
  });

  await Promise.all(processes);
  return await browser.close();
}
