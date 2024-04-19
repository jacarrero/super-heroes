import { provideHttpClient } from '@angular/common/http'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import 'zone.js/testing'
import { routes } from '../../../../app.routes'
import { HeroesEffects } from '../../../../core/store/effects/heroes.effects'
import { storeHeroes } from '../../../../core/store/reducers/heroes.reducer'
import { FilterComponent } from './filter.component'

describe('FilterComponent', () => {
    let component: FilterComponent
    let fixture: ComponentFixture<FilterComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FilterComponent],
            providers: [
                provideRouter(routes),
                provideAnimationsAsync(),
                provideStore(storeHeroes),
                provideEffects(HeroesEffects),
                provideHttpClient(),
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(FilterComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', async () => {
        await waitForAsync(() => component)
        expect(component).toBeTruthy()
    })
})
