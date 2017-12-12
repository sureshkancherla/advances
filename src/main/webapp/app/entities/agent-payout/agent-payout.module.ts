import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    Agent_PayoutService,
    Agent_PayoutPopupService,
    Agent_PayoutComponent,
    Agent_PayoutDetailComponent,
    Agent_PayoutDialogComponent,
    Agent_PayoutPopupComponent,
    Agent_PayoutDeletePopupComponent,
    Agent_PayoutDeleteDialogComponent,
    agent_PayoutRoute,
    agent_PayoutPopupRoute,
} from './';

const ENTITY_STATES = [
    ...agent_PayoutRoute,
    ...agent_PayoutPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Agent_PayoutComponent,
        Agent_PayoutDetailComponent,
        Agent_PayoutDialogComponent,
        Agent_PayoutDeleteDialogComponent,
        Agent_PayoutPopupComponent,
        Agent_PayoutDeletePopupComponent,
    ],
    entryComponents: [
        Agent_PayoutComponent,
        Agent_PayoutDialogComponent,
        Agent_PayoutPopupComponent,
        Agent_PayoutDeleteDialogComponent,
        Agent_PayoutDeletePopupComponent,
    ],
    providers: [
        Agent_PayoutService,
        Agent_PayoutPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesAgent_PayoutModule {}
