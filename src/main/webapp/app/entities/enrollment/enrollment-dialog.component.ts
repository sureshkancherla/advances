import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enrollment } from './enrollment.model';
import { EnrollmentPopupService } from './enrollment-popup.service';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentPaymentMetaData, EnrollmentPaymentMetaDataService } from '../enrollment-payment-meta-data';
import { Agent, AgentService } from '../agent';
import { Tenant, TenantService } from '../tenant';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enrollment-dialog',
    templateUrl: './enrollment-dialog.component.html'
})
export class EnrollmentDialogComponent implements OnInit {

    enrollment: Enrollment;
    isSaving: boolean;

    ids: EnrollmentPaymentMetaData[];

    agents: Agent[];

    tenants: Tenant[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private enrollmentService: EnrollmentService,
        private enrollmentPaymentMetaDataService: EnrollmentPaymentMetaDataService,
        private agentService: AgentService,
        private tenantService: TenantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enrollmentPaymentMetaDataService
            .query({filter: 'enrollment-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.enrollment.id || !this.enrollment.id.id) {
                    this.ids = res.json;
                } else {
                    this.enrollmentPaymentMetaDataService
                        .find(this.enrollment.id.id)
                        .subscribe((subRes: EnrollmentPaymentMetaData) => {
                            this.ids = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.agentService.query()
            .subscribe((res: ResponseWrapper) => { this.agents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enrollment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enrollmentService.update(this.enrollment));
        } else {
            this.subscribeToSaveResponse(
                this.enrollmentService.create(this.enrollment));
        }
    }

    private subscribeToSaveResponse(result: Observable<Enrollment>) {
        result.subscribe((res: Enrollment) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Enrollment) {
        this.eventManager.broadcast({ name: 'enrollmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnrollmentPaymentMetaDataById(index: number, item: EnrollmentPaymentMetaData) {
        return item.id;
    }

    trackAgentById(index: number, item: Agent) {
        return item.id;
    }

    trackTenantById(index: number, item: Tenant) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-enrollment-popup',
    template: ''
})
export class EnrollmentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollmentPopupService: EnrollmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enrollmentPopupService
                    .open(EnrollmentDialogComponent as Component, params['id']);
            } else {
                this.enrollmentPopupService
                    .open(EnrollmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
