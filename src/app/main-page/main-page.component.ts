import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputInfo} from '../model/inputInfo';
import {MockDataService} from '../_service/mock-data.service';
import {Subscription} from 'rxjs';
import {Categories} from '../model/categories';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employes} from '../model/employes';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

    public title = 'Add event';
    public eventInformation: InputInfo;
    private categoriesServiceSub: Subscription;
    private employesServiceSub: Subscription;
    public categoryList: Array<Categories>;
    public employeList: Array<Employes>;
    public loggedEmploye: Array<Employes>;
    public maxLengthDescription = 140;          // max number of characters in description
    public eventForm: FormGroup;
    public actualDate: string;
    public actualTime: string;
    public tooltipText: string;
    public addingEvent = true;

    constructor(private categoriesService: MockDataService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) {
        moment.locale('pl');
    }

    ngOnInit() {
        this.getCategories();
        this.getEmployes();
        this.actualDate = moment().format('YYYY-MM-DD');
        this.actualTime = moment().format('hh:mma');
        this.eventForm = this.formBuilder.group({       // form group for easier managing data and validations
            title: ['', Validators.required],
            description: ['', Validators.required],
            category_id: [null],
            paid_event: [false],
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

    getCategories() {   // getting categories from JSON
        this.categoriesServiceSub = this.categoriesService.getCategories().subscribe(categories => {
            this.categoryList = categories;
        });
    }

    getEmployes() {     // getting employes from JSON
        this.employesServiceSub = this.categoriesService.getEmployes().subscribe(employes => {
            this.loggedEmploye = (employes.filter(find => find.id === 3));
            this.employeList = employes.filter(filtered => filtered.id !== this.loggedEmploye[0].id);
            this.eventForm.controls.id.setValue(this.loggedEmploye[0].id);
        });
    }

    get eventFormControls() {       // for easier managing values
        return this.eventForm.controls;
    }

    addEvent() {        // adding event
        if (!this.compareTime()) {
            this.title = 'Success!';
            this.setEventInfo();
            console.log(this.eventInformation);
            this.toastr.success('Event added', 'Success!');
        } else {
            this.toastr.error('Niepoprawne dane!', 'Error!');
        }
    }

    convertDateTime() {     // converting 12h format to 24h format
        this.actualTime = moment(this.eventFormControls.time.value + this.eventFormControls.ampm.value, 'hh:mma').format('HH:mm');
    }

    compareTime() {         // comaparing if event time is not before actual time
        if (this.actualDate >= this.eventFormControls.date.value) {
            return (moment(this.eventFormControls.time.value + this.eventFormControls.ampm.value, 'hh:mma')
                .isBefore(moment(this.actualTime, 'hh:mm a')));
        } else {
            return false;
        }
    }

    watchButtonDisabled() {     // changing disable attribute of button
        if (this.eventForm.invalid) {
            this.tooltipText = 'You need to fill all mandatory fields or check email form';
            return true;
        } else if (this.compareTime()) {
            this.tooltipText = 'Event cannot be earlier than now';
            return true;
        } else if (this.checkIf12hFormat()) {
            this.tooltipText = 'Check the time format';
            return true;
        } else {
            this.tooltipText = 'Everything looks fine, add the event!';
            return false;
        }
    }

    checkIf12hFormat() {
        return this.eventFormControls.time.value > '12:59' || this.eventFormControls.time.value < '01:00';
    }

    setEventInfo() {        // setting data to our universal interface
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

    clearFee() {    // deletes validator.required and setting null value to event_fee when set 'free event'
        if (this.eventFormControls.paid_event.value === false) {
            this.eventFormControls.event_fee.clearValidators();
            this.eventFormControls.event_fee.setErrors(null);
            this.eventFormControls.event_fee.setValue(null);
        }
    }

    setFee() {      // added validator.required when set 'paid event'
        this.eventFormControls.event_fee.setValidators(Validators.required);
        console.log(this.eventFormControls.event_fee);
    }

    changeTitle() {     // changing title, when we have form - title is 'Add event', when event added successfully - title is 'Success!'
        if (this.addingEvent) {
            this.title = 'Success!';
            this.addingEvent = !this.addingEvent;
        } else {
            this.title = 'Add event';
            this.addingEvent = !this.addingEvent;
        }
    }

    ngOnDestroy() {
        this.categoriesServiceSub.unsubscribe();
        this.employesServiceSub.unsubscribe();
    }
}
