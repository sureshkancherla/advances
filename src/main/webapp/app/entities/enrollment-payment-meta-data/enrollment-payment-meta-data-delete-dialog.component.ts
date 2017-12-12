import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enrollment_Payment_MetaData } from './enrollment-payment-meta-data.model';
import { Enrollment_Payment_MetaDataPopupService } from './enrollment-payment-meta-data-popup.service';
import { Enrollment_Payment_MetaDataService } from './enrollment-payment-meta-data.service';

@Component({
    selector: 'jhi-enrollment-payment-meta-data-delete-dialog',
    templateUrl: './enrollment-payment-meta-data-delete-dialog.component.html'
})
export class Enrollment_Payment_MetaDataDeleteDialogComponent {

    enrollment_Payment_MetaData: Enrollment_Payment_MetaData;

    constructor(
        private enrollment_Payment_MetaDataService: Enrollment_Payment_MetaDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enrollment_Payment_MetaDataService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enrollment_Payment_MetaDataListModification',
                content: 'Deleted an enrollment_Payment_MetaData'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enrollment-payment-meta-data-delete-popup',
    template: ''
})
export class Enrollment_Payment_MetaDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollment_Payment_MetaDataPopupService: Enrollment_Payment_MetaDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enrollment_Payment_MetaDataPopupService
                .open(Enrollment_Payment_MetaDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
