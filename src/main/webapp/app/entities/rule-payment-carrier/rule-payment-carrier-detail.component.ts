import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Rule_Payment_Carrier } from './rule-payment-carrier.model';
import { Rule_Payment_CarrierService } from './rule-payment-carrier.service';

@Component({
    selector: 'jhi-rule-payment-carrier-detail',
    templateUrl: './rule-payment-carrier-detail.component.html'
})
export class Rule_Payment_CarrierDetailComponent implements OnInit, OnDestroy {

    rule_Payment_Carrier: Rule_Payment_Carrier;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private rule_Payment_CarrierService: Rule_Payment_CarrierService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRule_Payment_Carriers();
    }

    load(id) {
        this.rule_Payment_CarrierService.find(id).subscribe((rule_Payment_Carrier) => {
            this.rule_Payment_Carrier = rule_Payment_Carrier;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRule_Payment_Carriers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rule_Payment_CarrierListModification',
            (response) => this.load(this.rule_Payment_Carrier.id)
        );
    }
}
