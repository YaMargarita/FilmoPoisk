<template>
  <div class="like-wrapper">
    <div class="title">Понравившиеся фильмы</div>
    <div class="empty" v-if="$store.state.LIKED_FILMS.length === 0">
      <p>Вы не добавили ни одного фильма в "Избранное"</p>
      <p>Перейдите в <router-link class="link" to="/">подборку фильмов</router-link></p>
    </div>
    <div class="film-wrapper">
      <div class="like-film" v-for="film in likedFilms" :key="film.data.filmId">
        <img :src="film.data.posterUrl" alt="" class="img">
        <h2 class="film-title">{{ film.data.nameRu }}</h2>
        <button class="delete" v-on:click="deleteFilm(film.data.filmId)"><i class="fas fa-trash-alt delete-icon"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Like",
  data(){
    return{
      likedFilms: [],
    }
  },
  methods: {
    deleteFilm(key){
      this.$store.dispatch('DELETE_FILM', key)
    }
  },
  mounted() {
    this.likedFilms = this.$store.state.LIKED_FILMS;
  }
}
</script>

<style scoped>
.like-wrapper{
  margin-bottom: 40px;
}
.title{
  width: 70%;
  margin: 40px auto;
  font-size: 40px;
  text-align: center;
  color: #177ea8;
  font-weight: bold;
}
.empty{
  font-size: 30px;
  color: #000;
}
.link{
  color: #177ea8;
  text-decoration: none;
  font-weight: bold;
}
.film-wrapper{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.like-film{
  position: relative;
  width: 290px;
  height: 410px;
  margin: 10px;

}
.img{
  width: 290px;
  height: 390px;
  border-radius: 10px;
}
.film-title{
  position: absolute;
  bottom: 20px;
  width: 290px;
  height: 60px;
  font-size: 24px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
}
.delete{
  position: absolute;
  top: -20px;
  left: -20px;
  width: 50px;
  height: 50px;
  padding: 5px;
  background-color: inherit;
  border: none;
  cursor: pointer;
}
.delete-icon{
  font-size: 40px;
  color: #23a8e0;
}
</style>