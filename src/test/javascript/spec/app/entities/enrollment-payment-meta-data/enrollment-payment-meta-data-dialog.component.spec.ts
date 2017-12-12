/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Enrollment_Payment_MetaDataDialogComponent } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data-dialog.component';
import { Enrollment_Payment_MetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.service';
import { Enrollment_Payment_MetaData } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data/enrollment-payment-meta-data.model';
import { EnrollmentService } from '../../../../../../main/webapp/app/entities/enrollment';
import { RulePaymentAgentService } from '../../../../../../main/webapp/app/entities/rule-payment-agent';
import { RulePaymentCarrierService } from '../../../../../../main/webapp/app/entities/rule-payment-carrier';

describe('Component Tests', () => {

    describe('Enrollment_Payment_MetaData Management Dialog Component', () => {
        let comp: Enrollment_Payment_MetaDataDialogComponent;
        let fixture: ComponentFixture<Enrollment_Payment_MetaDataDialogComponent>;
        let service: Enrollment_Payment_MetaDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Enrollment_Payment_MetaDataDialogComponent],
                providers: [
                    EnrollmentService,
                    RulePaymentAgentService,
                    RulePaymentCarrierService,
                    Enrollment_Payment_MetaDataService
                ]
            })
            .overrideTemplate(Enrollment_Payment_MetaDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Enrollment_Payment_MetaDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Enrollment_Payment_MetaDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment_Payment_MetaData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.enrollment_Payment_MetaData = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollment_Payment_MetaDataListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Enrollment_Payment_MetaData();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.enrollment_Payment_MetaData = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'enrollment_Payment_MetaDataListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
