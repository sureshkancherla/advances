/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_AgentDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent-delete-dialog.component';
import { Rule_Payment_AgentService } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.service';

describe('Component Tests', () => {

    describe('Rule_Payment_Agent Management Delete Component', () => {
        let comp: Rule_Payment_AgentDeleteDialogComponent;
        let fixture: ComponentFixture<Rule_Payment_AgentDeleteDialogComponent>;
        let service: Rule_Payment_AgentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_AgentDeleteDialogComponent],
                providers: [
                    Rule_Payment_AgentService
                ]
            })
            .overrideTemplate(Rule_Payment_AgentDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_AgentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_AgentService);
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
