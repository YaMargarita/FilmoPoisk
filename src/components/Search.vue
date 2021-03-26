<template>
  <div class="Search">
    <Film :title="title" :showFilm="searchFilm"></Film>
  </div>
</template>

<script>
import Film from "@/components/Film";
export default {
  name: "Search",
  components: {
    Film
  },
  data(){
    return {
      title: '',
      searchFilm: [],
      id: '',
    }
  },
  async mounted(){
    this.id = this.$router.currentRoute.params.id;

    this.searchFilm = await this.$store.dispatch('SEARCH_FILM', this.id)
    this.title = `По Вашему запросу найдено ${this.searchFilm.length} совпадений`
  }
}
</script>

<style scoped>

</style>