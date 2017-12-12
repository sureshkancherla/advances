import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    Enrollment_CommissionService,
    Enrollment_CommissionPopupService,
    Enrollment_CommissionComponent,
    Enrollment_CommissionDetailComponent,
    Enrollment_CommissionDialogComponent,
    Enrollment_CommissionPopupComponent,
    Enrollment_CommissionDeletePopupComponent,
    Enrollment_CommissionDeleteDialogComponent,
    enrollment_CommissionRoute,
    enrollment_CommissionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...enrollment_CommissionRoute,
    ...enrollment_CommissionPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Enrollment_CommissionComponent,
        Enrollment_CommissionDetailComponent,
        Enrollment_CommissionDialogComponent,
        Enrollment_CommissionDeleteDialogComponent,
        Enrollment_CommissionPopupComponent,
        Enrollment_CommissionDeletePopupComponent,
    ],
    entryComponents: [
        Enrollment_CommissionComponent,
        Enrollment_CommissionDialogComponent,
        Enrollment_CommissionPopupComponent,
        Enrollment_CommissionDeleteDialogComponent,
        Enrollment_CommissionDeletePopupComponent,
    ],
    providers: [
        Enrollment_CommissionService,
        Enrollment_CommissionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesEnrollment_CommissionModule {}
