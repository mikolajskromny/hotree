import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputInfo} from '../model/inputInfo';
import {MockDataService} from '../_service/mock-data.service';
import {Subscription} from 'rxjs';
import {Categories} from '../model/categories';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employes} from '../model/employes';
import * as moment from 'moment';

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
  public eventForm: FormGroup;
  public actualDate: string;
  public actualTime: string;

  constructor(private categoriesService: MockDataService,
              private formBuilder: FormBuilder) {
    moment.locale('pl');
  }

  ngOnInit() {
    this.getCategories();
    this.getEmployes();
    this.actualDate = moment().format('YYYY-MM-DD');
    this.actualTime = moment().format('hh:mma');
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category_id: [null],
      paid_event: [true],
      event_fee: [null, Validators.required],
      reward: [null],
      date: [this.actualDate],
      time: [this.actualTime.slice(0, -2)],
      ampm: [this.actualTime.slice(-2)],
      duration: [null],
      email: ['', Validators.email],
      id: [3, Validators.required]
    });
  }

  get eventFormControls() {
    return this.eventForm.controls;
  }

  showInputs() {
    if (!this.compareTime()) {
      this.setEventInfo();
      console.log(this.eventInformation);
    } else {
      alert('Niepoprawne dane!');                       // TODO: dorobic toastr do komunikatów
    }
  }

  convertDateTime() {
    this.actualTime = moment(this.eventFormControls.time.value + this.eventFormControls.ampm.value, 'hh:mma').format('HH:mm');
  }

  compareTime() {
    if (this.actualDate >= this.eventFormControls.date.value) {
      return (moment(this.eventFormControls.time.value + this.eventFormControls.ampm.value, 'hh:mma')
        .isBefore(moment(this.actualTime, 'hh:mm a')));
    } else {
      return false;
    }
  }

  setEventInfo() {
    this.convertDateTime();
    this.eventInformation = {
      title: this.eventFormControls.title.value,
      description: this.eventFormControls.description.value,
      category_id: this.eventFormControls.category_id.value,
      paid_event: this.eventFormControls.paid_event.value,
      event_fee: this.eventFormControls.event_fee.value,
      reward: this.eventFormControls.reward.value,
      date: (this.eventFormControls.date.value + 'T' + this.actualTime),
      duration: (this.eventFormControls.duration.value * 3600),
      coordinator: {
        email: this.eventFormControls.email.value,
        id: this.eventFormControls.id.value
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
      this.eventForm.controls.id.setValue(this.loggedEmploye[0].id);
    });
  }

  clearFee() {
    this.eventFormControls.event_fee.setValue(null);
    this.eventFormControls.event_fee.setErrors(null);
  }


  ngOnDestroy() {
    this.categoriesServiceSub.unsubscribe();
  }
}
