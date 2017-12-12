import { BaseEntity } from './../../shared';

export class Agent implements BaseEntity {
    constructor(
        public id?: BaseEntity,
        public agentId?: string,
        public agentNPN?: string,
        public eligibleForAdvances?: boolean,
        public tenantId?: string,
        public ids?: BaseEntity[],
        public tenant?: BaseEntity,
    ) {
        this.eligibleForAdvances = false;
    }
}
