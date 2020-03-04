<template>
  <div>
    <h1>{{id?'编辑':'创建'}}广告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="标题">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:1rem" label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl()"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item,'image' , res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="Url">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads/", this.model);
      }
      //这里是向前端路由请求页面，其余为前面界面向后端服务器的路由请求
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
