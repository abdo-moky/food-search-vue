<template>
    <header class="header">
            <img src="logo.png" alt="Logo" class="header__logo">
            <form class="search" @submit.prevent="makeReq">
                <input type="text" class="search__field" placeholder="Search over 1,000,000 recipes..." v-model.trim="searchQuery">
                <button class="btn search__btn">
                    <svg class="search__icon">
                        <use href="icons.svg#icon-magnifying-glass"></use>
                    </svg>
                    <span>Search</span>
                </button>
            </form>
            <div class="likes">
                <div class="likes__field">
                    <svg class="likes__icon">
                        <use href="icons.svg#icon-heart"></use>
                    </svg>
                </div>
                <div class="likes__panel">
                    <div v-if="likes.length < 1" class="no-likes">there is no liked recipe</div>
                    <ul v-else class="likes__list">
                        
                        <li v-for="(like, i) in likes" :key="i">
                            <a class="likes__link">
                                <figure class="likes__fig">
                                    <img :src="like.image_url" alt="photo">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">{{like.publisher}}</h4>
                                    <p class="likes__author">{{like.title}}</p>
                                </div>
                            </a>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </header>
</template>
<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
export default {
    setup(){
      const searchQuery= ref('')
      
      const store= useStore()

      const likes= store.state.likes

      function makeReq(){
        if (searchQuery.value !== '') {
          store.dispatch('getResults', searchQuery.value)
        }else alert('type something to search for')
      }


      return{
        searchQuery,
        makeReq,
        
        likes
      }
    }
}
</script>
<style lang="scss" scoped>
.no-likes{
  font-size: 1.4rem;
  text-transform: capitalize;
}
.header {
  grid-area: head;
  background-color: #F9F5F3;
  display: flex;
  align-items: center;
  justify-content: space-between; }
  .header__logo {
    margin-left: 4rem;
    height: 4.5rem;
    display: block; }

.search {
  background-color: #fff;
  border-radius: 10rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  transition: all .3s; 
  @media only screen and (max-width: $bp-small){
    margin-left: 3rem;
      width: 50%;
  }
  &__btn{
    @media only screen and (max-width: $bp-small){
      padding: 1rem;
  }
  }
}
  .search:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 0.7rem 3rem rgba(101, 90, 86, 0.08); }
  .search__field {
    border: none;
    background: none;
    font-family: inherit;
    color: inherit;
    font-size: 1.7rem;
    width: 100%; }
    .search__field:focus {
      outline: none; }
    .search__field::placeholder {
      color: #DAD0CC; }

.likes {
  position: relative;
  align-self: stretch;
  padding: 2rem;
  &__list{
    list-style: none;
  }
  &__field {
    cursor: pointer;
    padding: 0 4rem;
    display: flex;
    align-items: center;
    height: 100%;
    transition: all .3s; 
    &:hover {
      background-color: #F2EFEE; 
    }
  }
  &__panel:hover,
  &__field:hover + &__panel {
    visibility: visible;
    opacity: 1; 
  }
  &__icon {
    fill: #F59A83;
    height: 3.75rem;
    width: 3.75rem; 
  }
  &__panel {
    position: absolute;
    right: 0;
    top: 10rem;
    z-index: 10;
    padding: 2rem;
    width: 34rem;
    background-color: #fff;
    box-shadow: 0 0.8rem 5rem 2rem rgba(101, 90, 86, 0.1);
    visibility: hidden;
    opacity: 0;
    transition: all .5s .2s; 
  }
  &__link{
    &,&:link,&:visited {
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
      opacity: .4; }
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
    margin-bottom: .3rem; }
  &__author {
    font-size: 1.1rem;
    color: #968B87;
    text-transform: uppercase;
    font-weight: 600; }
  &__pages {
    margin-top: 3rem;
    padding: 0 3rem; 
    &::after {
      content: "";
      display: table;
      clear: both; }
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