<template>

    <div v-if="recipe === null" class="no-recipe"></div>

    <div v-else class="recipe">
        <figure class="recipe__fig">
            <img :src="recipe.image_url" alt="img" class="recipe__img">
            <h1 class="recipe__title">
                <span>{{recipe.title}}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">{{time}}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">{{serving}}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny" @click="serving--">
                       <svg class="recipe__info-icon">
                            <use href="icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny" @click="serving++">
                       <svg class="recipe__info-icon">
                            <use href="icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love" @click="addItemToLikes">
                <svg class="header__likes">
                    <use href="icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">

                <li class="recipe__item" v-for="(ing, i) in recipe.ingredients" :key="i">
                    <svg class="recipe__icon">
                        <use href="icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__count">{{ing.count}}</div>
                    <div class="recipe__ingredient">
                        <span class="recipe__unit">{{ing.unit}}</span>
                        {{ing.ingredient}}
                    </div>
                </li>

            </ul>

            <button class="btn-small recipe__btn" @click="addItem">
                <svg class="search__icon">
                    <use href="icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" :href="recipe.source_url" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
   
    </div>

</template>
<script>
import { computed , watch, ref} from 'vue'
import {useStore} from 'vuex'
export default {
    setup(){
        const store= useStore()
        const recipe= computed(()=>{
            return store.state.selectedRecipe
        })
        /* serving and time ?**************************************************** */
        const time= computed(()=>{
            const numIngr = recipe.value.ingredients.length;
            const period = Math.ceil(numIngr / 3);
            return period * 15
        })
        const serving= ref(4)

        watch(recipe, (recipe, oldRec)=>{
            parseIngredients()
        })
        watch(serving, (serving, oldServ)=>{
            recipe.value.ingredients.forEach(ing => {
                ing.count *= (serving / oldServ);
            })
        })
        /* add item to shopping list************************************ */
        function addItem(){
            store.commit('addItemToSl')
        }

        function addItemToLikes(){
            store.commit('addItemToLikes')
        }
        /* parse ingredients****************************************** */

        function parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = recipe.value.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        recipe.value.ingredients = newIngredients;
    }
        ////////////////////////////////////////////////////////////////////
        return{
            recipe,
            serving,
            time,
            addItem,
            addItemToLikes
        }
    }
}
</script>
<style lang="scss" scoped>
.no-recipe{
  background-image: linear-gradient(to right bottom, #FBDB89, #F48982);
  @media only screen and (max-width: $bp-medium){
      grid-column: 2 / -1;
  }
}
</style>