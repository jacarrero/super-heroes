import { Component, Input, OnInit } from '@angular/core'
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { FormType } from '../../../../core/models/form-type.enum'
import { Hero } from '../../../../core/models/hero.model'
import { HeroesForm } from '../../../../core/models/heroes-form.model'
import { SnackbarService } from '../../../../core/services/snackbar/snackbar.service'
import {
    createHero,
    editHero,
} from '../../../../core/store/actions/heroes.actions'
import { Heroes } from '../../../../core/store/reducers/heroes.reducer'
import { selectHeroById } from '../../../../core/store/selectors/heroes.selector'

@Component({
    selector: 'app-hero-form',
    standalone: true,
    imports: [
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatButtonModule,
    ],
    templateUrl: './hero-form.component.html',
    styleUrl: './hero-form.component.css',
})
export class HeroFormComponent implements OnInit {
    formType = FormType
    heroForm: FormGroup = new FormGroup<HeroesForm>({
        id: new FormControl(undefined, { nonNullable: true }),
        name: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
        age: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
        city: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
        fly: new FormControl(undefined, {
            nonNullable: true,
            validators: [Validators.required],
        }),
    })

    @Input() type: FormType

    constructor(
        private snackbarService: SnackbarService,
        private store: Store<Heroes>,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.type = FormType.NOT_INIT
    }

    ngOnInit() {
        if (this.type === this.formType.EDIT) {
            const heroId = this.route.snapshot.params['id']
            this.store
                .pipe(select(selectHeroById(heroId)))
                .subscribe((hero: Hero | undefined) => {
                    if (hero) {
                        this.heroForm.patchValue(hero)
                    }
                })
        }
    }

    onSubmit(ev: Event) {
        const formValue: Hero = this.heroForm.getRawValue()
        if (this.heroForm.valid) {
            switch (this.type) {
                case this.formType.EDIT:
                    this.store.dispatch(editHero({ hero: formValue }))
                    break
                case this.formType.CREATE:
                    this.store.dispatch(createHero({ hero: formValue }))
                    break
                default:
                    break
            }
        } else {
            this.snackbarService.openSnackbar(
                'Debe rellenar todos los campos',
                'error'
            )
        }
        ev.preventDefault()
    }

    resetCreateForm() {
        this.heroForm.reset({
            id: undefined,
            name: undefined,
            age: undefined,
            city: undefined,
            fly: undefined,
        })
    }

    navigateToHome() {
        this.router.navigate(['/'])
    }
}
