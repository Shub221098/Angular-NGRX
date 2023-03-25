import { ShoppingListComponent } from './../shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './../shopping-list/shopping-edit/shopping-edit.component';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Recipes } from './recipes.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
import * as fromApp from '.././store/app.reducer';
@Injectable()
export class RecipesService {
  recipeChanged = new Subject<Recipes[]>();
  // private recipes: Recipes[] = [
  //   new Recipes(
  //     'Gulabjamun',
  //     'This most famous sweet in india',
  //     'http://www.kuldeeprai.in/wp-content/uploads/2021/08/Gulabjamun-Desi-Ghee.jpg',
  //     [new Ingredients('Meda', 20), new Ingredients('sugar', 30)]
  //   ),
  //   new Recipes(
  //     'kajukatli',
  //     'This mithai is make by dry fruits like kaju and other dry fruits also.Most Liked and gifted sweets to anybody',
  //     'https://i.ndtvimg.com/i/2017-08/kaju-barfi_650x400_71501923806.jpg',
  //     [new Ingredients('kaju', 200), new Ingredients('sugar', 30)]
  //   ),
  //   new Recipes(
  //     'rasmalai',
  //     'This is make by pure cow milk by heating on flame and stick uptil this milk will converted to malai.',
  //     'https://aromaticessence.co/wp-content/uploads/2018/05/49E95995-028D-44D2-9252-2CDA545120D8.jpeg',
  //     [new Ingredients('Milk', 200), new Ingredients('sugar', 30)]
  //   ),
  // ];
  private recipes: Recipes[] = [];
  constructor(
    private store: Store<fromApp.AppState>
  ) {}
  setRecipes(recipe: Recipes[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    // this.shoppingListService.addIngredientFromRecipes(ingredients)
    this.store.dispatch(
      new ShoppingListActions.AddIngredientsFromDetailPageToShoppingList(
        ingredients
      )
    );
  }
  addRecipe(recipe: Recipes) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipes) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
