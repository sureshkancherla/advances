import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Agent_Payout } from './agent-payout.model';
import { Agent_PayoutService } from './agent-payout.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-agent-payout',
    templateUrl: './agent-payout.component.html'
})
export class Agent_PayoutComponent implements OnInit, OnDestroy {
agent_Payouts: Agent_Payout[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agent_PayoutService: Agent_PayoutService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.agent_PayoutService.query().subscribe(
            (res: ResponseWrapper) => {
                this.agent_Payouts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAgent_Payouts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Agent_Payout) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInAgent_Payouts() {
        this.eventSubscriber = this.eventManager.subscribe('agent_PayoutListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
