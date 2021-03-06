import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Rule_Payment_Agent } from './rule-payment-agent.model';
import { Rule_Payment_AgentService } from './rule-payment-agent.service';

@Component({
    selector: 'jhi-rule-payment-agent-detail',
    templateUrl: './rule-payment-agent-detail.component.html'
})
export class Rule_Payment_AgentDetailComponent implements OnInit, OnDestroy {

    rule_Payment_Agent: Rule_Payment_Agent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private rule_Payment_AgentService: Rule_Payment_AgentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRule_Payment_Agents();
    }

    load(id) {
        this.rule_Payment_AgentService.find(id).subscribe((rule_Payment_Agent) => {
            this.rule_Payment_Agent = rule_Payment_Agent;
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

    registerChangeInRule_Payment_Agents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rule_Payment_AgentListModification',
            (response) => this.load(this.rule_Payment_Agent.id)
        );
    }
}
