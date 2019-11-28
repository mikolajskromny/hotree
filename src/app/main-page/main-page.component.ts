import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputInfo} from '../model/inputInfo';
import {CategoriesService} from '../_service/categories.service';
import {Subscription} from 'rxjs';
import {Categories} from '../model/categories';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

    public eventInformation = {} as InputInfo;
    private categoriesServiceSub: Subscription;
    public categoryList = {} as Categories;

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.getCategories();
    }

    showInputs() {
        // console.log(this.eventInformation);
    }

    getCategories() {
        this.categoriesServiceSub = this.categoriesService.getCategories().subscribe(categories => {
            this.categoryList = categories;
            console.log(this.categoryList);
            console.log(typeof this.categoryList);
        });
    }

    ngOnDestroy() {
        this.categoriesServiceSub.unsubscribe();
    }
}
