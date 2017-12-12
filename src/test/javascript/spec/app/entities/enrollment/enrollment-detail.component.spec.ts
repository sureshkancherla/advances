/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { EnrollmentDetailComponent } from '../../../../../../main/webapp/app/entities/enrollment/enrollment-detail.component';
import { EnrollmentService } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.service';
import { Enrollment } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.model';

describe('Component Tests', () => {

    describe('Enrollment Management Detail Component', () => {
        let comp: EnrollmentDetailComponent;
        let fixture: ComponentFixture<EnrollmentDetailComponent>;
        let service: EnrollmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [EnrollmentDetailComponent],
                providers: [
                    EnrollmentService
                ]
            })
            .overrideTemplate(EnrollmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Enrollment(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enrollment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
