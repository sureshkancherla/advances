import { BaseEntity } from './../../shared';

export class Rule_Payment_Agent implements BaseEntity {
    constructor(
        public id?: BaseEntity,
        public agentCommisionRule?: any,
        public agentId?: string,
        public agent?: BaseEntity,
    ) {
    }
}
