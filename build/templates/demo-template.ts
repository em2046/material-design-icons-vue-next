import { getListName } from '../helpers';

export function itemTemplate(category: string, fileName: string) {
  return `<${category}.${fileName} />`;
}

export function listTemplate(category: string, items: string) {
  let listName = getListName(category);
  return `import { defineComponent } from 'vue';
import * as ${category} from '../../icons/${category}';

export default defineComponent({
  name: '${listName}',
  setup() {
    return () => (<div>${items}</div>);
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
    return () => (<div>${content}</div>);
  },
});
`;
}
