<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <!-- <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">({{article.favoritesCount}})</span>
    </button> -->
    &nbsp;&nbsp;
    <button
      v-if="user.username !== article.author.username"
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
      @click="onFavorite(article)"
      :disabled="article.favoriteDisabled"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    <button
      v-else
      class="btn btn-sm btn-outline-primary"
      @click="updateArticle"
    >
      修改
    </button>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    updateArticle() {
      this.$router.push({
        name: "editor",
        query: {
          slug: this.article.slug,
        },
      });
    },
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style>
</style>
