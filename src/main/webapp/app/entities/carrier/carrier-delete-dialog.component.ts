import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Carrier } from './carrier.model';
import { CarrierPopupService } from './carrier-popup.service';
import { CarrierService } from './carrier.service';

@Component({
    selector: 'jhi-carrier-delete-dialog',
    templateUrl: './carrier-delete-dialog.component.html'
})
export class CarrierDeleteDialogComponent {

    carrier: Carrier;

    constructor(
        private carrierService: CarrierService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carrierService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'carrierListModification',
                content: 'Deleted an carrier'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-carrier-delete-popup',
    template: ''
})
export class CarrierDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private carrierPopupService: CarrierPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.carrierPopupService
                .open(CarrierDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
