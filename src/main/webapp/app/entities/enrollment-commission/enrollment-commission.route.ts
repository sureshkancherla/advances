import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Enrollment_CommissionComponent } from './enrollment-commission.component';
import { Enrollment_CommissionDetailComponent } from './enrollment-commission-detail.component';
import { Enrollment_CommissionPopupComponent } from './enrollment-commission-dialog.component';
import { Enrollment_CommissionDeletePopupComponent } from './enrollment-commission-delete-dialog.component';

export const enrollment_CommissionRoute: Routes = [
    {
        path: 'enrollment-commission',
        component: Enrollment_CommissionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Commissions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enrollment-commission/:id',
        component: Enrollment_CommissionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Commissions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enrollment_CommissionPopupRoute: Routes = [
    {
        path: 'enrollment-commission-new',
        component: Enrollment_CommissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Commissions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enrollment-commission/:id/edit',
        component: Enrollment_CommissionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Commissions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enrollment-commission/:id/delete',
        component: Enrollment_CommissionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollment_Commissions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
