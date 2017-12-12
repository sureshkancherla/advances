import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enrollment_Commission } from './enrollment-commission.model';
import { Enrollment_CommissionService } from './enrollment-commission.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enrollment-commission',
    templateUrl: './enrollment-commission.component.html'
})
export class Enrollment_CommissionComponent implements OnInit, OnDestroy {
enrollment_Commissions: Enrollment_Commission[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private enrollment_CommissionService: Enrollment_CommissionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.enrollment_CommissionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.enrollment_Commissions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEnrollment_Commissions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Enrollment_Commission) {
        return item.id;
    }
    registerChangeInEnrollment_Commissions() {
        this.eventSubscriber = this.eventManager.subscribe('enrollment_CommissionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
