/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { EnrollmentComponent } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.component';
import { EnrollmentService } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.service';
import { Enrollment } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.model';

describe('Component Tests', () => {

    describe('Enrollment Management Component', () => {
        let comp: EnrollmentComponent;
        let fixture: ComponentFixture<EnrollmentComponent>;
        let service: EnrollmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [EnrollmentComponent],
                providers: [
                    EnrollmentService
                ]
            })
            .overrideTemplate(EnrollmentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Enrollment(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.enrollments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
