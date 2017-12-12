import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Rule_Payment_Agent } from './rule-payment-agent.model';
import { Rule_Payment_AgentPopupService } from './rule-payment-agent-popup.service';
import { Rule_Payment_AgentService } from './rule-payment-agent.service';
import { EnrollmentPaymentMetaData, EnrollmentPaymentMetaDataService } from '../enrollment-payment-meta-data';
import { Agent, AgentService } from '../agent';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rule-payment-agent-dialog',
    templateUrl: './rule-payment-agent-dialog.component.html'
})
export class Rule_Payment_AgentDialogComponent implements OnInit {

    rule_Payment_Agent: Rule_Payment_Agent;
    isSaving: boolean;

    ids: EnrollmentPaymentMetaData[];

    agents: Agent[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private rule_Payment_AgentService: Rule_Payment_AgentService,
        private enrollmentPaymentMetaDataService: EnrollmentPaymentMetaDataService,
        private agentService: AgentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enrollmentPaymentMetaDataService
            .query({filter: 'agentcommissionrule-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.rule_Payment_Agent.id || !this.rule_Payment_Agent.id.id) {
                    this.ids = res.json;
                } else {
                    this.enrollmentPaymentMetaDataService
                        .find(this.rule_Payment_Agent.id.id)
                        .subscribe((subRes: EnrollmentPaymentMetaData) => {
                            this.ids = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.agentService.query()
            .subscribe((res: ResponseWrapper) => { this.agents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rule_Payment_Agent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rule_Payment_AgentService.update(this.rule_Payment_Agent));
        } else {
            this.subscribeToSaveResponse(
                this.rule_Payment_AgentService.create(this.rule_Payment_Agent));
        }
    }

    private subscribeToSaveResponse(result: Observable<Rule_Payment_Agent>) {
        result.subscribe((res: Rule_Payment_Agent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Rule_Payment_Agent) {
        this.eventManager.broadcast({ name: 'rule_Payment_AgentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnrollmentPaymentMetaDataById(index: number, item: EnrollmentPaymentMetaData) {
        return item.id;
    }

    trackAgentById(index: number, item: Agent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rule-payment-agent-popup',
    template: ''
})
export class Rule_Payment_AgentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rule_Payment_AgentPopupService: Rule_Payment_AgentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rule_Payment_AgentPopupService
                    .open(Rule_Payment_AgentDialogComponent as Component, params['id']);
            } else {
                this.rule_Payment_AgentPopupService
                    .open(Rule_Payment_AgentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
