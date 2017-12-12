import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Carrier } from './carrier.model';
import { CarrierService } from './carrier.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-carrier',
    templateUrl: './carrier.component.html'
})
export class CarrierComponent implements OnInit, OnDestroy {
carriers: Carrier[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private carrierService: CarrierService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.carrierService.query().subscribe(
            (res: ResponseWrapper) => {
                this.carriers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCarriers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Carrier) {
        return item.id;
    }
    registerChangeInCarriers() {
        this.eventSubscriber = this.eventManager.subscribe('carrierListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
