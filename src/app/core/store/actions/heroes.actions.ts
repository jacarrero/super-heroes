import { createAction, props } from '@ngrx/store'
import { FilterFormValue } from '../../models/filter-form.model'
import { Hero } from '../../models/hero.model'

export const loadHeroesData = createAction('[Heroes] Load Heroes')
export const loadHeroesSuccess = createAction(
    '[Heroes] Load Heroes Success',
    props<{ heroes: Hero[] }>()
)
export const loadHeroesFailure = createAction(
    '[Heroes] Load Heroes Failure',
    props<{ error: any }>()
)
export const deleteHero = createAction(
    '[Heroes] Delete Hero',
    props<{ id: string }>()
)
export const filterHeros = createAction(
    '[Heroes] Filter Heros',
    props<{ filterForm: FilterFormValue }>()
)
export const initDataHero = createAction('[Heroes] Initial Data Hero Loaded')

//Create Hero
export const createHero = createAction(
    '[Heroes] Create Hero',
    props<{ hero: Hero }>()
)
export const createHeroFailure = createAction(
    '[Heroes] Create Heroes Failure',
    props<{ error: any }>()
)
export const createHeroSuccess = createAction(
    '[Heroes] Create Heroes Success',
    props<{ hero: Hero }>()
)

//Edit Hero
export const editHero = createAction(
    '[Heroes] Edit Hero',
    props<{ hero: Hero }>()
)
export const editHeroSuccess = createAction(
    '[Heroes] Edit Hero Success',
    props<{ hero: Hero }>()
)
export const editHeroFailure = createAction(
    '[Heroes] Edit Hero Failure',
    props<{ error: any }>()
)
