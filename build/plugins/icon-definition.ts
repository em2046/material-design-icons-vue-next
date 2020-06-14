import puppeteer from 'puppeteer';
import through2 from 'through2';
import { iconTemplate } from '../templates/icon-template';
import { getComponentName } from '../helpers';
import rename from 'gulp-rename';

async function svgConvert(page: puppeteer.Page, xml: string): Promise<string> {
  return await page.evaluate((xml) => {
    let wrap = document.createElement('div');
    wrap.innerHTML = xml;
    let svg = wrap.querySelector('svg');

    svg?.setAttribute('fill', 'currentColor');
    svg?.setAttribute('width', '1em');
    svg?.setAttribute('height', '1em');
    svg?.removeAttribute('xmlns');

    return wrap.innerHTML;
  }, xml);
}

export function iconDefinition(page: puppeteer.Page) {
  return through2.obj(async (chunk, enc, callback) => {
    const fileName = chunk.stem;
    const xml = chunk.contents.toString(enc);
    let inlineXML = await svgConvert(page, xml);
    let vueComponent = iconTemplate(inlineXML, getComponentName(fileName));
    chunk.contents = Buffer.from(vueComponent);
    callback(null, chunk);
  });
}

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
