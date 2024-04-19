import { provideHttpClient } from '@angular/common/http'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { jest } from '@jest/globals'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import 'zone.js/testing'
import { routes } from '../../../../app.routes'
import { HeroesEffects } from '../../../../core/store/effects/heroes.effects'
import { storeHeroes } from '../../../../core/store/reducers/heroes.reducer'
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
                provideStore(storeHeroes),
                provideEffects(HeroesEffects),
                provideStoreDevtools(),
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
    /**
     * EN ESTA VERSION DE ANGULAR EXISTE UN BUG AL RESETEAR EL FORMULARIO: 
     * https://github.com/angular/angular/issues/47027
     * TODO: Descomentar en cuanto se suba fix
     */
    // it('should reset the form when resetCreateForm() is called', () => {
    //     component.createForm.setValue({
    //         id: '1',
    //         name: 'Superman',
    //         age: 30,
    //         city: 'Metropolis',
    //         fly: true,
    //     })
    //     component.resetCreateForm()
    //     console.log(component.createForm.value)
    //     expect(component.createForm.value).toEqual({
    //         id: undefined,
    //         name: undefined,
    //         age: undefined,
    //         city: undefined,
    //         fly: undefined,
    //     })
    // })

    it('should navigate to home when navigateToHome() is called', () => {
        const navigateSpy = jest.spyOn((<any>component).router, 'navigate')
        component.navigateToHome()
        expect(navigateSpy).toHaveBeenCalledWith(['/'])
    })
})
