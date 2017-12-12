import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Agent_Payout } from './agent-payout.model';
import { Agent_PayoutPopupService } from './agent-payout-popup.service';
import { Agent_PayoutService } from './agent-payout.service';
import { Lookup, LookupService } from '../lookup';
import { Agent, AgentService } from '../agent';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-agent-payout-dialog',
    templateUrl: './agent-payout-dialog.component.html'
})
export class Agent_PayoutDialogComponent implements OnInit {

    agent_Payout: Agent_Payout;
    isSaving: boolean;

    lookups: Lookup[];

    agents: Agent[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private agent_PayoutService: Agent_PayoutService,
        private lookupService: LookupService,
        private agentService: AgentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lookupService.query()
            .subscribe((res: ResponseWrapper) => { this.lookups = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        if (this.agent_Payout.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agent_PayoutService.update(this.agent_Payout));
        } else {
            this.subscribeToSaveResponse(
                this.agent_PayoutService.create(this.agent_Payout));
        }
    }

    private subscribeToSaveResponse(result: Observable<Agent_Payout>) {
        result.subscribe((res: Agent_Payout) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Agent_Payout) {
        this.eventManager.broadcast({ name: 'agent_PayoutListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLookupById(index: number, item: Lookup) {
        return item.id;
    }

    trackAgentById(index: number, item: Agent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-agent-payout-popup',
    template: ''
})
export class Agent_PayoutPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agent_PayoutPopupService: Agent_PayoutPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agent_PayoutPopupService
                    .open(Agent_PayoutDialogComponent as Component, params['id']);
            } else {
                this.agent_PayoutPopupService
                    .open(Agent_PayoutDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
