import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Hero } from '../../models/hero.model'
import { Heroes } from '../reducers/heroes.reducer'

export const selectHeroesState = createFeatureSelector<Heroes>('heroes')

export const selectHeroesData = createSelector(
    selectHeroesState,
    (heroesState) => heroesState.heroes
)

export const selectLoadingState = createFeatureSelector<Heroes>('loading')
export const selectLoading = createSelector(
    selectLoadingState,
    (heroesState) => heroesState.loading
)

export const selectHeroById = (heroId: string) =>
    createSelector(selectHeroesData, (heroes: Hero[]) =>
        heroes.find((hero) => hero.id === heroId)
    )
