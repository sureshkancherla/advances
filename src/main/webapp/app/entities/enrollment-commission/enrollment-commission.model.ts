import { BaseEntity } from './../../shared';

export class Enrollment_Commission implements BaseEntity {
    constructor(
        public id?: number,
        public commissionAmount?: number,
        public enrollmetId?: string,
        public statementDate?: any,
        public enrollmet?: BaseEntity,
    ) {
    }
}
