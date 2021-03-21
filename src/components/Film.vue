<template>
  <div class="film">
    <!--    Это страница для отображения подборки фильмов-->
    <div class="title">{{ title }}</div>
    <div class="film-item" v-for="(item, index) in showFilm" :key="item.data.filmId">

      <div class="film-info">
        <img :src="item.data.posterUrl" alt="" class="img" v-on:click="showFilmCard(item)">

        <div class="film-wrapper">
          <div class="film-parameters">
            <h2 class="film-title"
                v-on:click="showFilmCard(item)">
              {{ item.data.nameRu }}
            </h2>
            <h2 v-on:click="showFilmCard(item)"
                v-if="item.data.nameRu !== item.data.nameEn"
                class="film-title">{{ item.data.nameEn }}
            </h2>
            <div class="parameters">
              <div class="film-year">{{ item.data.year }} г.</div>
              <div class="genre-wrapper">
                <div class="genre"
                     v-for="genre in item.data.genres"
                     :key="genre.genre">
                  {{ genre.genre }}</div>
              </div>
              <div class="country-wrapper">
                <div class="country" v-for="country in item.data.countries" :key="country.country">
                  {{ country. country }}</div>
              </div>

            </div>
          </div>
          <div class="like-btn" v-on:click="likeFilm(item.data.filmId, index)">
            <button class="btn"><i class="fas fa-heart btn-icon" ref='like' :class="{active: item.isLike}"></i></button>
            <span class="like" ref="likeText" v-if="item.isLike">в избранном</span>
            <span class="like" ref="likeText" v-if="!item.isLike">в избранное</span>
          </div>
        </div>

      </div>

      <div class="film-description">
        {{ item.data.description }}
      </div>

    </div>
  </div>


</template>

<script>
export default {
  name: "Film",
  props: {
    showFilm: {
      type: Array,
      default(){
        return []
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    }
  },
  mounted() {
    console.log(this.showFilm)
  },
  methods: {
    likeFilm(key, index){

      this.showFilm[index].isLike = !this.showFilm[index].isLike
      if(this.showFilm[index].isLike){
        this.$refs.like[index].style.color = 'red';
        this.$refs.likeText[index].textContent = 'в избранном'
      } else {
        this.$refs.like[index].style.color = '#23a8e0';
        this.$refs.likeText[index].textContent = 'в избранное'
      }
      //необходимо занести этот фильм в Liked
      this.$store.dispatch('LIKE_FILMS', key)
    },
    showFilmCard(elem){
      this.$router.push({name: 'FilmCard', params: {film: elem}});
    }
  }

}
</script>

<style scoped>
.film{
  padding: 10px;
}
.title{
  width: 70%;
  margin: 0 auto;
  margin-bottom: 60px;
  font-size: 40px;
  text-align: center;
  color: #177ea8;
  font-weight: bold;
}
.film-item{
  width: 900px;
  padding: 10px;
  margin-bottom: 40px;
}
.film-info{
  display: flex;
}
.img{
  width: 290px;
  height: 390px;
  border-radius: 5px;
  cursor: pointer;
}
.film-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.film-parameters{
  padding-left: 15px;
}
.film-title{
  padding-bottom: 5px;
  font-size: 26px;
  text-align: left;
  color: #23a8e0;
  cursor: pointer;
}

.parameters{
  font-size: 24px;
  color: #666666;
  text-align: left;
}
.genre-wrapper{
  padding-top: 5px;
  display: flex;
  align-items: center;
}
.genre:not(:last-child):after{
  content: ',';
}

.genre:not(:first-child){
  padding-left: 5px;
}
.country-wrapper{
  padding-top: 5px;
  display: flex;
  align-items: center;
}
.country:not(:last-child):after{
  content: ',';
}
.country:not(:first-child){
  padding-left: 5px;
}
.like-btn{
  width: 200px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
}
.like-btn:hover{
  transform: scale(1.03);
}
.btn{
  padding: 10px;
  border: 1px solid #8a8a8a;
  border-radius: 4px;
  background-color: inherit;
  cursor: pointer;
}
.btn-icon{
  font-size: 28px;
  color: #23a8e0;
}
.like{
  padding-left: 10px;
  font-size: 22px;
  color: #000;
}
.active{
  color: red;
}

.film-description{
  margin-top: 10px;
  width: 100%;
  padding: 20px;
  font-size: 22px;
  text-align: left;
  background-color: #e1e1e1;
  border-radius: 5px;
}
</style>