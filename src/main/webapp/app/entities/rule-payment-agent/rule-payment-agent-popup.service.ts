import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Rule_Payment_Agent } from './rule-payment-agent.model';
import { Rule_Payment_AgentService } from './rule-payment-agent.service';

@Injectable()
export class Rule_Payment_AgentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private rule_Payment_AgentService: Rule_Payment_AgentService

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
                this.rule_Payment_AgentService.find(id).subscribe((rule_Payment_Agent) => {
                    this.ngbModalRef = this.rule_Payment_AgentModalRef(component, rule_Payment_Agent);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rule_Payment_AgentModalRef(component, new Rule_Payment_Agent());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rule_Payment_AgentModalRef(component: Component, rule_Payment_Agent: Rule_Payment_Agent): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rule_Payment_Agent = rule_Payment_Agent;
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
