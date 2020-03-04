<template>
  <div>
    <h1>{{id?'编辑':'创建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <template>
          <div id="app">
            <vue-editor
              style="line-height: normal"
              useCustomImageHandler
              @image-added="handleImageAdded"
              v-model="model.body"
            ></vue-editor>
          </div>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  components: {
    VueEditor
  },

  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles/", this.model);
      }
      //这里是向前端路由请求页面，其余为前面界面向后端服务器的路由请求
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchcategories() {
      const res = await this.$http.get(`rest/categories/`);
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created() {
    this.fetchcategories();
    this.id && this.fetch();
  }
};
</script>