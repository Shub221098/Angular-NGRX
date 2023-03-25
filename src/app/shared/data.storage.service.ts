import { RecipesService } from './../recipes/recipes-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipes } from '../recipes/recipes.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private reciepsService: RecipesService,
    private authService: AuthService
  ) {}
  storeRecipes() {
    const recipes = this.reciepsService.getRecipes();
    this.http
      .put(
        'https://e-commerce-application-1120c-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes() {
    // const recipes = this.reciepsService.getRecipes();
    return this.http
      .get<Recipes[]>(
        'https://e-commerce-application-1120c-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipe) => {
          this.reciepsService.setRecipes(recipe);
        })
      );
  }
}
