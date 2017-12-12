import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Enrollment_Payment_MetaData } from './enrollment-payment-meta-data.model';
import { Enrollment_Payment_MetaDataService } from './enrollment-payment-meta-data.service';

@Component({
    selector: 'jhi-enrollment-payment-meta-data-detail',
    templateUrl: './enrollment-payment-meta-data-detail.component.html'
})
export class Enrollment_Payment_MetaDataDetailComponent implements OnInit, OnDestroy {

    enrollment_Payment_MetaData: Enrollment_Payment_MetaData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enrollment_Payment_MetaDataService: Enrollment_Payment_MetaDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnrollment_Payment_MetaData();
    }

    load(id) {
        this.enrollment_Payment_MetaDataService.find(id).subscribe((enrollment_Payment_MetaData) => {
            this.enrollment_Payment_MetaData = enrollment_Payment_MetaData;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnrollment_Payment_MetaData() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enrollment_Payment_MetaDataListModification',
            (response) => this.load(this.enrollment_Payment_MetaData.id)
        );
    }
}
