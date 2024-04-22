import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { FilterForm } from '../../models/filter-form.model'
import { Hero } from '../../models/hero.model'

@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    private mocksUrl = environment.baseUrl

    constructor(private http: HttpClient) {}

    getHeroes() {
        return this.http.get<Hero[]>(this.mocksUrl)
    }

    filterHeroes(filterForm: FilterForm): Observable<Hero[]> {
        return this.getHeroes().pipe(
            map((heroes) => {
                return heroes.filter((hero) => {
                    let match = true
                    if (
                        filterForm.name.value &&
                        !hero.name
                            .toLowerCase()
                            .includes(filterForm.name.value.toLowerCase())
                    ) {
                        match = false
                    }
                    if (
                        filterForm.city.value &&
                        !hero.name
                            .toLowerCase()
                            .includes(filterForm.city.value.toLowerCase())
                    ) {
                        match = false
                    }
                    if (
                        filterForm.age.value &&
                        hero.age !== filterForm.age.value
                    ) {
                        match = false
                    }
                    if (hero.fly !== filterForm.fly.value) {
                        match = false
                    }
                    return match
                })
            })
        )
    }

    createHero(hero: Hero): Observable<Hero> {
        const newHero: Hero = {
            name: hero.name,
            age: hero.age,
            city: hero.city,
            fly: hero.fly,
        }
        return this.http.post<Hero>(this.mocksUrl, newHero)
    }

    editHero(id: string, hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(`${this.mocksUrl}/${id}`, hero)
    }

    deleteHero(id: string): Observable<Hero> {
        return this.http.delete<Hero>(`${this.mocksUrl}/${id}`)
    }
}
