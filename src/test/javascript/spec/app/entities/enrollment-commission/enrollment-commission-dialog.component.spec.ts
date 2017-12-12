/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_CommissionDialogComponent } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission-dialog.component';
import { Enrollment_CommissionService } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.service';
import { Enrollment_Commission } from '../../../../../../main/webapp/app/entities/enrollment-commission/enrollment-commission.model';
import { EnrollmentService } from '../../../../../../main/webapp/app/entities/enrollment';

describe('Component Tests', () => {

    describe('Enrollment_Commission Management Dialog Component', () => {
        let comp: Enrollment_CommissionDialogComponent;
        let fixture: ComponentFixture<Enrollment_CommissionDialogComponent>;
        let service: Enrollment_CommissionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_CommissionDialogComponent],
                providers: [
                    EnrollmentService,
                    Enrollment_CommissionService
                ]
            })
            .overrideTemplate(Enrollment_CommissionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_CommissionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_CommissionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment_Commission(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.enrollment_Commission = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollment_CommissionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment_Commission();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.enrollment_Commission = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollment_CommissionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
