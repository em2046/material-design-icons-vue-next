import { SetupContext, VNodeProps } from 'vue';
import { vueJsxCompat } from '../vue-jsx-compat';

export interface MDIconProps {}

let MDIconImpl = {
  name: 'MDIcon',
  setup(prop: MDIconProps, { slots }: SetupContext) {
    return () => {
      return <span class="md-icon">{slots.default?.()}</span>;
    };
  },
};

export const MDIcon = (MDIconImpl as any) as {
  new (): {
    $props: VNodeProps & MDIconProps;
  };
};
