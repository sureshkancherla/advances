import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Rule_Payment_Carrier } from './rule-payment-carrier.model';
import { Rule_Payment_CarrierPopupService } from './rule-payment-carrier-popup.service';
import { Rule_Payment_CarrierService } from './rule-payment-carrier.service';

@Component({
    selector: 'jhi-rule-payment-carrier-delete-dialog',
    templateUrl: './rule-payment-carrier-delete-dialog.component.html'
})
export class Rule_Payment_CarrierDeleteDialogComponent {

    rule_Payment_Carrier: Rule_Payment_Carrier;

    constructor(
        private rule_Payment_CarrierService: Rule_Payment_CarrierService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rule_Payment_CarrierService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rule_Payment_CarrierListModification',
                content: 'Deleted an rule_Payment_Carrier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rule-payment-carrier-delete-popup',
    template: ''
})
export class Rule_Payment_CarrierDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rule_Payment_CarrierPopupService: Rule_Payment_CarrierPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rule_Payment_CarrierPopupService
                .open(Rule_Payment_CarrierDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
