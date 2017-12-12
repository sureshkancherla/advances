import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Agent_PayoutComponent } from './agent-payout.component';
import { Agent_PayoutDetailComponent } from './agent-payout-detail.component';
import { Agent_PayoutPopupComponent } from './agent-payout-dialog.component';
import { Agent_PayoutDeletePopupComponent } from './agent-payout-delete-dialog.component';

export const agent_PayoutRoute: Routes = [
    {
        path: 'agent-payout',
        component: Agent_PayoutComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agent_Payouts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'agent-payout/:id',
        component: Agent_PayoutDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agent_Payouts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agent_PayoutPopupRoute: Routes = [
    {
        path: 'agent-payout-new',
        component: Agent_PayoutPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agent_Payouts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agent-payout/:id/edit',
        component: Agent_PayoutPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agent_Payouts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agent-payout/:id/delete',
        component: Agent_PayoutDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Agent_Payouts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
