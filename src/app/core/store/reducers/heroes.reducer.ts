import { createReducer, on } from '@ngrx/store'
import { Hero } from '../../models/hero.model'
import * as HeroesActions from '../actions/heroes.actions'

export interface State {
    heroes: Hero[]
    originalDataHero: Hero[]
    loading: boolean
    dataLoaded: boolean
    error: any
}

const initialState: State = {
    heroes: [],
    originalDataHero: [],
    loading: false,
    dataLoaded: false,
    error: null,
}

export const heroesReducer = createReducer(
    initialState,
    on(HeroesActions.loadHeroesData, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(HeroesActions.loadHeroesSuccess, (state, { heroes }) => ({
        ...state,
        heroes,
        originalDataHero: [...heroes],
        dataLoaded: true,
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
            ? state.originalDataHero
            : state.originalDataHero.filter((hero) => {
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
              }),
        loading: false,
    })),
    on(HeroesActions.initDataHero, (state) => ({
        ...state,
        heroes: [...state.originalDataHero],
        loading: false,
    })),
    on(HeroesActions.createHero, (state, { hero }) => ({
        ...state,
        heroes: [...state.originalDataHero, hero],
        originalDataHero: [...state.originalDataHero, hero],
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
