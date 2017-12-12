/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Agent_PayoutDialogComponent } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout-dialog.component';
import { Agent_PayoutService } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.service';
import { Agent_Payout } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.model';
import { LookupService } from '../../../../../../main/webapp/app/entities/lookup';
import { AgentService } from '../../../../../../main/webapp/app/entities/agent';

describe('Component Tests', () => {

    describe('Agent_Payout Management Dialog Component', () => {
        let comp: Agent_PayoutDialogComponent;
        let fixture: ComponentFixture<Agent_PayoutDialogComponent>;
        let service: Agent_PayoutService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Agent_PayoutDialogComponent],
                providers: [
                    LookupService,
                    AgentService,
                    Agent_PayoutService
                ]
            })
            .overrideTemplate(Agent_PayoutDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Agent_PayoutDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Agent_PayoutService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Agent_Payout(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.agent_Payout = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'agent_PayoutListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Agent_Payout();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.agent_Payout = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'agent_PayoutListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
