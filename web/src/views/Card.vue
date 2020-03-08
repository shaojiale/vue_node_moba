<template>
  <div class="card bg-white p-4 mt-3 ">
    <strong
      class="card-header d-flex ai-center"
      :class="{ 'border-bottom': !plain, 'pb-3': !plain }"
    >
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fx-xxl flex-1 px-2">{{ title }}</div>
      <i class="iconfont icon-menu" v-if="!plain"></i
    ></strong>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  border-bottom: 1px solid $border-color;
}
</style>
