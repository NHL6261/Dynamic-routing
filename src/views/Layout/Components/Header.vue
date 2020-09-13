<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="pull-right header-icon">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.jpg" />
        {{ username }}
      </div>
      <div @click="exit()" class="header-icon pull-left">
        <svg-icon iconClass="close" className="close"></svg-icon>
      </div>
    </div>
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
  computed
} from "@vue/composition-api";
export default {
  setup(props, { refs, root }) {
    const username = computed(() => root.$store.state.app.username)
    const exit = () => {
      root.$store.dispatch("Exit").then(() =>{
        root.$router.push({ name: 'Login' })
      })
    };
    const navMenuState = () => {
      root.$store.commit("CHANGE_COLLAPSE");
    };
    return {
      exit,
      username,
      navMenuState,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: 75px;
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 25px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}

.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
</style>
