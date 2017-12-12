import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LookupComponent } from './lookup.component';
import { LookupDetailComponent } from './lookup-detail.component';
import { LookupPopupComponent } from './lookup-dialog.component';
import { LookupDeletePopupComponent } from './lookup-delete-dialog.component';

export const lookupRoute: Routes = [
    {
        path: 'lookup',
        component: LookupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lookups'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lookup/:id',
        component: LookupDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lookups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lookupPopupRoute: Routes = [
    {
        path: 'lookup-new',
        component: LookupPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lookups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lookup/:id/edit',
        component: LookupPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lookups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lookup/:id/delete',
        component: LookupDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lookups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
