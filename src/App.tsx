import { defineComponent } from 'vue';
import { vueJsxCompat } from './vue-jsx-compat';
import IconPanes from './views/IconPanes';

export default defineComponent({
  setup() {
    return () => <IconPanes />;
  },
});
