<template>
  <div class="container">
    <the-header></the-header>
    <the-result></the-result>
    <the-recipe></the-recipe>
    <the-shopping-list></the-shopping-list>
  </div>
</template>

<script>
import theHeader from './components/theHeader.vue'
import theResult from './components/theResult'
import theRecipe from './components/theRecipe'
import theShoppingList from './components/theShoppingList'
import TheShoppingList from './components/theShoppingList.vue'
export default {
  components:{
    'the-header': theHeader,
    'the-result': theResult,
    'the-recipe': theRecipe,
    'the-shopping-list': theShoppingList,
    TheShoppingList
  }
}
</script>

<style lang="scss">
//break points
$bp-large: 62.5em;   // 1000px
$bp-medium: 50em;    // 800px;
$bp-small: 37.5em;    // 600px;
$bp-smallest: 25em;   // 400px;
//////////////////////////////////

* {
  margin: 0;
  padding: 0; }

*,
*::before,
*::after {
  box-sizing: inherit; }

html {
  box-sizing: border-box;
  font-size: 62.5%;
    @media only screen and (max-width: $bp-large){
        font-size: 56.25%;
    }
    @media only screen and (max-width: $bp-medium){
        font-size: 50%;
    }
    @media only screen and (max-width: $bp-small){
        font-size: 43.75%;
    }
    @media only screen and (max-width: $bp-smallest){
        font-size: 37.50%;
    } 
}

body {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: #655A56;
  background-image: linear-gradient(to right bottom, #FBDB89, #F48982);
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.container {
  max-width: 120rem;
  margin: 4vw auto;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2rem 6rem 0.5rem rgba(101, 90, 86, 0.2);
  display: grid;
  grid-template-rows: 10rem minmax(100rem, auto);
  grid-template-columns: 1.1fr 2fr 1.1fr;
  grid-template-areas: "head head head" "list recipe shopping"; 
  @media only screen and (max-width: $bp-large){
      max-width: 100vw;
      margin: 0;    
  }
  @media only screen and (max-width: $bp-medium){
      grid-template-rows: 10rem minmax(100rem, auto) minmax(30rem, auto);
      grid-template-columns: 1fr 3fr 1fr;
  }
}

.btn, .btn-small, .btn-small:link, .btn-small:visited {
  background-image: linear-gradient(to right bottom, #FBDB89, #F48982);
  border-radius: 10rem;
  border: none;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all .2s; }
  .btn:hover, .btn-small:hover {
    transform: scale(1.05); }
  .btn:focus, .btn-small:focus {
    outline: none; }
  .btn > *:first-child, .btn-small > *:first-child {
    margin-right: 1rem; }

.btn {
  padding: 1.3rem 3rem;
  font-size: 1.4rem; }
  .btn svg {
    height: 2.25rem;
    width: 2.25rem;
    fill: currentColor; }

.btn-small, .btn-small:link, .btn-small:visited {
  font-size: 1.3rem;
  padding: 1rem 1.75rem;
  text-decoration: none; }
  .btn-small svg, .btn-small:link svg, .btn-small:visited svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: currentColor; }

.btn-inline {
  color: #F59A83;
  font-size: 1.2rem;
  border: none;
  background-color: #F9F5F3;
  padding: .8rem 1.2rem;
  border-radius: 10rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all .2s; }
  .btn-inline svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: currentColor;
    margin: 0 .2rem; }
  .btn-inline span {
    margin: 0 .4rem; }
  .btn-inline:hover {
    color: #F48982;
    background-color: #F2EFEE; }
  .btn-inline:focus {
    outline: none; }

.btn-tiny {
  height: 1.75rem;
  width: 1.75rem;
  border: none;
  background: none;
  cursor: pointer; }
  .btn-tiny svg {
    height: 100%;
    width: 100%;
    fill: #F59A83;
    transition: all .3s; }
  .btn-tiny:focus {
    outline: none; }
  .btn-tiny:hover svg {
    fill: #F48982;
    transform: translateY(-1px); }
  .btn-tiny:active svg {
    fill: #F48982;
    transform: translateY(0); }
  .btn-tiny:not(:last-child) {
    margin-right: .3rem; }

  
  
.heading-2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #F59A83;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  text-align: center;
  transform: skewY(-3deg); }



.link:link,
.link:visited {
  color: #968B87; 
  font-size: 1.2rem;
  text-transform: capitalize;
}

.loader {
  margin: 5rem auto;
  text-align: center; }
  .loader svg {
    height: 5.5rem;
    width: 5.5rem;
    fill: #F59A83;
    transform-origin: 44% 50%;
    animation: rotate 1.5s infinite linear; }

@keyframes rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }




.recipe {
  background-color: #F9F5F3;
  border-top: 1px solid #fff; 
  @media only screen and (max-width: $bp-medium){
      grid-column: 2 / -1;
  }
}
  .recipe__fig {
    height: 30rem;
    position: relative;
    transform: scale(1.04) translateY(-1px);
    transform-origin: top; }
    .recipe__fig::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(to right bottom, #FBDB89, #F48982);
      opacity: .6; }
  .recipe__img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover; }
  .recipe__title {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 20%) skewY(-6deg);
    color: #fff;
    font-weight: 700;
    font-size: 2.75rem;
    text-transform: uppercase;
    width: 70%;
    line-height: 1.95;
    text-align: center; }
    .recipe__title span {
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      padding: 1.3rem 2rem;
      background-image: linear-gradient(to right bottom, #FBDB89, #F48982); }
  .recipe__details {
    display: flex;
    align-items: center;
    padding: 8rem 3rem 3rem 3rem; }
  .recipe__info {
    font-size: 1.5rem;
    text-transform: uppercase;
    display: flex;
    align-items: center; }
    .recipe__info:not(:last-child) {
      margin-right: 4rem;
      @media only screen and (max-width: $bp-medium){
        margin-right: 2rem;
      }
    }
  .recipe__info-icon {
    height: 2rem;
    width: 2rem;
    fill: #F59A83;
    margin-right: 1rem; }
  .recipe__info-data {
    margin-right: .4rem;
    font-weight: 600; }
  .recipe__info-buttons {
    display: flex;
    margin-left: 1.5rem;
    visibility: hidden;
    opacity: 0;
    transform: translateY(5px);
    transition: all .4s; }
  .recipe:hover .recipe__info-buttons {
    visibility: visible;
    opacity: 1;
    transform: translateY(0); }
  .recipe__love {
    background-image: linear-gradient(to right bottom, #FBDB89, #F48982);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    height: 4.5rem;
    width: 4.5rem;
    margin-left: auto;
    transition: all .2s;
    display: flex;
    align-items: center;
    justify-content: center; }
    .recipe__love:hover {
      transform: scale(1.07); }
    .recipe__love:focus {
      outline: none; }
    .recipe__love svg {
      height: 2.75rem;
      width: 2.75rem;
      fill: #fff; }
  .recipe__ingredients {
    padding: 4rem 5rem;
    font-size: 1.5rem;
    line-height: 1.4;
    background-color: #F2EFEE;
    display: flex;
    flex-direction: column;
    align-items: center; }
  .recipe__ingredient-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
    grid-row-gap: 2.5rem;
    list-style: none;
    margin-bottom: 3rem; }
  .recipe__item {
    display: flex; }
  .recipe__icon {
    height: 1.8rem;
    width: 1.8rem;
    fill: #F59A83;
    border: 1px solid #F59A83;
    border-radius: 50%;
    padding: 2px;
    margin-right: 1rem;
    flex: 0 0 auto;
    margin-top: .1rem; }
  .recipe__count {
    margin-right: .5rem;
    flex: 0 0 auto; }
  .recipe__directions {
    padding: 4rem;
    padding-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center; }
  .recipe__directions-text {
    font-size: 1.5rem;
    text-align: center;
    width: 90%;
    margin-bottom: 3rem;
    color: #968B87; }
  .recipe__by {
    font-weight: 700; }


</style>
