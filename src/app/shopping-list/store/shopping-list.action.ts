import { Action } from '@ngrx/store';
import { Ingredients } from '../../shared/ingredients.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENT_FROM_DETAILPAGE_TO_SHOPPING_LIST =
  '[Shopping List] Add Ingredient from Detail Page to Shopping List';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredients) {}
}
export class AddIngredientsFromDetailPageToShoppingList implements Action {
  readonly type = ADD_INGREDIENT_FROM_DETAILPAGE_TO_SHOPPING_LIST;
  constructor(public payload: Ingredients[]) {}
}
export class UpdateIngredients implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredients ) {}
}
export class DeleteIngredients implements Action {
  readonly type = DELETE_INGREDIENT;
}
export class StartEditIngredients implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}
export class StopEditIngredients implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActionsType =
  | AddIngredients
  | AddIngredientsFromDetailPageToShoppingList
  | UpdateIngredients
  | DeleteIngredients
  | StartEditIngredients
  | StopEditIngredients;
