import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Agent } from './agent.model';
import { AgentPopupService } from './agent-popup.service';
import { AgentService } from './agent.service';
import { RulePaymentAgent, RulePaymentAgentService } from '../rule-payment-agent';
import { Tenant, TenantService } from '../tenant';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-agent-dialog',
    templateUrl: './agent-dialog.component.html'
})
export class AgentDialogComponent implements OnInit {

    agent: Agent;
    isSaving: boolean;

    ids: RulePaymentAgent[];

    tenants: Tenant[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private agentService: AgentService,
        private rulePaymentAgentService: RulePaymentAgentService,
        private tenantService: TenantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rulePaymentAgentService
            .query({filter: 'agent-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.agent.id || !this.agent.id.id) {
                    this.ids = res.json;
                } else {
                    this.rulePaymentAgentService
                        .find(this.agent.id.id)
                        .subscribe((subRes: RulePaymentAgent) => {
                            this.ids = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.agent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agentService.update(this.agent));
        } else {
            this.subscribeToSaveResponse(
                this.agentService.create(this.agent));
        }
    }

    private subscribeToSaveResponse(result: Observable<Agent>) {
        result.subscribe((res: Agent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Agent) {
        this.eventManager.broadcast({ name: 'agentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRulePaymentAgentById(index: number, item: RulePaymentAgent) {
        return item.id;
    }

    trackTenantById(index: number, item: Tenant) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-agent-popup',
    template: ''
})
export class AgentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agentPopupService: AgentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agentPopupService
                    .open(AgentDialogComponent as Component, params['id']);
            } else {
                this.agentPopupService
                    .open(AgentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
