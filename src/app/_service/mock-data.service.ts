import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories} from '../model/categories';
import {apiURL} from '../model/apiUrl';
import {Employes} from '../model/employes';

@Injectable({
    providedIn: 'root'
})
export class MockDataService {

    constructor(private http: HttpClient) {
    }

    getCategories() {
        return this.http.get<Categories[]>(`${apiURL}categories.json`);
    }

    getEmployes() {
        return this.http.get<Array<Employes>>(`${apiURL}employes.json`);
    }
}
