import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Lookup } from './lookup.model';
import { LookupService } from './lookup.service';

@Component({
    selector: 'jhi-lookup-detail',
    templateUrl: './lookup-detail.component.html'
})
export class LookupDetailComponent implements OnInit, OnDestroy {

    lookup: Lookup;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lookupService: LookupService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLookups();
    }

    load(id) {
        this.lookupService.find(id).subscribe((lookup) => {
            this.lookup = lookup;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLookups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lookupListModification',
            (response) => this.load(this.lookup.id)
        );
    }
}
