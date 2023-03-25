import { AUTO_LOGIN } from './auth/store/auth.actions';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer'
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // featureLoaded = 'recipe';

  // onNavigate(feature: string) {
  //   this.featureLoaded = feature;
  // }
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin())
  }
}
