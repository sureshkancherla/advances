import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tenant } from './tenant.model';
import { TenantPopupService } from './tenant-popup.service';
import { TenantService } from './tenant.service';

@Component({
    selector: 'jhi-tenant-delete-dialog',
    templateUrl: './tenant-delete-dialog.component.html'
})
export class TenantDeleteDialogComponent {

    tenant: Tenant;

    constructor(
        private tenantService: TenantService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tenantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tenantListModification',
                content: 'Deleted an tenant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tenant-delete-popup',
    template: ''
})
export class TenantDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tenantPopupService: TenantPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tenantPopupService
                .open(TenantDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
