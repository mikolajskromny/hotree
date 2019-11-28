import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories} from '../model/categories';
import {apiURL} from '../model/apiUrl';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) {
    }

    getCategories() {
        return this.http.get<Categories>(`${apiURL}categories.json`);
    }
}
