/* tslint:disable max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { JhiDateUtils } from 'ng-jhipster';

import { Enrollment_Payment_MetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.service';
import { Enrollment_Payment_MetaData } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.model';

describe('Service Tests', () => {

    describe('Enrollment_Payment_MetaData Service', () => {
        let service: Enrollment_Payment_MetaDataService;

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
                    Enrollment_Payment_MetaDataService
                ]
            });

            service = TestBed.get(Enrollment_Payment_MetaDataService);

            this.backend = TestBed.get(ConnectionBackend) as MockBackend;
            this.backend.connections.subscribe((connection: any) => {
                this.lastConnection = connection;
            });
        }));

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                expect(this.lastConnection).toBeDefined();
                expect(this.lastConnection.request.url).toEqual('api/enrollment-payment-meta-data/' + 123);
            });
            it('should return Enrollment_Payment_MetaData', () => {

                let entity: Enrollment_Payment_MetaData;
                service.find(123).subscribe((_entity: Enrollment_Payment_MetaData) => {
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
