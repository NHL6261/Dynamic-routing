<template>
  <div id="nav-wrap">
    <!-- <img style="margin: auto; width: 60%;height: 20%" src="@/assets/images/logo.png" alt=""> -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
      :collapse-transition="false"
    >
      <!-- 一级菜单 -->
      <template v-for="(item,index) in routes ">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
            v-for="( subItem, index ) in item.children"
            :key="index"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  watch,
  onUnmounted,
  computed,
} from "@vue/composition-api";
export default {
  setup(props, { root }) {
    // 获取当前的路由 root.$router.options.routes
    // 保存所有的路由
    const routes = reactive(root.$router.options.routes);
    /*
     * 自定义的方法
     */

    const handleOpen = () => {
      console.log("展开了");
    };
    const handleClose = () => {
      console.log("收起了");
    };
    /*
     * computed 监听vuex的数据
     */
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    return {
      isCollapse,
      handleOpen,
      handleClose,
      routes,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all .3s ease 0s)
}
.open{
  #nav-wrap { width: $navMenu; }
}
.close{
  #nav-wrap { width: 64px; }
}
</style>
