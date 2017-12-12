/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_Payment_MetaDataComponent } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.component';
import { Enrollment_Payment_MetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.service';
import { Enrollment_Payment_MetaData } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.model';

describe('Component Tests', () => {

    describe('Enrollment_Payment_MetaData Management Component', () => {
        let comp: Enrollment_Payment_MetaDataComponent;
        let fixture: ComponentFixture<Enrollment_Payment_MetaDataComponent>;
        let service: Enrollment_Payment_MetaDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_Payment_MetaDataComponent],
                providers: [
                    Enrollment_Payment_MetaDataService
                ]
            })
            .overrideTemplate(Enrollment_Payment_MetaDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_Payment_MetaDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_Payment_MetaDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Enrollment_Payment_MetaData(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enrollment_Payment_MetaData[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
