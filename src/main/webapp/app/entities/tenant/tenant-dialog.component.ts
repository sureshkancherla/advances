import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tenant } from './tenant.model';
import { TenantPopupService } from './tenant-popup.service';
import { TenantService } from './tenant.service';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tenant-dialog',
    templateUrl: './tenant-dialog.component.html'
})
export class TenantDialogComponent implements OnInit {

    tenant: Tenant;
    isSaving: boolean;

    tenants: Tenant[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tenantService: TenantService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tenantService.query()
            .subscribe((res: ResponseWrapper) => { this.tenants = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tenant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tenantService.update(this.tenant));
        } else {
            this.subscribeToSaveResponse(
                this.tenantService.create(this.tenant));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tenant>) {
        result.subscribe((res: Tenant) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tenant) {
        this.eventManager.broadcast({ name: 'tenantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTenantById(index: number, item: Tenant) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tenant-popup',
    template: ''
})
export class TenantPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tenantPopupService: TenantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tenantPopupService
                    .open(TenantDialogComponent as Component, params['id']);
            } else {
                this.tenantPopupService
                    .open(TenantDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
