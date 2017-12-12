import { BaseEntity } from './../../shared';

export class Enrollment implements BaseEntity {
    constructor(
        public id?: BaseEntity,
        public agentId?: string,
        public ids?: BaseEntity[],
        public agent?: BaseEntity,
        public tenant?: BaseEntity,
    ) {
    }
}
