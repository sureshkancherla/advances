import { BaseEntity } from './../../shared';

export class Carrier implements BaseEntity {
    constructor(
        public id?: BaseEntity,
        public name?: string,
        public hiosId?: string,
    ) {
    }
}
