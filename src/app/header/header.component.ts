import { Logout } from './../auth/store/auth.actions';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data.storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '.././store/app.reducer'
import * as AuthAction from '../auth/store/auth.actions'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService, private store : Store<fromApp.AppState>
  ) {}
  ngOnInit() {
    this.store.select('auth').pipe(map(authState => authState.user)).subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.store.dispatch(new AuthAction.Logout())
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
