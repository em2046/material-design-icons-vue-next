import { camelCase, upperFirst } from 'lodash';

export function getComponentName(name: string) {
  return 'MDI' + upperFirst(camelCase(name.replace(/ic(.+)_24px/, '$1')));
}
