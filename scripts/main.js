const { Vue } = window;

Vue.component("toc-tags", {
  props: ["tags"],
  template: `
        <span class="toc-article-tags">
            <a v-for="tag in tags" v-bind:class="'toc-tag toc-tag-' + tag.id" href="#">{{ tag.name }}</a>
        </span>
    `
});

Vue.component("toc-article", {
  props: ["article"],
  template: `
        <article class="toc-article" v-bind:id="'toc-article-' + article.id">
            <img class="toc-article-poster" v-bind:src="article.poster" />
            <div class="toc-article-inner">
                <h2 class="toc-article-title">{{ article.title }}</h2>
                <p class="toc-article-meta">
                    {{ article.author }} |
                    {{ article.date }} |
                    <toc-tags v-bind:tags="article.tags" />
                </p>
                <div class="toc-article-content">
                    <p>{{ article.lead }}</p>
                    <a href="#">{{ "Keep reading..." }}</a>
                </div>
            </div>
            <hr />
        </article>
    `
});

fetch("/data.json")
  .then(res => res.json())
  .then(
    data =>
      new Vue({
        el: "#articles",
        data: data,
        computed: {
          getArticles() {
            return this.articles.map(article => {
              return {
                ...article,
                tags: article.tags.map(tag => this.tags[tag])
              };
            });
          }
        }
      })
  )
  .catch(err => console.log(`Failed to get project data: ${err}`));
