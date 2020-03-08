<template>
  <div class="page-hero">
    <!-- 浮动条 -->
    <div
      class="topbar bg-black py-2 px-3 d-flex ai-center 
      text-white"
    >
      <img class="mr-2" src="../assets/logo.png" height="30" />
      <div class="mr-2">王者荣耀</div>
      <div class="flex-1 mr-2">攻略站</div>
      <router-link tag="div" :to="`/`" class="p-2 text-center"
        >更多英雄 &gt;</router-link
      >
    </div>
    <!-- 顶部图片 -->
    <div
      class="top"
      :style="{ 'background-image': `url(${model.backgroundimg})` }"
    >
      <div
        class="info text-white p-3 h-100
        d-flex flex-column jc-end"
      >
        <div>
          {{ model.title }}
        </div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div>
          {{ model.categories.map(v => v.name).join("/") }}
        </div>
        <div class="d-flex jc-between">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary ">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1 ">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger ">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark ">{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey"
            >皮肤 &gt;</router-link
          >
        </div>
      </div>
    </div>
    <!-- 基本信息 -->
    <div>
      <div class="px-3 bg-white">
        <!-- 导航栏 -->
        <div class="nav d-flex jc-around py-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link ">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div class="p-3 bg-white border-bottom">
            <div class=" d-flex jc-around ">
              <router-link tag="button" to="/" class="btn btn-lg flex-1">
                <i class="iconfont icon-bo_fang"></i>英雄介绍视频
              </router-link>
              <router-link tag="button" to="/" class="btn btn-lg flex-1  ml-2">
                <i class="iconfont icon-tupian"></i>一图识英雄
              </router-link>
            </div>

            <!-- skill -->
            <div class="skills bg-white mt-4">
              <div class="d-flex jc-around">
                <img
                  class="icon"
                  @click="currentSkillIndex = i"
                  :class="{ active: currentSkillIndex === i }"
                  :src="item.icon"
                  v-for="(item, i) in model.skills"
                  :key="item.name"
                />
              </div>
              <div v-if="currentSkill">
                <div class="d-flex py-4">
                  <h3 class="m-0">{{ currentSkill.name }}</h3>
                  <span class="text-grey-1 ml-4">
                    (冷却值：{{ currentSkill.delay }}消耗：{{
                      currentSkill.cost
                    }})
                  </span>
                </div>
                <p>{{ currentSkill.description }}</p>
              </div>
            </div>
          </div>

          <!-- 出装推荐 -->
          <m-card icon="card-zhuangbei" title="出装推荐"></m-card>
        </swiper-slide>
        <swiper-slide>
          进阶攻略
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/hero/${this.id}`);
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
@import "../assets/scss/variables";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rega(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
.skills {
  img.icon {
    width: 70px;
    height: 70px;
    border: 3px solid map-get($colors, "white");
    &.active {
      border: 3px solid map-get($colors, "primary");
      border-radius: 45%;
    }
  }
}
</style>
