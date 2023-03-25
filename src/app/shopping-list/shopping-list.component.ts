import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '.././shopping-list/store/shopping-list.reducers'
import * as fromApp from '.././store/app.reducer'
import * as ShoppingListActions from '.././shopping-list/store/shopping-list.action'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredients[] = [
  //   new Ingredients('Apples', 5),
  //   new Ingredients('Tomotoes', 10),
  // ];

  // onIngredientAdded(ingredient: Ingredients) {
  //   this.ingredients.push(ingredient);
  // }
  ingredients: Observable<fromShoppingList.State>;
  constructor(
    private store: Store<fromApp.AppState >
  ) {}
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredients[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }
  onEditItem(index: number) {
    // this.shoppingListService.editShoppingList.next(index);
    this.store.dispatch(new ShoppingListActions.StartEditIngredients(index))
  }
}
