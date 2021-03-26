<template>
  <Film :title="title"
        :showFilm="filmList"></Film>
</template>

<script>
import Film from "@/components/Film";
export default {
  name: "Collection",
  data(){
    return{
      filmList: [],
      title: '',
      id: ''
    }
  },
  components: {
    Film
  },
  async mounted() {
    this.id = this.$router.currentRoute.params.id;
    let films = await this.$store.dispatch('SHOW_FILMS', this.id)
    this.filmList = films.list
    this.title = films.title
  }
}
</script>

<style scoped>

</style>