import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Enrollment } from './enrollment.model';
import { EnrollmentPopupService } from './enrollment-popup.service';
import { EnrollmentService } from './enrollment.service';

@Component({
    selector: 'jhi-enrollment-delete-dialog',
    templateUrl: './enrollment-delete-dialog.component.html'
})
export class EnrollmentDeleteDialogComponent {

    enrollment: Enrollment;

    constructor(
        private enrollmentService: EnrollmentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enrollmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'enrollmentListModification',
                content: 'Deleted an enrollment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enrollment-delete-popup',
    template: ''
})
export class EnrollmentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollmentPopupService: EnrollmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.enrollmentPopupService
                .open(EnrollmentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
