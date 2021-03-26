import Vue from 'vue';
import Vuex from 'vuex'
import axios from "axios";


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        LIST: [
            {
                "key": "animal",
                "id": ['387556', '934956', '1060511', '794620', '79204', '1272115', '571896', '279850', '533067', '1233472', '464413'],
                "title": "Фильмы про животных, после просмотра которых вы точно захотите завести питомца",
                "img" : "https://i.ibb.co/F7ZM6zG/animal.jpg"
            },
            {
                "key": "space",
                "id": ['3758', '7353', '566111', '841700', '975850'],
                "title": "Топ-5 лучших фильмов про Марс по версии телеканала «Наука»",
                "img": "https://i.ibb.co/3CNsV58/space.jpg",
            },
            {
                "key": "documentary",
                "id": ['1412524', '1178979', '1421543', '885072', '1112217', '573209', '1182400'],
                "title": "Лучшие документальные фильмы, которые можно посмотреть онлайн",
                "img": "https://i.ibb.co/CJk7cq7/documentary.jpg",
            },
            {
                "key": "action_movie",
                "id": ['471', '507', '6303', '7410', '4087', '2238', '4777', '444', '1968'],
                "title": "Названы лучшие боевики 80-90-х годов",
                "img": "https://i.ibb.co/99bP6xN/action-movie.jpg",
            },
            {
                "key": "catastrophe",
                "id": ['4607', '518037', '8177', '597129', '647948', '2941', '2053', '102245', '261636', '652692', '839818', '607737', '1164520', '1183599', '413447', '2022', '374718'],
                "title": "Фильмы, которые доказывают, что коронавирус – не самое страшное бедствие",
                "img": "https://i.ibb.co/F0b59Qv/catastrophe.jpg",
            },
        ],
        currentFilm: [],
        LIKED_FILMS: [],
        film: {},
    },

    actions: {
        async SHOW_FILMS({state}, key){
            let index = state.LIST.findIndex(elem => elem.key === key)

            state.currentFilm = [];

            const promises  = await state.LIST[index]["id"].map(async (id) => {
                await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`, {
                    headers: {
                        'X-API-KEY': `36619dd6-6c94-4295-a0d1-7088c48d7715`
                    }
                }).then((res) => {
                    let date = res.data;
                    // проверяю, есть ли такой фильм в понравившихся
                    date.isLike = false
                    state.LIKED_FILMS.forEach(item => {
                        if(item.data.filmId === date.data.filmId){
                            date.isLike = true
                            return ''
                        }
                    })
                    state.currentFilm.push(date)
                }).catch(error => {
                    console.log(error.response)
                });
            })
            await Promise.all(promises).then(values => {
                return values
            })
            return {list: state.currentFilm, title: state.LIST[index].title}
        },
        async LIKE_FILMS({state}, id){
            await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`, {
                headers: {
                    'X-API-KEY': `36619dd6-6c94-4295-a0d1-7088c48d7715`
                }
            }).then((res) => {
                let index = state.LIKED_FILMS.findIndex(item => item.data.filmId === id);
                if(index < 0){
                    //добавляем
                    state.LIKED_FILMS.push(res.data)
                } else {
                    //удаляем
                    state.LIKED_FILMS.splice(index, 1)
                }
            }).catch(error => {
                console.log(error.response)
            });
        },
        async SEARCH_FILM({state}, keyword){
            state.currentFilm = [];
            let arr = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`, {
                headers: {
                    'X-API-KEY': `36619dd6-6c94-4295-a0d1-7088c48d7715`
                }
            }).then((res) => {
                return res.data.films;
            }).catch(e => {
                console.log(e.response)
            })

            let promises =  await arr.map(async item => {
                let id = item.filmId;
                await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`, {
                    headers: {
                        'X-API-KEY': `36619dd6-6c94-4295-a0d1-7088c48d7715`
                    }
                }).then(result => {
                    let data = result.data;
                    //проверка,есть ли фильм в понравившихся
                    let index = state.LIKED_FILMS.findIndex(elem => elem.data.filmId === data.data.filmId)
                    data.isLike = index >= 0;
                    state.currentFilm.push(data)
                }).catch(e => {
                    console.log(e.response)
                })
            })

            await Promise.all(promises).then(res => {
                return res;
            })
            return await state.currentFilm;
        },
        DELETE_FILM({state}, key){
            let index = state.LIKED_FILMS.findIndex(elem => elem.data.filmId === key);
            state.LIKED_FILMS.splice(index, 1);

            console.log(state.LIKED_FILMS)
        }
    }
})