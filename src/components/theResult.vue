<template>
    <div v-if="isLoading" class= 'loader'>
        <img src="Reload.svg" alt="loader">
    </div>
    <div v-else class="results" :class="{'get-wider': isResOpen}">
        <div class="no-result" v-if="store.state.rec.length === 0">there are no results. search for some</div>
        <ul v-else class="results__list">
            <svg class="open-icon" :class="{'open': isResOpen}" @click="isResOpen= !isResOpen">
                <use href="icons.svg#icon-triangle-right"></use>
            </svg>
            <li v-for="rec in recipes" :key="rec.recipe_id" @click="selectRec(rec.recipe_id)">
                <a class="results__link">
                    <figure class="results__fig">
                        <img :src="rec.image_url" alt="rec-photo">
                    </figure>
                    <div :class="{'hide-element': !isResOpen}" class="results__data">
                        <h4 class="results__name">{{reduceTitle(rec.title)}}</h4>
                        <p class="results__author">{{rec.publisher}}</p>
                    </div>
                </a>
            </li>
        </ul>
        <div class="results__pages">
            
            <button v-if="pages > 1 && page > 1"
                    class="btn-inline results__btn--prev"
                    @click="page--"
            >
                <svg class="search__icon">
                    <use href="icons.svg#icon-triangle-left"></use>
                </svg>
                <span> page {{page - 1}}</span>
            </button>
            <button v-if="pages > 1 && page < pages"
                    class="btn-inline results__btn--next"
                    @click="page++"
            >
                <span> page {{page + 1}}</span>
                <svg class="search__icon">
                    <use href="icons.svg#icon-triangle-right"></use>
                </svg>
            </button> 
           
        </div>
    </div>
</template>
<script>
import { computed , ref} from 'vue'
import {useStore} from 'vuex'
export default {
    setup(){
        const store= useStore()
        const isLoading= computed(()=>{return store.getters.loading})
        const isResOpen= ref(false)
        /* paginations****************************************** */

        const resPerPage= 10
        const pages= computed(()=>{return Math.ceil(store.state.rec.length / 10)})
        const page= ref(1)
        const start= computed(()=>{return (page.value - 1) * resPerPage})
        const end= computed(()=>{return page.value * resPerPage})
        const recipes= computed(()=> {
            return store.state.rec.slice(start.value, end.value) 
        })

        //reduce title//////////////////////////////////////////////////
        function reduceTitle(title, limit = 17){
            const newTitle = [];

            if(title.length > limit){
                title.split(' ').reduce( (acc, cur) => {
                    if(acc + cur.length <= limit){
                        newTitle.push(cur);
                    }
                    return acc + cur.length
                }, 0 )
                return `${newTitle.join(' ')} ...`
        }
        return title
        }

        /* function to select the recipe *//////////////////////////////////////
        function selectRec(id) {
            store.dispatch('getRecipe', id)
        }
        ////////////////////////////////////////////////////////////////////

        return{
            store,
            recipes,
            reduceTitle,
            pages, 
            page,
            isLoading,
            selectRec,
            isResOpen
        }
    }
}
</script>
<style lang="scss" scoped>
.hide-element{
    @media only screen and (max-width: $bp-medium){
        display: none;
    }
}
.open{
    transform: translate(50%, -50%) rotate(180deg) !important;
}
.get-wider{
    width: 150% !important;
}
.open-icon{
    display: none;
    fill: #F48982;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    opacity: .5;
    transition: transform .4s;
    cursor: pointer;
    &:hover{
        opacity: 1;
    }
    @media only screen and (max-width: $bp-medium){
        display: block;
    }
}
.loader img{
    width: 50%;
}
.no-result{
    font-size: 1.6rem;
    margin: 3rem;
    text-transform: capitalize;
}
.results {
    background-color: #fff;
    transition: all .5s;
    width: 100%;
    padding: 3rem 0;
    z-index: 10;
  &__list {
      position: relative;
    list-style: none; 
  }
  &__link{
      cursor: pointer;
    &, &:visited{
        display: flex;
        align-items: center;
        padding: 1.5rem 3rem;
        transition: all .3s;
        border-right: 1px solid #fff;
        text-decoration: none; 
    }
    &:hover {
        background-color: #F9F5F3;
        transform: translateY(-2px); 
    }
    &--active {
        background-color: #F9F5F3; 
    }
  }
  &__fig {
        flex: 0 0 5.5rem;
        border-radius: 50%;
        overflow: hidden;
        height: 5.5rem;
        margin-right: 2rem;
        position: relative;
        backface-visibility: hidden; 
        &::before {
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(to right bottom, #FBDB89, #F48982);
        opacity: .4; 
        }
        & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .3s; 
        }
    }
    &__name {
        font-size: 1.3rem;
        color: #F59A83;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: .3rem;
    }
    &__author {
        font-size: 1.1rem;
        color: #968B87;
        text-transform: uppercase;
        font-weight: 600; 
    }
    &__pages {
        margin-top: 3rem;
        padding: 0 3rem; 
        &::after {
            content: "";
            display: table;
            clear: both; 
        }
    }
    &__btn--prev {
        float: left;
        flex-direction: row-reverse;
    }
    &__btn--next {
        float: right; 
    }
}


</style>