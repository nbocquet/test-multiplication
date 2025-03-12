import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { testFeature } from '@classe-a-deux/test';
import * as effects from '@classe-a-deux/test/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore(),
    provideState(testFeature),
    provideEffects(effects),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
