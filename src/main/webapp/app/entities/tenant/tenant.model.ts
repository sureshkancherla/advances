import { BaseEntity } from './../../shared';

export class Tenant implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public parentCode?: string,
        public tenantId?: string,
        public ids?: BaseEntity[],
        public parentTenant?: BaseEntity,
    ) {
    }
}
