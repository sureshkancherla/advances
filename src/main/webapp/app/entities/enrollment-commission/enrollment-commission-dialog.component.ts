import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Enrollment_Commission } from './enrollment-commission.model';
import { Enrollment_CommissionPopupService } from './enrollment-commission-popup.service';
import { Enrollment_CommissionService } from './enrollment-commission.service';
import { Enrollment, EnrollmentService } from '../enrollment';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-enrollment-commission-dialog',
    templateUrl: './enrollment-commission-dialog.component.html'
})
export class Enrollment_CommissionDialogComponent implements OnInit {

    enrollment_Commission: Enrollment_Commission;
    isSaving: boolean;

    enrollments: Enrollment[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private enrollment_CommissionService: Enrollment_CommissionService,
        private enrollmentService: EnrollmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.enrollmentService.query()
            .subscribe((res: ResponseWrapper) => { this.enrollments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.enrollment_Commission.id !== undefined) {
            this.subscribeToSaveResponse(
                this.enrollment_CommissionService.update(this.enrollment_Commission));
        } else {
            this.subscribeToSaveResponse(
                this.enrollment_CommissionService.create(this.enrollment_Commission));
        }
    }

    private subscribeToSaveResponse(result: Observable<Enrollment_Commission>) {
        result.subscribe((res: Enrollment_Commission) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Enrollment_Commission) {
        this.eventManager.broadcast({ name: 'enrollment_CommissionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEnrollmentById(index: number, item: Enrollment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-enrollment-commission-popup',
    template: ''
})
export class Enrollment_CommissionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private enrollment_CommissionPopupService: Enrollment_CommissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.enrollment_CommissionPopupService
                    .open(Enrollment_CommissionDialogComponent as Component, params['id']);
            } else {
                this.enrollment_CommissionPopupService
                    .open(Enrollment_CommissionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
