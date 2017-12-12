/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { CarrierDialogComponent } from '../../../../../../main/webapp/app/entities/carrier/carrier-dialog.component';
import { CarrierService } from '../../../../../../main/webapp/app/entities/carrier/carrier.service';
import { Carrier } from '../../../../../../main/webapp/app/entities/carrier/carrier.model';
import { RulePaymentCarrierService } from '../../../../../../main/webapp/app/entities/rule-payment-carrier';

describe('Component Tests', () => {

    describe('Carrier Management Dialog Component', () => {
        let comp: CarrierDialogComponent;
        let fixture: ComponentFixture<CarrierDialogComponent>;
        let service: CarrierService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [CarrierDialogComponent],
                providers: [
                    RulePaymentCarrierService,
                    CarrierService
                ]
            })
            .overrideTemplate(CarrierDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarrierDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarrierService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Carrier(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.carrier = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'carrierListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Carrier();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.carrier = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'carrierListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
