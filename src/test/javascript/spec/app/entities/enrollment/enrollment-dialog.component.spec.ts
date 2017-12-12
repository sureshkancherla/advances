/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { EnrollmentDialogComponent } from '../../../../../../main/webapp/app/entities/enrollment/enrollment-dialog.component';
import { EnrollmentService } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.service';
import { Enrollment } from '../../../../../../main/webapp/app/entities/enrollment/enrollment.model';
import { EnrollmentPaymentMetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data';
import { AgentService } from '../../../../../../main/webapp/app/entities/agent';
import { TenantService } from '../../../../../../main/webapp/app/entities/tenant';

describe('Component Tests', () => {

    describe('Enrollment Management Dialog Component', () => {
        let comp: EnrollmentDialogComponent;
        let fixture: ComponentFixture<EnrollmentDialogComponent>;
        let service: EnrollmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [EnrollmentDialogComponent],
                providers: [
                    EnrollmentPaymentMetaDataService,
                    AgentService,
                    TenantService,
                    EnrollmentService
                ]
            })
            .overrideTemplate(EnrollmentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnrollmentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnrollmentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.enrollment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.enrollment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
