/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Agent_PayoutDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout-delete-dialog.component';
import { Agent_PayoutService } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.service';

describe('Component Tests', () => {

    describe('Agent_Payout Management Delete Component', () => {
        let comp: Agent_PayoutDeleteDialogComponent;
        let fixture: ComponentFixture<Agent_PayoutDeleteDialogComponent>;
        let service: Agent_PayoutService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Agent_PayoutDeleteDialogComponent],
                providers: [
                    Agent_PayoutService
                ]
            })
            .overrideTemplate(Agent_PayoutDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Agent_PayoutDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Agent_PayoutService);
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
