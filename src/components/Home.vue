<template>
  <div class="home">

    <div class="home-title">Все подборки фильмов</div>

    <div class="home-wrapper">
      <div class="item"
           v-for="(item, index) in LIST"
           :key="index"
           v-on:click="showFilms(item.key)">
        <div class="img-wrapper">
          <img :src="item.img" alt="" class="img">
        </div>
        <div class="info-wrapper">
          <div class="film-count">{{ item.id.length }}</div>
          <div class="film-title">{{ item.title }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      currentFilm: [],
    }
  },
  computed:{
    LIST(){
      return this.$store.state.LIST
    }
  },
  methods: {
    async showFilms(key){
      // получен ключ, теперь  отрендерить только фильмы с этим ключом
      let filmList = await this.$store.dispatch('SHOW_FILMS', key);

      await this.$router.push({name: 'Film', params: {id: key, showFilm: filmList.list, title: filmList.title}});

    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.home-wrapper{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.home-title{
  margin: 30px 0;
  text-align: left;
  color: #000;
}
.item{
  position: relative;
  width: 350px;
  height: 350px;
  margin: 10px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 7px;
}
.img{
  width: 350px;
  height: 350px;
  object-fit: cover;
  transition: 0.5s;
}
.img:hover{
  transform: scale(1.1);
}
.info-wrapper{
  position: absolute;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  bottom: 0;
  font-size: 20px;
  color: #fff;
}
.film-count{
  width: 20%;
  padding: 5px;
  font-size: 60px;
  color: #23a8e0;
  border-left: 5px solid #23a8e0;
}
.film-title{
  width: 75%;
  padding: 5px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
}
</style>