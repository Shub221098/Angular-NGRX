// import { RecipesService } from './recipes-service';
import { Component, OnInit } from '@angular/core';
import { Recipes } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  // selectedRecipe: Recipes;
  // constructor(private recipesService: RecipesService) {}
  // ngOnInit() {
  //   this.recipesService.recipeSelected.subscribe((recipe: Recipes) => {
  //     this.selectedRecipe = recipe;
  //   });
  // }
}
