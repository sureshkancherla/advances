import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Enrollment_Payment_MetaDataComponent } from './enrollment-payment-meta-data.component';
import { Enrollment_Payment_MetaDataDetailComponent } from './enrollment-payment-meta-data-detail.component';
import { Enrollment_Payment_MetaDataPopupComponent } from './enrollment-payment-meta-data-dialog.component';
import { Enrollment_Payment_MetaDataDeletePopupComponent } from './enrollment-payment-meta-data-delete-dialog.component';

export const enrollment_Payment_MetaDataRoute: Routes = [
    {
        path: 'enrollment-payment-meta-data',
        component: Enrollment_Payment_MetaDataComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Payment_MetaData'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enrollment-payment-meta-data/:id',
        component: Enrollment_Payment_MetaDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Payment_MetaData'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enrollment_Payment_MetaDataPopupRoute: Routes = [
    {
        path: 'enrollment-payment-meta-data-new',
        component: Enrollment_Payment_MetaDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Payment_MetaData'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enrollment-payment-meta-data/:id/edit',
        component: Enrollment_Payment_MetaDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Payment_MetaData'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enrollment-payment-meta-data/:id/delete',
        component: Enrollment_Payment_MetaDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Payment_MetaData'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
