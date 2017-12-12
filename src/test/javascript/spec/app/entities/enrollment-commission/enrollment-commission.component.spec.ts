/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_CommissionComponent } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.component';
import { Enrollment_CommissionService } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.service';
import { Enrollment_Commission } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.model';

describe('Component Tests', () => {

    describe('Enrollment_Commission Management Component', () => {
        let comp: Enrollment_CommissionComponent;
        let fixture: ComponentFixture<Enrollment_CommissionComponent>;
        let service: Enrollment_CommissionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_CommissionComponent],
                providers: [
                    Enrollment_CommissionService
                ]
            })
            .overrideTemplate(Enrollment_CommissionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_CommissionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_CommissionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Enrollment_Commission(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enrollment_Commissions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
