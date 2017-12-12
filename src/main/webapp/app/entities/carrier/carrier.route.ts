import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CarrierComponent } from './carrier.component';
import { CarrierDetailComponent } from './carrier-detail.component';
import { CarrierPopupComponent } from './carrier-dialog.component';
import { CarrierDeletePopupComponent } from './carrier-delete-dialog.component';

export const carrierRoute: Routes = [
    {
        path: 'carrier',
        component: CarrierComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carriers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'carrier/:id',
        component: CarrierDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carriers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carrierPopupRoute: Routes = [
    {
        path: 'carrier-new',
        component: CarrierPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carriers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carrier/:id/edit',
        component: CarrierPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carriers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'carrier/:id/delete',
        component: CarrierDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Carriers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
