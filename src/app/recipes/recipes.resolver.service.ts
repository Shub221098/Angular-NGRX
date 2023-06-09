import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data.storage.service';
import { RecipesService } from './recipes-service';
import { Recipes } from './recipes.model';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipes[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
