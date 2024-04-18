import { createReducer, on } from '@ngrx/store'
import { Hero } from '../../models/hero.model'
import * as HeroesActions from '../actions/heroes.actions'

export interface Heroes {
    heroes: Hero[]
    loading: boolean
    error: any
}

const initialState: Heroes = {
    heroes: [],
    loading: false,
    error: null,
}

export const heroesReducer = createReducer(
    initialState,
    on(HeroesActions.initState, (state) => ({
        ...state,
        loading: true,
    })),
    on(HeroesActions.loadHeroesData, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(HeroesActions.loadHeroesSuccess, (state, { heroes }) => ({
        ...state,
        heroes,
        originalDataHero: [...heroes],
        loading: false,
    })),
    on(HeroesActions.loadHeroesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(HeroesActions.deleteHero, (state, { id }) => ({
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== id),
        originalDataHero: state.heroes.filter((hero) => hero.id !== id),
        loading: false,
    })),
    on(HeroesActions.filterHeros, (state, { filterForm }) => ({
        ...state,
        heroes: Object.values(filterForm).every((value) => value === null)
            ? state.heroes
            : [...state.heroes.filter((hero) => {
                  return (
                      (filterForm?.name &&
                          hero.name
                              .toLocaleLowerCase()
                              .includes(
                                  filterForm.name.toLowerCase() as string
                              )) ||
                      (filterForm?.age && hero.age === filterForm.age) ||
                      (filterForm?.city &&
                          hero.city
                              .toLowerCase()
                              .includes(
                                  (filterForm.city as string).toLowerCase()
                              )) ||
                      hero.fly === filterForm.fly
                  )
              })],
        loading: false,
    })),
    on(HeroesActions.createHero, (state, { hero }) => ({
        ...state,
        heroes: [...state.heroes, hero],
        loading: false,
    })),
    on(HeroesActions.editHeroSuccess, (state, { hero }) => ({
        ...state,
        heroes: state.heroes.map((h) => (h.id === hero.id ? hero : h)),
        originalDataHero: state.heroes.map((h) =>
            h.id === hero.id ? hero : h
        ),
    }))
)

export const storeHeroes = {
    heroes: heroesReducer,
    loading: heroesReducer,
    error: heroesReducer,
}
