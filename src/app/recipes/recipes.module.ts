import { RecipesRoutingModule } from './recipes.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesItemsComponent } from './recipes-list/recipes-items/recipes-items.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemsComponent,
    RecipeStartComponent,
    RecipesEditComponent,
  ],
  imports : [RouterModule, CommonModule, ReactiveFormsModule, RecipesRoutingModule],
})
export class RecipeModule {}
