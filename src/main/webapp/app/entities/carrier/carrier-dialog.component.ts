import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Carrier } from './carrier.model';
import { CarrierPopupService } from './carrier-popup.service';
import { CarrierService } from './carrier.service';
import { RulePaymentCarrier, RulePaymentCarrierService } from '../rule-payment-carrier';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-carrier-dialog',
    templateUrl: './carrier-dialog.component.html'
})
export class CarrierDialogComponent implements OnInit {

    carrier: Carrier;
    isSaving: boolean;

    ids: RulePaymentCarrier[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private carrierService: CarrierService,
        private rulePaymentCarrierService: RulePaymentCarrierService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rulePaymentCarrierService
            .query({filter: 'carrier-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.carrier.id || !this.carrier.id.id) {
                    this.ids = res.json;
                } else {
                    this.rulePaymentCarrierService
                        .find(this.carrier.id.id)
                        .subscribe((subRes: RulePaymentCarrier) => {
                            this.ids = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.carrier.id !== undefined) {
            this.subscribeToSaveResponse(
                this.carrierService.update(this.carrier));
        } else {
            this.subscribeToSaveResponse(
                this.carrierService.create(this.carrier));
        }
    }

    private subscribeToSaveResponse(result: Observable<Carrier>) {
        result.subscribe((res: Carrier) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Carrier) {
        this.eventManager.broadcast({ name: 'carrierListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRulePaymentCarrierById(index: number, item: RulePaymentCarrier) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-carrier-popup',
    template: ''
})
export class CarrierPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carrierPopupService: CarrierPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.carrierPopupService
                    .open(CarrierDialogComponent as Component, params['id']);
            } else {
                this.carrierPopupService
                    .open(CarrierDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
