import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    Rule_Payment_CarrierService,
    Rule_Payment_CarrierPopupService,
    Rule_Payment_CarrierComponent,
    Rule_Payment_CarrierDetailComponent,
    Rule_Payment_CarrierDialogComponent,
    Rule_Payment_CarrierPopupComponent,
    Rule_Payment_CarrierDeletePopupComponent,
    Rule_Payment_CarrierDeleteDialogComponent,
    rule_Payment_CarrierRoute,
    rule_Payment_CarrierPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rule_Payment_CarrierRoute,
    ...rule_Payment_CarrierPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Rule_Payment_CarrierComponent,
        Rule_Payment_CarrierDetailComponent,
        Rule_Payment_CarrierDialogComponent,
        Rule_Payment_CarrierDeleteDialogComponent,
        Rule_Payment_CarrierPopupComponent,
        Rule_Payment_CarrierDeletePopupComponent,
    ],
    entryComponents: [
        Rule_Payment_CarrierComponent,
        Rule_Payment_CarrierDialogComponent,
        Rule_Payment_CarrierPopupComponent,
        Rule_Payment_CarrierDeleteDialogComponent,
        Rule_Payment_CarrierDeletePopupComponent,
    ],
    providers: [
        Rule_Payment_CarrierService,
        Rule_Payment_CarrierPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesRule_Payment_CarrierModule {}
