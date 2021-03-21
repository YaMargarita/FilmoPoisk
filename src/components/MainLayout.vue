<template>
  <div class="main_layout">

    <div class="header" ref="navbar">
      <div class="container header-container">
        <router-link to="/" class="router-link">
          <span class="black">filmo</span><span class="blue">Poisk</span>
        </router-link>

        <div class="input-wrapper">
          <input type="text" class="input-field" placeholder="Введите название фильма" maxlength="45">
          <button class="search"><i class="fas fa-search search-icon"></i></button>
        </div>

        <div class="button-wrapper">
          <router-link to="/like">
            <button class="like"><i class="far fa-heart like-icon icon"></i></button>
          </router-link>
          <button class="login"><i class="fas fa-sign-in-alt login-icon icon"></i></button>
        </div>
      </div>
    </div>

<!--    Здесь будет router-view, который будет загружать нужную страницу-->
    <div class="container page-container" ref="page">
      <router-view></router-view>
      <div class="page-up" ref="btn_up">
        <button class="btn-up"
                v-on:click="pageUp">
          <i class="fas fa-chevron-up up-icon"></i>
        </button>
        <span class="up">наверх</span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "MainLayout",
  methods: {
    pageUp(){
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    // скрытие/ показ меню
    let navbar = this.$refs.navbar;
    let btn = this.$refs.btn_up
    let scrollPrev = 0;


    window.addEventListener('scroll', function (){
      let scrolled = window.pageYOffset;
      if ( scrolled > 100 && scrolled > scrollPrev ) {
        navbar.classList.add('out');
      } else {
        navbar.classList.remove('out');
      }
      if(scrolled > 700 && scrolled > scrollPrev){
        btn.classList.add('active')
      } else {
        btn.classList.remove('active')
      }
      scrollPrev = scrolled;
    })
  }
}
</script>

<style scoped>
.router-link{
  text-decoration: none;
}
.main_layout{
  font-size: 46px;
}
.container{
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 30px;
}
.page-container{
  margin-top: 150px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
}
.header{
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  background-color: #fff;
  transition: all .3s ease;
  padding: 25px;
  font-family: 'Varela Round', sans-serif;
  font-size: 56px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.out{
  transform: translateY(-100%);
}
.header-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.black{
  color: #000;
}
.blue{
  color: #23a8e0;
}

.input-wrapper{
  position: relative;
}
.input-field{
  padding: 10px;
  width: 700px;
  height: 50px;
  border-radius: 15px;
  border: 1px solid #23a8e0;
  color: #626262;
  font-size: 22px;
}
.search{
  position: absolute;
  top: 27px;
  right: 5px;
  padding: 5px;
  border: none;
  background-color: inherit;
  cursor: pointer;
}
.search-icon{
  font-size: 24px;
  color: #000;
}

.button-wrapper{
  display: flex;
  align-items: center;
}
.like, .login{
  margin-right: 30px;
  background-color: inherit;
  border: none;
  cursor: pointer;
}
.like-icon, .login-icon{
  color: #000;
  font-size: 44px;
  transition: color 0.5s;
}
.icon:hover{
  color: #23a8e0;
}


.page-up{
  position: fixed;
  bottom: 30px; right: 50px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: .55s opacity, .55s visibility;
}
.btn-up{
  background-color: initial;
  border: 2px solid #23a8e0;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
}
.active{
  opacity: 1;
  visibility: visible;
}
.up-icon{
  color: #23a8e0;
  font-size: 32px;
  bottom: 0;
}
.up{
  padding-top: 5px;
  font-size: 24px;
  color: #000;
}

</style>