import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Enrollment_Commission } from './enrollment-commission.model';
import { Enrollment_CommissionService } from './enrollment-commission.service';

@Component({
    selector: 'jhi-enrollment-commission-detail',
    templateUrl: './enrollment-commission-detail.component.html'
})
export class Enrollment_CommissionDetailComponent implements OnInit, OnDestroy {

    enrollment_Commission: Enrollment_Commission;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private enrollment_CommissionService: Enrollment_CommissionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnrollment_Commissions();
    }

    load(id) {
        this.enrollment_CommissionService.find(id).subscribe((enrollment_Commission) => {
            this.enrollment_Commission = enrollment_Commission;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnrollment_Commissions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'enrollment_CommissionListModification',
            (response) => this.load(this.enrollment_Commission.id)
        );
    }
}
