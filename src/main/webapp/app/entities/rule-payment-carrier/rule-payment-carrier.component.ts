import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Rule_Payment_Carrier } from './rule-payment-carrier.model';
import { Rule_Payment_CarrierService } from './rule-payment-carrier.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rule-payment-carrier',
    templateUrl: './rule-payment-carrier.component.html'
})
export class Rule_Payment_CarrierComponent implements OnInit, OnDestroy {
rule_Payment_Carriers: Rule_Payment_Carrier[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rule_Payment_CarrierService: Rule_Payment_CarrierService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rule_Payment_CarrierService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rule_Payment_Carriers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRule_Payment_Carriers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Rule_Payment_Carrier) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInRule_Payment_Carriers() {
        this.eventSubscriber = this.eventManager.subscribe('rule_Payment_CarrierListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
