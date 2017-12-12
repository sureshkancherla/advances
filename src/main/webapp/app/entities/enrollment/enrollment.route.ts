import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentDetailComponent } from './enrollment-detail.component';
import { EnrollmentPopupComponent } from './enrollment-dialog.component';
import { EnrollmentDeletePopupComponent } from './enrollment-delete-dialog.component';

export const enrollmentRoute: Routes = [
    {
        path: 'enrollment',
        component: EnrollmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'enrollment/:id',
        component: EnrollmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enrollmentPopupRoute: Routes = [
    {
        path: 'enrollment-new',
        component: EnrollmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enrollment/:id/edit',
        component: EnrollmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'enrollment/:id/delete',
        component: EnrollmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enrollments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
