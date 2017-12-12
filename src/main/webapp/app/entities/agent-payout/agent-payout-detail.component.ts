import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Agent_Payout } from './agent-payout.model';
import { Agent_PayoutService } from './agent-payout.service';

@Component({
    selector: 'jhi-agent-payout-detail',
    templateUrl: './agent-payout-detail.component.html'
})
export class Agent_PayoutDetailComponent implements OnInit, OnDestroy {

    agent_Payout: Agent_Payout;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private agent_PayoutService: Agent_PayoutService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAgent_Payouts();
    }

    load(id) {
        this.agent_PayoutService.find(id).subscribe((agent_Payout) => {
            this.agent_Payout = agent_Payout;
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

    registerChangeInAgent_Payouts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'agent_PayoutListModification',
            (response) => this.load(this.agent_Payout.id)
        );
    }
}
