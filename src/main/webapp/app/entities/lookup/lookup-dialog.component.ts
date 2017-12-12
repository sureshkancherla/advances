import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Lookup } from './lookup.model';
import { LookupPopupService } from './lookup-popup.service';
import { LookupService } from './lookup.service';
import { AgentPayout, AgentPayoutService } from '../agent-payout';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lookup-dialog',
    templateUrl: './lookup-dialog.component.html'
})
export class LookupDialogComponent implements OnInit {

    lookup: Lookup;
    isSaving: boolean;

    ids: AgentPayout[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lookupService: LookupService,
        private agentPayoutService: AgentPayoutService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.agentPayoutService
            .query({filter: 'paymenttype-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.lookup.id || !this.lookup.id.id) {
                    this.ids = res.json;
                } else {
                    this.agentPayoutService
                        .find(this.lookup.id.id)
                        .subscribe((subRes: AgentPayout) => {
                            this.ids = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lookup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lookupService.update(this.lookup));
        } else {
            this.subscribeToSaveResponse(
                this.lookupService.create(this.lookup));
        }
    }

    private subscribeToSaveResponse(result: Observable<Lookup>) {
        result.subscribe((res: Lookup) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Lookup) {
        this.eventManager.broadcast({ name: 'lookupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAgentPayoutById(index: number, item: AgentPayout) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lookup-popup',
    template: ''
})
export class LookupPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lookupPopupService: LookupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lookupPopupService
                    .open(LookupDialogComponent as Component, params['id']);
            } else {
                this.lookupPopupService
                    .open(LookupDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
