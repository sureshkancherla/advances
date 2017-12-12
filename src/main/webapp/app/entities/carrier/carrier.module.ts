import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    CarrierService,
    CarrierPopupService,
    CarrierComponent,
    CarrierDetailComponent,
    CarrierDialogComponent,
    CarrierPopupComponent,
    CarrierDeletePopupComponent,
    CarrierDeleteDialogComponent,
    carrierRoute,
    carrierPopupRoute,
} from './';

const ENTITY_STATES = [
    ...carrierRoute,
    ...carrierPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CarrierComponent,
        CarrierDetailComponent,
        CarrierDialogComponent,
        CarrierDeleteDialogComponent,
        CarrierPopupComponent,
        CarrierDeletePopupComponent,
    ],
    entryComponents: [
        CarrierComponent,
        CarrierDialogComponent,
        CarrierPopupComponent,
        CarrierDeleteDialogComponent,
        CarrierDeletePopupComponent,
    ],
    providers: [
        CarrierService,
        CarrierPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesCarrierModule {}
