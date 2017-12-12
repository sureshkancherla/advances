import { BaseEntity } from './../../shared';

export class Lookup implements BaseEntity {
    constructor(
        public id?: BaseEntity,
        public type?: string,
        public value?: string,
    ) {
    }
}
