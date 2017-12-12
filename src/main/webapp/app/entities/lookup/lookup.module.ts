import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    LookupService,
    LookupPopupService,
    LookupComponent,
    LookupDetailComponent,
    LookupDialogComponent,
    LookupPopupComponent,
    LookupDeletePopupComponent,
    LookupDeleteDialogComponent,
    lookupRoute,
    lookupPopupRoute,
} from './';

const ENTITY_STATES = [
    ...lookupRoute,
    ...lookupPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LookupComponent,
        LookupDetailComponent,
        LookupDialogComponent,
        LookupDeleteDialogComponent,
        LookupPopupComponent,
        LookupDeletePopupComponent,
    ],
    entryComponents: [
        LookupComponent,
        LookupDialogComponent,
        LookupPopupComponent,
        LookupDeleteDialogComponent,
        LookupDeletePopupComponent,
    ],
    providers: [
        LookupService,
        LookupPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesLookupModule {}
