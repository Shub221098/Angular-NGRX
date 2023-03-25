import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from '../recipes-service';
import { Recipes } from '../recipes.model';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipes>();
  // recipes: Recipes[] = [
  //   new Recipes(
  //     'Gulabjamun',
  //     'This most famous sweet in india',
  //     'http://www.kuldeeprai.in/wp-content/uploads/2021/08/Gulabjamun-Desi-Ghee.jpg'
  //   ),
  // ];
  recipes: Recipes[];
  subscription: Subscription;
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.subscription = this.recipesService.recipeChanged.subscribe(
      (recipe: Recipes[]) => {
        this.recipes = recipe;
      }
    );
    this.recipes = this.recipesService.getRecipes();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // onRecipeSelected(recipe: Recipes) {
  //   this.recipeWasSelected.emit(recipe);
  // }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
