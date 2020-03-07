<template>
  <div class="page-article" v-if="model">
    <div
      class="d-flex fs-sm py-3 px-2 text-blue bg-light border-bottom"
      style=" border-bottom: 1px solid $border-color;"
    >
      <div class="iconfont icon-back"></div>
      <div class="flex-1 text-ellipsis pr-2">{{ model.title }}</div>
      <div class="text-grey">{{ model.updatedAt | date }}</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-xiangguan fs-xl"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
    </div>
    <div class=" px-3">
      <router-link
        class="py-1 text-ellipsis"
        tag="div"
        :to="`/article/${item._id}`"
        v-for="item in model.related"
        :key="item._id"
        >{{ item.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id: "fetch"
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/article/${this.id}`);
      this.model = res.data;
      console.log(this.model);
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.1538rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
