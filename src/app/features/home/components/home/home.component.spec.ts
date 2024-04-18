import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from '../../../../app.routes';
import { HeroesEffects } from '../../../../core/store/effects/heroes.effects';
import { heroesReducer } from '../../../../core/store/reducers/heroes.reducer';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        StoreModule.forRoot()
      ],
      providers: [
        provideRouter(routes), 
        provideAnimationsAsync(), 
        provideStore(),
        provideEffects(HeroesEffects),
        provideStoreDevtools(),
        provideState({ name: 'heroes', reducer: heroesReducer }),
        provideState({ name: 'loading', reducer: heroesReducer }),
        provideState({ name: 'dataLoaded', reducer: heroesReducer }),
        provideHttpClient(),
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await waitForAsync(() => component);
    expect(component).toBeTruthy();
  });
});
