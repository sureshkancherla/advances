import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Rule_Payment_Agent } from './rule-payment-agent.model';
import { Rule_Payment_AgentService } from './rule-payment-agent.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rule-payment-agent',
    templateUrl: './rule-payment-agent.component.html'
})
export class Rule_Payment_AgentComponent implements OnInit, OnDestroy {
rule_Payment_Agents: Rule_Payment_Agent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rule_Payment_AgentService: Rule_Payment_AgentService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rule_Payment_AgentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.rule_Payment_Agents = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRule_Payment_Agents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Rule_Payment_Agent) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInRule_Payment_Agents() {
        this.eventSubscriber = this.eventManager.subscribe('rule_Payment_AgentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
