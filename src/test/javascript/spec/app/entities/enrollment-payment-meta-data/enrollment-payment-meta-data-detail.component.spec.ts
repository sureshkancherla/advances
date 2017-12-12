/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_Payment_MetaDataDetailComponent } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data-detail.component';
import { Enrollment_Payment_MetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.service';
import { Enrollment_Payment_MetaData } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.model';

describe('Component Tests', () => {

    describe('Enrollment_Payment_MetaData Management Detail Component', () => {
        let comp: Enrollment_Payment_MetaDataDetailComponent;
        let fixture: ComponentFixture<Enrollment_Payment_MetaDataDetailComponent>;
        let service: Enrollment_Payment_MetaDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_Payment_MetaDataDetailComponent],
                providers: [
                    Enrollment_Payment_MetaDataService
                ]
            })
            .overrideTemplate(Enrollment_Payment_MetaDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_Payment_MetaDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_Payment_MetaDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Enrollment_Payment_MetaData(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enrollment_Payment_MetaData).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
