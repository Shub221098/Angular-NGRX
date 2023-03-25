import { ActivatedRoute, Router } from '@angular/router';
// import { RecipesService } from './../../recipes-service';
import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes-service';
import { Recipes } from '../../recipes.model';

@Component({
  selector: 'app-recipes-items',
  templateUrl: './recipes-items.component.html',
  styleUrls: ['./recipes-items.component.css'],
})
export class RecipesItemsComponent implements OnInit {
  @Input() recipes: Recipes;
  @Input() index: number;
  // @Output() recipeSelected = new EventEmitter<void>()
  constructor(private router: Router, private route: ActivatedRoute) {}
  // onSelected() {
  //   // this.recipeSelected.emit();
  //   this.recipesService.recipeSelected.emit(this.recipes);
  // }
  // recipes: Recipes;
  ngOnInit() {
    // console.log(this.recipes)
  }
}
