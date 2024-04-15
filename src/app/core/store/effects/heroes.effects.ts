import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes/heroes.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import * as HeroesActions from '../actions/heroes.actions';

@Injectable()
export class HeroesEffects {
  loadHeroesData$ = createEffect(() => this.actions$.pipe(
    ofType(HeroesActions.loadHeroesData),
    switchMap(() =>
      this.heroesService.getHeroes().pipe(
        delay(2500),
        map(heroes => HeroesActions.loadHeroesSuccess({ heroes })),
        catchError(error => of(HeroesActions.loadHeroesFailure({ error })))
      )
    )
  ));

  createHero$ = createEffect(() => this.actions$.pipe(
    ofType(HeroesActions.createHero),
    mergeMap(({ hero }) =>
      this.heroesService.createHero(hero).pipe(
        map(() => HeroesActions.createHeroSuccess({ hero })),
        catchError(error => of(HeroesActions.createHeroFailure({ error })))
      )
    ),
    tap(() => {
      this.router.navigate(['/']);
      return of(this.snackbarService.openSnackbar('Héroe creado exitosamente', 'success'));
    })
  ));

  editHero$ = createEffect(() => this.actions$.pipe(
    ofType(HeroesActions.editHero),
    mergeMap(({ hero }) =>
      this.heroesService.editHero(hero).pipe(
        map((updatedHero) => HeroesActions.editHeroSuccess({ hero: updatedHero })),
        catchError(error => of(HeroesActions.editHeroFailure({ error })))
      )
    ),
    tap(() => {
      this.router.navigate(['/']);
      return of(this.snackbarService.openSnackbar('Héroe modificado exitosamente', 'success'));
    })
  ));

  constructor(
    private actions$: Actions,
    private heroesService: HeroesService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
}