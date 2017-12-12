import { BaseEntity } from './../../shared';

export class Enrollment_Payment_MetaData implements BaseEntity {
    constructor(
        public id?: number,
        public enrollmentId?: string,
        public agentId?: string,
        public isAdvancable?: boolean,
        public carrierCommissionRuleId?: string,
        public agentCommisionRuleId?: string,
        public enrollment?: BaseEntity,
        public agentCommissionRule?: BaseEntity,
        public carrierCommissionRule?: BaseEntity,
    ) {
        this.isAdvancable = false;
    }
}
