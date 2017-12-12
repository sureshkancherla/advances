import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TenantComponent } from './tenant.component';
import { TenantDetailComponent } from './tenant-detail.component';
import { TenantPopupComponent } from './tenant-dialog.component';
import { TenantDeletePopupComponent } from './tenant-delete-dialog.component';

export const tenantRoute: Routes = [
    {
        path: 'tenant',
        component: TenantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tenants'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tenant/:id',
        component: TenantDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tenants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tenantPopupRoute: Routes = [
    {
        path: 'tenant-new',
        component: TenantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tenants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tenant/:id/edit',
        component: TenantPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tenants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tenant/:id/delete',
        component: TenantDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tenants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
