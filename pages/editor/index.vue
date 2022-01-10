<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter="addTag"
                />
                <div
                  class="tag-list"
                  v-for="(item, index) in article.tagList"
                  :key="index"
                >
                  {{ item }}
                </div>
              </fieldset>
              <button
                @click="submit"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendArticle, getArticle, updateArticle } from "@/api/article.js";

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  async mounted() {
    console.log(this.$route.query);
    if (this.$route.query && this.$route.query.slug) {
      const [res, error] = await getArticle(this.$route.query.slug);
      if (res) {
        this.article = {
          title: res.data.article.title,
          description: res.data.article.description,
          body: res.data.article.body,
          tagList: res.data.article.tagList,
        };
      }
    }
  },
  methods: {
    async submit() {
      let slug = this.$route.query && this.$route.query.slug;
      let apiFn = null;
      if (slug) {
        apiFn = updateArticle;
      } else {
        apiFn = sendArticle;
      }
      const [res, error] = await apiFn(
        {
          article: this.article,
        },
        slug
      );
      if (res) {
        alert("成功");
      }
    },
    addTag(e) {
      if (e.target.value) {
        this.article.tagList.push(e.target.value);
        e.target.value = null;
      }
    },
  },
};
</script>

<style>
</style>
