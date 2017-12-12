import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdvancesSharedModule } from '../../shared';
import {
    TenantService,
    TenantPopupService,
    TenantComponent,
    TenantDetailComponent,
    TenantDialogComponent,
    TenantPopupComponent,
    TenantDeletePopupComponent,
    TenantDeleteDialogComponent,
    tenantRoute,
    tenantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tenantRoute,
    ...tenantPopupRoute,
];

@NgModule({
    imports: [
        AdvancesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TenantComponent,
        TenantDetailComponent,
        TenantDialogComponent,
        TenantDeleteDialogComponent,
        TenantPopupComponent,
        TenantDeletePopupComponent,
    ],
    entryComponents: [
        TenantComponent,
        TenantDialogComponent,
        TenantPopupComponent,
        TenantDeleteDialogComponent,
        TenantDeletePopupComponent,
    ],
    providers: [
        TenantService,
        TenantPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesTenantModule {}
