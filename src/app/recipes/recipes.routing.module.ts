import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { RecipeResolver } from './recipes.resolver.service';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesComponent } from './recipes.component';


const routes : Routes= [{
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipesEditComponent },
      {
        path: ':id',
        component: RecipesDetailComponent,
        resolve: [RecipeResolver],
      },
      {
        path: ':id/edit',
        component: RecipesEditComponent,
        resolve: [RecipeResolver],
      },
    ],
  }]
@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class RecipesRoutingModule {

}