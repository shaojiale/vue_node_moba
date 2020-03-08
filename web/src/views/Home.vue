<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/imgs/guanggao.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/imgs/guanggao1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/imgs/guanggao2.jpeg" alt />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right"
        slot="pagination"
      ></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3 text-grey-1" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div>爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrows mr-1"></i>
        收起
      </div>
    </div>

    <list-card icon="cc-menu-circle" title="新闻资讯" :categories="newcats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/article/${news._id}`"
          class="py-2 fs-md d-flex"
          v-for="(news, n) in category.newsList"
          :key="n"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-ellipsis pr-2">{{ news.title }}</span>
          <span class="text-grey-1 fs-sm">{{ news.updatedAt | date }}</span>
        </router-link>
      </template>
    </list-card>

    <list-card icon="card-hero" title="英雄列表" :categories="herocats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/hero/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, n) in category.heroesList"
            :key="n"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </list-card>

    <list-card icon="shipin" title="精彩视频"></list-card>
    <list-card icon="gonglve" title="图文攻略"></list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: " .pagination-home"
        }
      },
      newcats: [],
      herocats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newcats = res.data;
    },
    async fetchHeroesCats() {
      const res = await this.$http.get("heroes/list");
      this.herocats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroesCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
