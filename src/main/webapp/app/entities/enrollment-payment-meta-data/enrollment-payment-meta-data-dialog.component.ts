import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enrollment_Payment_MetaData } from './enrollment-payment-meta-data.model';
import { Enrollment_Payment_MetaDataPopupService } from './enrollment-payment-meta-data-popup.service';
import { Enrollment_Payment_MetaDataService } from './enrollment-payment-meta-data.service';
import { Enrollment, EnrollmentService } from '../enrollment';
import { RulePaymentAgent, RulePaymentAgentService } from '../rule-payment-agent';
import { RulePaymentCarrier, RulePaymentCarrierService } from '../rule-payment-carrier';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enrollment-payment-meta-data-dialog',
    templateUrl: './enrollment-payment-meta-data-dialog.component.html'
})
export class Enrollment_Payment_MetaDataDialogComponent implements OnInit {

    enrollment_Payment_MetaData: Enrollment_Payment_MetaData;
    isSaving: boolean;

    enrollments: Enrollment[];

    rulepaymentagents: RulePaymentAgent[];

    rulepaymentcarriers: RulePaymentCarrier[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private enrollment_Payment_MetaDataService: Enrollment_Payment_MetaDataService,
        private enrollmentService: EnrollmentService,
        private rulePaymentAgentService: RulePaymentAgentService,
        private rulePaymentCarrierService: RulePaymentCarrierService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enrollmentService.query()
            .subscribe((res: ResponseWrapper) => { this.enrollments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.rulePaymentAgentService.query()
            .subscribe((res: ResponseWrapper) => { this.rulepaymentagents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.rulePaymentCarrierService.query()
            .subscribe((res: ResponseWrapper) => { this.rulepaymentcarriers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enrollment_Payment_MetaData.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enrollment_Payment_MetaDataService.update(this.enrollment_Payment_MetaData));
        } else {
            this.subscribeToSaveResponse(
                this.enrollment_Payment_MetaDataService.create(this.enrollment_Payment_MetaData));
        }
    }

    private subscribeToSaveResponse(result: Observable<Enrollment_Payment_MetaData>) {
        result.subscribe((res: Enrollment_Payment_MetaData) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Enrollment_Payment_MetaData) {
        this.eventManager.broadcast({ name: 'enrollment_Payment_MetaDataListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnrollmentById(index: number, item: Enrollment) {
        return item.id;
    }

    trackRulePaymentAgentById(index: number, item: RulePaymentAgent) {
        return item.id;
    }

    trackRulePaymentCarrierById(index: number, item: RulePaymentCarrier) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-enrollment-payment-meta-data-popup',
    template: ''
})
export class Enrollment_Payment_MetaDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollment_Payment_MetaDataPopupService: Enrollment_Payment_MetaDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enrollment_Payment_MetaDataPopupService
                    .open(Enrollment_Payment_MetaDataDialogComponent as Component, params['id']);
            } else {
                this.enrollment_Payment_MetaDataPopupService
                    .open(Enrollment_Payment_MetaDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
