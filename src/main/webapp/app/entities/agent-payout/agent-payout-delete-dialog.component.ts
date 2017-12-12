import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Agent_Payout } from './agent-payout.model';
import { Agent_PayoutPopupService } from './agent-payout-popup.service';
import { Agent_PayoutService } from './agent-payout.service';

@Component({
    selector: 'jhi-agent-payout-delete-dialog',
    templateUrl: './agent-payout-delete-dialog.component.html'
})
export class Agent_PayoutDeleteDialogComponent {

    agent_Payout: Agent_Payout;

    constructor(
        private agent_PayoutService: Agent_PayoutService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agent_PayoutService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'agent_PayoutListModification',
                content: 'Deleted an agent_Payout'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agent-payout-delete-popup',
    template: ''
})
export class Agent_PayoutDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agent_PayoutPopupService: Agent_PayoutPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.agent_PayoutPopupService
                .open(Agent_PayoutDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
