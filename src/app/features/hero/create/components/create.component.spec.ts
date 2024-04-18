import { provideHttpClient } from '@angular/common/http'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import 'zone.js/testing'
import { routes } from '../../../../app.routes'
import { HeroesEffects } from '../../../../core/store/effects/heroes.effects'
import { heroesReducer } from '../../../../core/store/reducers/heroes.reducer'
import { CreateComponent } from './create.component'

describe('CreateComponent', () => {
    let component: CreateComponent
    let fixture: ComponentFixture<CreateComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateComponent],
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
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(CreateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', async () => {
        await waitForAsync(() => component)
        expect(component).toBeTruthy()
    })
})