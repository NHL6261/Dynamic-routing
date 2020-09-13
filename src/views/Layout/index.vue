<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav,
  },
  setup(props, { root }) {
    // 做监听控制整个页面的宽度
    const menuStatus = computed(() => root.$store.state.app.isCollapse)
    return {
      menuStatus
    }
  },
};
</script>

<style lang="scss" scoped>
#layout{
  background-color: #f7f7f7;
}
</style>
