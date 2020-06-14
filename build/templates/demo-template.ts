import { getComponentName, getDisplayName, getListName } from '../helpers';
import { upperFirst } from 'lodash';

export function itemTemplate(category: string, fileName: string) {
  return `<li>
  <${category}.${getComponentName(fileName)} />
  <span class="icon-name">${getDisplayName(fileName)}</span>
</li>`;
}

export function listTemplate(category: string, items: string) {
  let listName = getListName(category);
  return `import { defineComponent } from 'vue';
import * as ${category} from '../../icons/${category}';

export default defineComponent({
  name: '${listName}',
  setup() {
    return () => (<div class="icon-pane">
  <div class="icon-category">${upperFirst(category)}</div>
  <ul>${items}</ul>
</div>);
  },
});
`;
}

export function indexTemplate(category: string) {
  let listName = getListName(category);
  return `export { default as ${listName} } from './${listName}';`;
}

export function paneTemplate(category: string) {
  let listName = getListName(category);
  return `<panes.${listName} />`;
}

export function panesTemplate(content: string) {
  return `import { defineComponent } from 'vue';
import * as panes from './icons';

export default defineComponent({
  name: 'IconPanes',
  setup() {
    return () => (<div class="icon-panes">${content}</div>);
  },
});
`;
}
