import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Rule_Payment_AgentComponent } from './rule-payment-agent.component';
import { Rule_Payment_AgentDetailComponent } from './rule-payment-agent-detail.component';
import { Rule_Payment_AgentPopupComponent } from './rule-payment-agent-dialog.component';
import { Rule_Payment_AgentDeletePopupComponent } from './rule-payment-agent-delete-dialog.component';

export const rule_Payment_AgentRoute: Routes = [
    {
        path: 'rule-payment-agent',
        component: Rule_Payment_AgentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Agents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rule-payment-agent/:id',
        component: Rule_Payment_AgentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Agents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rule_Payment_AgentPopupRoute: Routes = [
    {
        path: 'rule-payment-agent-new',
        component: Rule_Payment_AgentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Agents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-payment-agent/:id/edit',
        component: Rule_Payment_AgentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Agents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-payment-agent/:id/delete',
        component: Rule_Payment_AgentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rule_Payment_Agents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
