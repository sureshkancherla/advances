import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enrollment_Payment_MetaData } from './enrollment-payment-meta-data.model';
import { Enrollment_Payment_MetaDataService } from './enrollment-payment-meta-data.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enrollment-payment-meta-data',
    templateUrl: './enrollment-payment-meta-data.component.html'
})
export class Enrollment_Payment_MetaDataComponent implements OnInit, OnDestroy {
enrollment_Payment_MetaData: Enrollment_Payment_MetaData[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private enrollment_Payment_MetaDataService: Enrollment_Payment_MetaDataService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.enrollment_Payment_MetaDataService.query().subscribe(
            (res: ResponseWrapper) => {
                this.enrollment_Payment_MetaData = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEnrollment_Payment_MetaData();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Enrollment_Payment_MetaData) {
        return item.id;
    }
    registerChangeInEnrollment_Payment_MetaData() {
        this.eventSubscriber = this.eventManager.subscribe('enrollment_Payment_MetaDataListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
