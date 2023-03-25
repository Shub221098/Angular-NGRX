import { AddIngredients } from './../store/shopping-list.action';
import { Subscription } from 'rxjs';
import { Ingredients } from './../../shared/ingredients.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '.././store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  f: NgForm;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredients | any;
  subscription: Subscription;
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredients>();
  @ViewChild('f') editShoppingList: NgForm;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1 ){
        this.editMode = true;
        // this.editedItemIndex = stateData.editedIngredientIndex;
        this.editedItem = stateData.editedIngredient;
        this.editShoppingList.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }else {
        this.editMode = false;
      }
    })
    // this.subscription = this.shoppingListService.editShoppingList.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppingListService.getIngredient(
    //       this.editedItemIndex
    //     );
    //     this.editShoppingList.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }
    // );
  }

  // onAddItem() {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredients(ingName, ingAmount);
  //   // this.ingredientAdded.emit(newIngredient);
  //   this.shoppingListService.addIngredient(newIngredient);
  // }
  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(
      //   this.editedItemIndex,
      //   newIngredient
      // );
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredients(
          // index: this.editedItemIndex,
          newIngredient,
        )
      );
    } else {
      // this.ingredientAdded.emit(newIngredient);
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(
        new ShoppingListActions.AddIngredients(newIngredient)
      );
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.editShoppingList.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditIngredients());
  }
  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredients()
    );
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditIngredients());
  }
}
