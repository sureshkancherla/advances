import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdvancesLookupModule } from './lookup/lookup.module';
import { AdvancesTenantModule } from './tenant/tenant.module';
import { AdvancesCarrierModule } from './carrier/carrier.module';
import { AdvancesAgent_PayoutModule } from './agent-payout/agent-payout.module';
import { AdvancesEnrollmentModule } from './enrollment/enrollment.module';
import { AdvancesEnrollment_Payment_MetaDataModule } from './enrollment-payment-meta-data/enrollment-payment-meta-data.module';
import { AdvancesRule_Payment_AgentModule } from './rule-payment-agent/rule-payment-agent.module';
import { AdvancesRule_Payment_CarrierModule } from './rule-payment-carrier/rule-payment-carrier.module';
import { AdvancesEnrollment_CommissionModule } from './enrollment-commission/enrollment-commission.module';
import { AdvancesAgentModule } from './agent/agent.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AdvancesLookupModule,
        AdvancesTenantModule,
        AdvancesCarrierModule,
        AdvancesAgent_PayoutModule,
        AdvancesEnrollmentModule,
        AdvancesEnrollment_Payment_MetaDataModule,
        AdvancesRule_Payment_AgentModule,
        AdvancesRule_Payment_CarrierModule,
        AdvancesEnrollment_CommissionModule,
        AdvancesAgentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancesEntityModule {}
