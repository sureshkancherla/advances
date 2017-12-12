import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Rule_Payment_Agent } from './rule-payment-agent.model';
import { Rule_Payment_AgentPopupService } from './rule-payment-agent-popup.service';
import { Rule_Payment_AgentService } from './rule-payment-agent.service';

@Component({
    selector: 'jhi-rule-payment-agent-delete-dialog',
    templateUrl: './rule-payment-agent-delete-dialog.component.html'
})
export class Rule_Payment_AgentDeleteDialogComponent {

    rule_Payment_Agent: Rule_Payment_Agent;

    constructor(
        private rule_Payment_AgentService: Rule_Payment_AgentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rule_Payment_AgentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rule_Payment_AgentListModification',
                content: 'Deleted an rule_Payment_Agent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rule-payment-agent-delete-popup',
    template: ''
})
export class Rule_Payment_AgentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rule_Payment_AgentPopupService: Rule_Payment_AgentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rule_Payment_AgentPopupService
                .open(Rule_Payment_AgentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
