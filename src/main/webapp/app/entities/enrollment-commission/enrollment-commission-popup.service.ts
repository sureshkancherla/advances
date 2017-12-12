import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Enrollment_Commission } from './enrollment-commission.model';
import { Enrollment_CommissionService } from './enrollment-commission.service';

@Injectable()
export class Enrollment_CommissionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private enrollment_CommissionService: Enrollment_CommissionService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.enrollment_CommissionService.find(id).subscribe((enrollment_Commission) => {
                    enrollment_Commission.statementDate = this.datePipe
                        .transform(enrollment_Commission.statementDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.enrollment_CommissionModalRef(component, enrollment_Commission);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.enrollment_CommissionModalRef(component, new Enrollment_Commission());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    enrollment_CommissionModalRef(component: Component, enrollment_Commission: Enrollment_Commission): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.enrollment_Commission = enrollment_Commission;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
