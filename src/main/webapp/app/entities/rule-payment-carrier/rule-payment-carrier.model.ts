import { BaseEntity } from './../../shared';

export class Rule_Payment_Carrier implements BaseEntity {
    constructor(
        public id?: BaseEntity,
        public carrierId?: string,
        public carrierCommisionRule?: any,
        public advanceRule?: any,
        public carrier?: BaseEntity,
    ) {
    }
}
