import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    Rule_Payment_AgentService,
    Rule_Payment_AgentPopupService,
    Rule_Payment_AgentComponent,
    Rule_Payment_AgentDetailComponent,
    Rule_Payment_AgentDialogComponent,
    Rule_Payment_AgentPopupComponent,
    Rule_Payment_AgentDeletePopupComponent,
    Rule_Payment_AgentDeleteDialogComponent,
    rule_Payment_AgentRoute,
    rule_Payment_AgentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rule_Payment_AgentRoute,
    ...rule_Payment_AgentPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Rule_Payment_AgentComponent,
        Rule_Payment_AgentDetailComponent,
        Rule_Payment_AgentDialogComponent,
        Rule_Payment_AgentDeleteDialogComponent,
        Rule_Payment_AgentPopupComponent,
        Rule_Payment_AgentDeletePopupComponent,
    ],
    entryComponents: [
        Rule_Payment_AgentComponent,
        Rule_Payment_AgentDialogComponent,
        Rule_Payment_AgentPopupComponent,
        Rule_Payment_AgentDeleteDialogComponent,
        Rule_Payment_AgentDeletePopupComponent,
    ],
    providers: [
        Rule_Payment_AgentService,
        Rule_Payment_AgentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesRule_Payment_AgentModule {}
