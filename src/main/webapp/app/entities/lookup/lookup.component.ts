import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Lookup } from './lookup.model';
import { LookupService } from './lookup.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lookup',
    templateUrl: './lookup.component.html'
})
export class LookupComponent implements OnInit, OnDestroy {
lookups: Lookup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private lookupService: LookupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.lookupService.query().subscribe(
            (res: ResponseWrapper) => {
                this.lookups = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLookups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Lookup) {
        return item.id;
    }
    registerChangeInLookups() {
        this.eventSubscriber = this.eventManager.subscribe('lookupListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
