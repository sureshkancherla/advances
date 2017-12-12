import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Rule_Payment_Carrier } from './rule-payment-carrier.model';
import { Rule_Payment_CarrierService } from './rule-payment-carrier.service';

@Injectable()
export class Rule_Payment_CarrierPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private rule_Payment_CarrierService: Rule_Payment_CarrierService

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
                this.rule_Payment_CarrierService.find(id).subscribe((rule_Payment_Carrier) => {
                    this.ngbModalRef = this.rule_Payment_CarrierModalRef(component, rule_Payment_Carrier);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rule_Payment_CarrierModalRef(component, new Rule_Payment_Carrier());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rule_Payment_CarrierModalRef(component: Component, rule_Payment_Carrier: Rule_Payment_Carrier): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rule_Payment_Carrier = rule_Payment_Carrier;
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
