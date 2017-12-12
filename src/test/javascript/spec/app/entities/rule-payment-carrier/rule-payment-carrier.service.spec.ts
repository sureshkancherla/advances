/* tslint:disable max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { JhiDateUtils } from 'ng-jhipster';

import { Rule_Payment_CarrierService } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.service';
import { Rule_Payment_Carrier } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.model';

describe('Service Tests', () => {

    describe('Rule_Payment_Carrier Service', () => {
        let service: Rule_Payment_CarrierService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: ConnectionBackend,
                        useClass: MockBackend
                    },
                    {
                        provide: RequestOptions,
                        useClass: BaseRequestOptions
                    },
                    Http,
                    JhiDateUtils,
                    Rule_Payment_CarrierService
                ]
            });

            service = TestBed.get(Rule_Payment_CarrierService);

            this.backend = TestBed.get(ConnectionBackend) as MockBackend;
            this.backend.connections.subscribe((connection: any) => {
                this.lastConnection = connection;
            });
        }));

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                expect(this.lastConnection).toBeDefined();
                expect(this.lastConnection.request.url).toEqual('api/rule-payment-carriers/' + 123);
            });
            it('should return Rule_Payment_Carrier', () => {

                let entity: Rule_Payment_Carrier;
                service.find(123).subscribe((_entity: Rule_Payment_Carrier) => {
                    entity = _entity;
                });

                this.lastConnection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify({id: 123}),
                })));

                expect(entity).toBeDefined();
                expect(entity.id).toEqual(123);
            });

            it('should propagate not found response', () => {

                let error: any;
                service.find(123).subscribe(null, (_error: any) => {
                    error = _error;
                });

                this.lastConnection.mockError(new Response(new ResponseOptions({
                    status: 404,
                })));

                expect(error).toBeDefined();
                expect(error.status).toEqual(404);
            });
        });
    });

});
