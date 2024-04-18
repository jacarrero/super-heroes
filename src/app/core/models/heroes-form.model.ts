import { FormControl } from '@angular/forms'

export interface HeroesForm {
    id: FormControl<string | undefined>
    name: FormControl<string | undefined>
    age: FormControl<number | undefined>
    city: FormControl<string | undefined>
    fly: FormControl<boolean | undefined>
}
