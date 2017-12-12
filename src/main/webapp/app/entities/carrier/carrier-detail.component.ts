import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Carrier } from './carrier.model';
import { CarrierService } from './carrier.service';

@Component({
    selector: 'jhi-carrier-detail',
    templateUrl: './carrier-detail.component.html'
})
export class CarrierDetailComponent implements OnInit, OnDestroy {

    carrier: Carrier;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private carrierService: CarrierService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCarriers();
    }

    load(id) {
        this.carrierService.find(id).subscribe((carrier) => {
            this.carrier = carrier;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCarriers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'carrierListModification',
            (response) => this.load(this.carrier.id)
        );
    }
}
