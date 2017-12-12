import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    Enrollment_Payment_MetaDataService,
    Enrollment_Payment_MetaDataPopupService,
    Enrollment_Payment_MetaDataComponent,
    Enrollment_Payment_MetaDataDetailComponent,
    Enrollment_Payment_MetaDataDialogComponent,
    Enrollment_Payment_MetaDataPopupComponent,
    Enrollment_Payment_MetaDataDeletePopupComponent,
    Enrollment_Payment_MetaDataDeleteDialogComponent,
    enrollment_Payment_MetaDataRoute,
    enrollment_Payment_MetaDataPopupRoute,
} from './';

const ENTITY_STATES = [
    ...enrollment_Payment_MetaDataRoute,
    ...enrollment_Payment_MetaDataPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Enrollment_Payment_MetaDataComponent,
        Enrollment_Payment_MetaDataDetailComponent,
        Enrollment_Payment_MetaDataDialogComponent,
        Enrollment_Payment_MetaDataDeleteDialogComponent,
        Enrollment_Payment_MetaDataPopupComponent,
        Enrollment_Payment_MetaDataDeletePopupComponent,
    ],
    entryComponents: [
        Enrollment_Payment_MetaDataComponent,
        Enrollment_Payment_MetaDataDialogComponent,
        Enrollment_Payment_MetaDataPopupComponent,
        Enrollment_Payment_MetaDataDeleteDialogComponent,
        Enrollment_Payment_MetaDataDeletePopupComponent,
    ],
    providers: [
        Enrollment_Payment_MetaDataService,
        Enrollment_Payment_MetaDataPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesEnrollment_Payment_MetaDataModule {}
