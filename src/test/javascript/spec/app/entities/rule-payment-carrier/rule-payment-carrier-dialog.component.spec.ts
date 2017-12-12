/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_CarrierDialogComponent } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier-dialog.component';
import { Rule_Payment_CarrierService } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.service';
import { Rule_Payment_Carrier } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.model';
import { EnrollmentPaymentMetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data';
import { CarrierService } from '../../../../../../main/webapp/app/entities/carrier';

describe('Component Tests', () => {

    describe('Rule_Payment_Carrier Management Dialog Component', () => {
        let comp: Rule_Payment_CarrierDialogComponent;
        let fixture: ComponentFixture<Rule_Payment_CarrierDialogComponent>;
        let service: Rule_Payment_CarrierService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_CarrierDialogComponent],
                providers: [
                    EnrollmentPaymentMetaDataService,
                    CarrierService,
                    Rule_Payment_CarrierService
                ]
            })
            .overrideTemplate(Rule_Payment_CarrierDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_CarrierDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_CarrierService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Rule_Payment_Carrier(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rule_Payment_Carrier = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rule_Payment_CarrierListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Rule_Payment_Carrier();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rule_Payment_Carrier = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rule_Payment_CarrierListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
