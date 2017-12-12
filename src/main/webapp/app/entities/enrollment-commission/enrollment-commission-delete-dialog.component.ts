import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enrollment_Commission } from './enrollment-commission.model';
import { Enrollment_CommissionPopupService } from './enrollment-commission-popup.service';
import { Enrollment_CommissionService } from './enrollment-commission.service';

@Component({
    selector: 'jhi-enrollment-commission-delete-dialog',
    templateUrl: './enrollment-commission-delete-dialog.component.html'
})
export class Enrollment_CommissionDeleteDialogComponent {

    enrollment_Commission: Enrollment_Commission;

    constructor(
        private enrollment_CommissionService: Enrollment_CommissionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enrollment_CommissionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enrollment_CommissionListModification',
                content: 'Deleted an enrollment_Commission'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enrollment-commission-delete-popup',
    template: ''
})
export class Enrollment_CommissionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollment_CommissionPopupService: Enrollment_CommissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enrollment_CommissionPopupService
                .open(Enrollment_CommissionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
