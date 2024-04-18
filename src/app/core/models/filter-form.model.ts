import { FormControl } from '@angular/forms'

export interface FilterForm {
    name: FormControl<string | undefined>
    age: FormControl<number | undefined>
    city: FormControl<string | undefined>
    fly: FormControl<boolean | undefined>
}

export interface FilterFormValue {
    name: string | undefined
    age: number | undefined
    city: string | undefined
    fly: boolean | undefined
}
