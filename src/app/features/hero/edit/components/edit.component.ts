import { Component } from '@angular/core'
import {
    FormBuilder,
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
import { Hero } from '../../../../core/models/hero.model'
import { SnackbarService } from '../../../../core/services/snackbar/snackbar.service'
import { editHero } from '../../../../core/store/actions/heroes.actions'
import { Heroes } from '../../../../core/store/reducers/heroes.reducer'
import { selectHeroById } from '../../../../core/store/selectors/heroes.selector'

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatButtonModule,
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css',
})
export class EditComponent {
    editHeroForm: FormGroup
    hero: Hero | undefined

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<Heroes>,
        private snackbarService: SnackbarService
    ) {
        this.hero = undefined
        this.editHeroForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            age: ['', Validators.required],
            city: ['', Validators.required],
            fly: [false],
        })
    }

    ngOnInit(): void {
        const heroId = this.route.snapshot.params['id']
        this.store
            .pipe(select(selectHeroById(heroId)))
            .subscribe((hero: Hero | undefined) => {
                if (hero) {
                    this.hero = hero
                    this.editHeroForm.patchValue({
                        id: heroId,
                        name: hero.name.toUpperCase(),
                        age: hero.age,
                        city: hero.city,
                        fly: hero.fly,
                    })
                }
            })
    }

    navigateToHome() {
        this.router.navigate(['/'])
    }

    onSubmit(ev: Event) {
        const formValue: Hero = this.editHeroForm.getRawValue()
        if (this.editHeroForm.valid) {
            this.store.dispatch(editHero({ hero: formValue }))
        } else {
            this.snackbarService.openSnackbar(
                'Debe rellenar todos los campos',
                'error'
            )
        }
        ev.preventDefault()
    }
}
