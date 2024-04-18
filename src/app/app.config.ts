import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient } from '@angular/common/http'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideEffects } from '@ngrx/effects'
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { routes } from './app.routes'
import { HeroesEffects } from './core/store/effects/heroes.effects'
import { heroesReducer } from './core/store/reducers/heroes.reducer'

export const appConfig: ApplicationConfig = {
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
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: { hasBackdrop: false },
        },
    ],
}
