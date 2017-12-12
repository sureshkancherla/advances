/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_CommissionDetailComponent } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission-detail.component';
import { Enrollment_CommissionService } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.service';
import { Enrollment_Commission } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.model';

describe('Component Tests', () => {

    describe('Enrollment_Commission Management Detail Component', () => {
        let comp: Enrollment_CommissionDetailComponent;
        let fixture: ComponentFixture<Enrollment_CommissionDetailComponent>;
        let service: Enrollment_CommissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_CommissionDetailComponent],
                providers: [
                    Enrollment_CommissionService
                ]
            })
            .overrideTemplate(Enrollment_CommissionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_CommissionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_CommissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Enrollment_Commission(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.enrollment_Commission).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
