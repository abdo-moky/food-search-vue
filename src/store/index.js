import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    rec: [], 
    selectedRecipe: null,
    shoppingList: null,
    likes: [],
    loading: false
  },
  mutations: {
    openRecipe(state, payload){
      state.selectedRecipe= payload
      //console.log(state.selectedRecipe)
      //console.log(payload)
    },
    addItemToSl(state){
        state.shoppingList= state.selectedRecipe.ingredients.slice(0)
    },
    addItemToLikes(state){
      const index= state.likes.findIndex(el=> el.recipe_id === state.selectedRecipe.recipe_id )
      
      if(index === -1){
        state.likes.push(state.selectedRecipe)
      }else{
        state.likes.splice(index, 1)
      }
      console.log(state.likes)
    }
    /* selectRecipe(state,payload){
      state.selectedRecipe= state.rec.find(el=>{
        return el.recipe_id === payload
      })
      console.log(state.selectedRecipe)
    } */
  },
  actions: {
    /* get the search request ///////////////////////////////////////////////// */
    async getResults(context,payload){
      context.state.loading= true
      try{
          const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${payload}`);
          context.state.loading= false
          context.state.rec = res.data.recipes;
      }catch (error){
        context.state.loading= false
          console.log(error);
      }
    },
    /* get theselected recipe */
    async getRecipe(context,payload){
      context.state.loading= true
      try{
        const rec = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${payload}`)
        context.state.loading= false
        context.state.selectedRecipe = rec.data.recipe;
        //console.log(context.state.selectedRecipe)
      }catch (error){
        context.state.loading= false
          console.log(error);
      }
    }
  },
  modules: {
  },
  getters:{
    loading(state){
      return state.loading
    }
  }
})
