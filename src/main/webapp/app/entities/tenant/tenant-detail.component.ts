import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tenant } from './tenant.model';
import { TenantService } from './tenant.service';

@Component({
    selector: 'jhi-tenant-detail',
    templateUrl: './tenant-detail.component.html'
})
export class TenantDetailComponent implements OnInit, OnDestroy {

    tenant: Tenant;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tenantService: TenantService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTenants();
    }

    load(id) {
        this.tenantService.find(id).subscribe((tenant) => {
            this.tenant = tenant;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTenants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tenantListModification',
            (response) => this.load(this.tenant.id)
        );
    }
}
