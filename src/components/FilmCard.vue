<template>
  <div>
    <div v-if="load">Загрузка</div>

    <div v-else class="filmCard">
      <img :src="film.data.posterUrl" alt="" class="img">
      <div class="film-info">
        <div class="film-title-wrapper">
          <h2 class="film-title">{{ film.data.nameRu }}</h2>
          <h2 class="film-title">{{ film.data.nameEn }}</h2>
          <div class="like-btn" v-on:click="likeFilm(film.data.filmId)">
            <button class="btn">
              <i class="fas fa-heart btn-icon" ref='like' :class="{activeLike: film.isLike}"></i>
            </button>
            <span class="like" ref="likeText" v-if="film.isLike">в избранном</span>
            <span class="like" ref="likeText" v-if="!film.isLike">в избранное</span>
          </div>
        </div>
        <ul class="film-parameters">
          <li class="parameter" v-on:click="changeParameter('desc')" :class="{active: type ==='desc'}">Описание</li>
          <li class="parameter" v-on:click="changeParameter('info')" :class="{active: type ==='info'}">Информация</li>
          <li class="parameter" v-on:click="changeParameter('facts')" :class="{active: type ==='facts'}">Интересные факты</li>
        </ul>
        <div class="information">
          <div class="description" v-if="type === 'desc'">
            {{ film.data.description }}
          </div>
          <div class="info" v-if="type === 'info'">
            <p class="info-item">Длина фильма - {{ film.data.filmLength}}</p>
            <p class="info-item">Премьера в России - {{ film.data.premiereRu}}</p>
            <p class="info-item">Премьера в мире - {{ film.data.premiereWorld}}</p>
            <p class="info-item">Возрастное ограничение - {{ film.data.ratingAgeLimits}}+</p>
            <p class="info-item">Слоган - "{{ film.data.slogan}}"</p>
          </div>
          <div class="facts" v-if="film.data.facts && film.data.facts.length > 0 && type === 'facts'">
            {{ film.data.facts[factsIndex] }}
            <button class="more" v-on:click="moreFacts(film.data.facts.length)"><span class="moreText">еще</span></button>
          </div>
          <div v-else-if="type === 'facts'" class="facts">
            Информация отсутствует
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "FilmCard",
  data(){
    return{
      factsIndex: 0,
      type: 'desc',
      film: {},
      load: false,
    }
  },
  methods: {
    changeParameter(type){
      this.type = type;
    },
    moreFacts(len){
      if(this.factsIndex >= len-1){
        this.factsIndex = 0;
      } else this.factsIndex++
    },
    likeFilm(id) {
      this.film.isLike = !this.film.isLike;
      this.$store.dispatch('LIKE_FILMS', id)
    }
  },
  async created() {
    this.load = true;
    let id = this.$router.currentRoute.params.id;
    await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`, {
      headers: {
        'X-API-KEY': `36619dd6-6c94-4295-a0d1-7088c48d7715`
      }
    }).then((res) => {
      this.film =  res.data;
      console.log(this.film)
      this.load = false
    }).catch(error => {
      console.log(error.response)
    });

  },
}
</script>

<style scoped>
.filmCard{
  display: flex;
  justify-content: space-between;
}
.img{
  width: 35%;
}
.film-info{
  padding-top: 50px;
  width: 60%;
}
.film-title-wrapper{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #8f8f8f;
}
.film-title{
  padding-bottom: 5px;
  font-size: 30px;
  color: #23a8e0;
}
.like-btn{
  padding-top: 10px;
  width: 200px;
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
.activeLike{
  color: red;
}


.film-parameters{
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.parameter{
  list-style-type: none;
  font-size: 24px;
  padding-top: 10px;
  margin-bottom: 20px;
  border-bottom: 4px solid #fff;
  cursor: pointer;
}
.parameter:hover{
  border-bottom: 4px solid #23a8e0;
}
.information{
  font-size: 26px;
}
.description{
  text-align: left;
}
.active{
  border-bottom: 4px solid #23a8e0;
}

.info{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.info-item{
  padding: 5px 0;
  border-bottom: 2px solid #c7c7c7;
}
.facts{
  text-align: left;
}
.more{
  display: block;
  margin-top: 10px;
  background-color: inherit;
  line-height: 30px;
  cursor: pointer;
  border: 1px solid #23a8e0;
  padding: 5px;
  border-radius: 5px;
}
.moreText{
  font-size: 30px;
  color: #23a8e0;
  font-weight: bold;
}
</style>