import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Hero } from '../../models/hero.model'
import { State } from '../reducers/heroes.reducer'

export const selectHeroesState = createFeatureSelector<State>('heroes')

export const selectHeroesData = createSelector(
    selectHeroesState,
    (heroesState) => heroesState.heroes
)

export const selectLoadingState = createFeatureSelector<State>('loading')
export const selectLoading = createSelector(
    selectLoadingState,
    (heroesState) => heroesState.loading
)

export const selectDataLoadedState = createFeatureSelector<State>('dataLoaded')
export const selectDataLoaded = createSelector(
    selectDataLoadedState,
    (heroesState) => heroesState.dataLoaded
)

export const selectHeroById = (heroId: string) =>
    createSelector(selectHeroesData, (heroes: Hero[]) =>
        heroes.find((hero) => hero.id === heroId)
    )
