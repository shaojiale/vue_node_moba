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
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
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
        <div class="py-2 fs-md d-flex" v-for="(items,n) in category.newsList" :key="n">
          <span class="text-info">[{{items.categoryName}}]</span>
          <span>|</span>
          <span class="flex-1 text-ellipsis pr-2">{{items.title}}</span>
          <span class="text-grey-1 fs-sm">{{items.updatedAt | date }}</span>
        </div>
      </template>
    </list-card>
    <list-card icon="card-hero" title="英雄列表"></list-card>
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
      newcats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newcats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
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

.sprite {
  background: url(../assets/imgs/sprite.png) no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;
  &.sprite-news {
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 63.546% 15.517%;
  }
  &.sprite-arrows {
    width: 0.7692rem;
    height: 0.7692rem;
    background-position: 38.577% 52.076%;
  }
}
</style>
