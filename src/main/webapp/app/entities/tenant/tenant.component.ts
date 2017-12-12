import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tenant } from './tenant.model';
import { TenantService } from './tenant.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tenant',
    templateUrl: './tenant.component.html'
})
export class TenantComponent implements OnInit, OnDestroy {
tenants: Tenant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tenantService: TenantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tenantService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tenants = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTenants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tenant) {
        return item.id;
    }
    registerChangeInTenants() {
        this.eventSubscriber = this.eventManager.subscribe('tenantListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
