import { BaseEntity } from './../../shared';

export class Agent_Payout implements BaseEntity {
    constructor(
        public id?: number,
        public agentId?: string,
        public paymentTypeId?: string,
        public paymentAmount?: number,
        public enrollmentId?: string,
        public payoutRule?: any,
        public paymentType?: BaseEntity,
        public agent?: BaseEntity,
    ) {
    }
}
