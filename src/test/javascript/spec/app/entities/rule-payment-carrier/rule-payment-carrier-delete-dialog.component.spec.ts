/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_CarrierDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier-delete-dialog.component';
import { Rule_Payment_CarrierService } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.service';

describe('Component Tests', () => {

    describe('Rule_Payment_Carrier Management Delete Component', () => {
        let comp: Rule_Payment_CarrierDeleteDialogComponent;
        let fixture: ComponentFixture<Rule_Payment_CarrierDeleteDialogComponent>;
        let service: Rule_Payment_CarrierService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_CarrierDeleteDialogComponent],
                providers: [
                    Rule_Payment_CarrierService
                ]
            })
            .overrideTemplate(Rule_Payment_CarrierDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_CarrierDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_CarrierService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
