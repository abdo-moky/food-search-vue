<template>

    <div class="shopping">
        <h2 class="heading-2">My Shopping List</h2>
        <div v-if="shoppingList === null" class="no-shopping-list">there is no shopping list</div>
        <ul v-else class="shopping__list">
            <li class="shopping__item" v-for="(item, i) in shoppingList" :key="i">
                <div class="shopping__count">
                    <input type="number" :value="item.count" :step="item.count">
                    <p>{{item.unit}}</p>
                </div>
                <p class="shopping__description">{{item.ingredient}}</p>
                <button class="shopping__delete btn-tiny" @click="deleteItem(i)">
                    <svg>
                        <use href="icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
            
        </ul>

        <div class="copyright">
            built by <a class="link" href="http://abdoeldmoky.netlify.app" target="_blank">abdo eldmoky</a> 
            but the design by Jonas Schmedtmann.
                Powered by <a href="http://food2fork.com" target="_blank" class="link">Food2Fork.com</a>.
        </div>

    </div>
</template>
<script>
import {useStore} from'vuex'
import {computed} from 'vue'
export default {
    setup(){
        const store= useStore()
        const shoppingList= computed(()=>{ return store.state.shoppingList}) 
        /* function to delete item ***********************************/
        function deleteItem(index){
            shoppingList.value.splice(index, 1)
        }
        ///////////////////////////////////////////////////////////////////
        return{
            shoppingList,
            deleteItem
        }
    }
}
</script>
<style lang="scss" >
.no-shopping-list{
    font-size: 1.5rem;
    margin: 2rem;
    text-transform: capitalize;
    @media only screen and (max-width: $bp-small){
      text-align: center;  
    }
}
.copyright {
  color: #968B87;
  font-size: 1.2rem;
  margin-top: auto; 
  @media only screen and (max-width: $bp-medium){
      margin-top: 3rem; 
      width: 50%;
      align-self: end;
  }
}
.shopping {
  @media only screen and (max-width: $bp-medium){
      grid-row: 3 / 4;
      grid-column: 1 / -1;
      justify-content: space-between;
  }
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column; 
}
  .shopping__list {
    list-style: none;
    max-height: 77rem;
    overflow: scroll; }
  .shopping__item {
    display: flex;
    align-items: flex-start;
    padding: 1.3rem 0;
    border-bottom: 1px solid #F2EFEE;
    position: relative; }
  .shopping__count {
    flex: 0 0 7.5rem;
    padding: .4rem .5rem;
    border: 1px solid #F2EFEE;
    border-radius: 3px;
    margin-right: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between; }
    .shopping__count input {
      color: inherit;
      font-family: inherit;
      font-size: 1.2rem;
      text-align: center;
      border: none;
      width: 3.7rem;
      border-radius: 3px; }
      .shopping__count input:focus {
        outline: none;
        background-color: #F2EFEE; }
    .shopping__count p {
      font-size: 1.2rem; }
  .shopping__description {
    flex: 1;
    font-size: 1.3rem;
    margin-top: .4rem;
    margin-right: 1.5rem; }
  .shopping__delete {
    margin-top: .5rem;
    color: #F48982;
    position: absolute;
    right: 0;
    width: 3.75rem;
    padding-left: 2rem;
    visibility: hidden;
    opacity: 0;
    transition: all .5s; }
  .shopping__item:hover .shopping__delete {
    opacity: 1;
    visibility: visible; }

</style>