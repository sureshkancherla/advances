import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Rule_Payment_CarrierComponent } from './rule-payment-carrier.component';
import { Rule_Payment_CarrierDetailComponent } from './rule-payment-carrier-detail.component';
import { Rule_Payment_CarrierPopupComponent } from './rule-payment-carrier-dialog.component';
import { Rule_Payment_CarrierDeletePopupComponent } from './rule-payment-carrier-delete-dialog.component';

export const rule_Payment_CarrierRoute: Routes = [
    {
        path: 'rule-payment-carrier',
        component: Rule_Payment_CarrierComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Carriers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rule-payment-carrier/:id',
        component: Rule_Payment_CarrierDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Carriers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rule_Payment_CarrierPopupRoute: Routes = [
    {
        path: 'rule-payment-carrier-new',
        component: Rule_Payment_CarrierPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Carriers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-payment-carrier/:id/edit',
        component: Rule_Payment_CarrierPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Carriers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-payment-carrier/:id/delete',
        component: Rule_Payment_CarrierDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Carriers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
