import * as fromApp from './../store/app.reducer';
import { ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AlertComponent } from './../shared/alert/alert.component';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { PlaceHolderDirective } from '../shared/placeHolderDirective/placeholder.Directive';
import { Store } from '@ngrx/store';
import * as AuthActions from '.././auth/store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | any;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode; // always changes value to false and true
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    if (this.isLoginMode) {
      // authObs = this.authService.login(form.value.email, form.value.password);
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: form.value.email,
          password: form.value.password,
        })
      );
    } else {
      // authObs = this.authService.signUp(form.value.email, form.value.password);
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: form.value.email,
          password: form.value.password,
        })
      );
    }
    // authObs.subscribe(
    //   (respData) => {
    //     console.log(respData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errMessage) => {
    //     console.log(errMessage);
    //     this.error = errMessage;
    //     // this.error= 'An error occurred';
    //     this.showErrorAlert(errMessage);
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }
  onHandlingError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
  // Error Handling via making component programmatically and show this to dom without creating component manually.
  private showErrorAlert(message: string) {
    //with the help of component factory resolver you get access to the componentFactory
    // componentfactory resolver has resovle component factory method of type AlertComponenet to create AlertComponentFactory</AuthResponseData.
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // Now we create a concrete component but for that we also need a place where we can attach it into dom right now we dont have it
    // For this we have ViewContainerRef. it essentially an object managed by angular, which gives angular a reference to dom
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // clear this component reference to remove preivous values add new after
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
