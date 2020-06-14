import { camelCase, upperFirst } from 'lodash';

export const iconCategories = [
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

export function getComponentName(name: string) {
  return 'MDI' + upperFirst(camelCase(name.replace(/ic(.+)_24px/, '$1')));
}

export function getListName(name: string) {
  return `List${upperFirst(name)}`;
}
