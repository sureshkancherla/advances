import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Rule_Payment_Carrier } from './rule-payment-carrier.model';
import { Rule_Payment_CarrierPopupService } from './rule-payment-carrier-popup.service';
import { Rule_Payment_CarrierService } from './rule-payment-carrier.service';
import { EnrollmentPaymentMetaData, EnrollmentPaymentMetaDataService } from '../enrollment-payment-meta-data';
import { Carrier, CarrierService } from '../carrier';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rule-payment-carrier-dialog',
    templateUrl: './rule-payment-carrier-dialog.component.html'
})
export class Rule_Payment_CarrierDialogComponent implements OnInit {

    rule_Payment_Carrier: Rule_Payment_Carrier;
    isSaving: boolean;

    ids: EnrollmentPaymentMetaData[];

    carriers: Carrier[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private rule_Payment_CarrierService: Rule_Payment_CarrierService,
        private enrollmentPaymentMetaDataService: EnrollmentPaymentMetaDataService,
        private carrierService: CarrierService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enrollmentPaymentMetaDataService
            .query({filter: 'carriercommissionrule-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rule_Payment_Carrier.id || !this.rule_Payment_Carrier.id.id) {
                    this.ids = res.json;
                } else {
                    this.enrollmentPaymentMetaDataService
                        .find(this.rule_Payment_Carrier.id.id)
                        .subscribe((subRes: EnrollmentPaymentMetaData) => {
                            this.ids = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.carrierService.query()
            .subscribe((res: ResponseWrapper) => { this.carriers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rule_Payment_Carrier.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rule_Payment_CarrierService.update(this.rule_Payment_Carrier));
        } else {
            this.subscribeToSaveResponse(
                this.rule_Payment_CarrierService.create(this.rule_Payment_Carrier));
        }
    }

    private subscribeToSaveResponse(result: Observable<Rule_Payment_Carrier>) {
        result.subscribe((res: Rule_Payment_Carrier) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Rule_Payment_Carrier) {
        this.eventManager.broadcast({ name: 'rule_Payment_CarrierListModification', content: 'OK'});
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

    trackCarrierById(index: number, item: Carrier) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rule-payment-carrier-popup',
    template: ''
})
export class Rule_Payment_CarrierPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rule_Payment_CarrierPopupService: Rule_Payment_CarrierPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rule_Payment_CarrierPopupService
                    .open(Rule_Payment_CarrierDialogComponent as Component, params['id']);
            } else {
                this.rule_Payment_CarrierPopupService
                    .open(Rule_Payment_CarrierDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
