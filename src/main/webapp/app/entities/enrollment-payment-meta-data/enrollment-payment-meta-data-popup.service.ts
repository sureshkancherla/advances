import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Enrollment_Payment_MetaData } from './enrollment-payment-meta-data.model';
import { Enrollment_Payment_MetaDataService } from './enrollment-payment-meta-data.service';

@Injectable()
export class Enrollment_Payment_MetaDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private enrollment_Payment_MetaDataService: Enrollment_Payment_MetaDataService

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
                this.enrollment_Payment_MetaDataService.find(id).subscribe((enrollment_Payment_MetaData) => {
                    this.ngbModalRef = this.enrollment_Payment_MetaDataModalRef(component, enrollment_Payment_MetaData);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.enrollment_Payment_MetaDataModalRef(component, new Enrollment_Payment_MetaData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    enrollment_Payment_MetaDataModalRef(component: Component, enrollment_Payment_MetaData: Enrollment_Payment_MetaData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.enrollment_Payment_MetaData = enrollment_Payment_MetaData;
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
