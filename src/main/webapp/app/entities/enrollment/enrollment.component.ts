import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enrollment } from './enrollment.model';
import { EnrollmentService } from './enrollment.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enrollment',
    templateUrl: './enrollment.component.html'
})
export class EnrollmentComponent implements OnInit, OnDestroy {
enrollments: Enrollment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private enrollmentService: EnrollmentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.enrollmentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.enrollments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEnrollments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Enrollment) {
        return item.id;
    }
    registerChangeInEnrollments() {
        this.eventSubscriber = this.eventManager.subscribe('enrollmentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
