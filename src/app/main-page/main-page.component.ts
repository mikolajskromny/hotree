import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputInfo} from '../model/inputInfo';
import {MockDataService} from '../_service/mock-data.service';
import {Subscription} from 'rxjs';
import {Categories} from '../model/categories';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employes} from '../model/employes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  public eventInformation: InputInfo;
  private categoriesServiceSub: Subscription;
  private employesServiceSub: Subscription;
  public categoryList: Array<Categories>;
  public employeList: Array<Employes>;
  public loggedEmploye: Array<Employes>;
  public maxLengthDescription = 140;
  eventForm: FormGroup;

  constructor(private categoriesService: MockDataService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getCategories();
    this.getEmployes();
    this.eventForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        category_id: ['hint'],
        paid_event: [''],
        event_fee: ['', Validators.required],
        start_on: ['', Validators.required],
        responsible: [3, Validators.required],
        reward: [null],
        date: [''],
        duration: [null],
        email: ['', Validators.email],
        id: ['']
      }
    );
  }

  get f() {
    return this.eventForm.controls;
  }

  showInputs() {
    this.setEventInfo();
    console.log(this.eventInformation);
  }

  setEventInfo() {
    console.log(this.f);
    this.eventInformation = {
      title: this.f.title.value,
      description: this.f.description.value,
      category_id: this.f.category_id.value,
      paid_event: this.f.paid_event.value,
      event_fee: this.f.event_fee.value,
      reward: this.f.reward.value,
      date: this.f.date.value,
      duration: this.f.duration.value,
      coordinator: {
        email: this.f.email.value,
        id: this.f.id.value
      }
    };
  }

  getCategories() {
    this.categoriesServiceSub = this.categoriesService.getCategories().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  getEmployes() {
    this.employesServiceSub = this.categoriesService.getEmployes().subscribe(employes => {
      this.loggedEmploye = (employes.filter(find => find.id === 3));
      this.employeList = employes.filter(filtered => filtered.id !== this.loggedEmploye[0].id);
      this.eventForm.controls.responsible.setValue(this.loggedEmploye[0].id);
    });
  }

  clearFee() {
    this.f.event_fee.setValue(null);
  }


  ngOnDestroy() {
    this.categoriesServiceSub.unsubscribe();
  }
}
