/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_AgentDialogComponent } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent-dialog.component';
import { Rule_Payment_AgentService } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.service';
import { Rule_Payment_Agent } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.model';
import { EnrollmentPaymentMetaDataService } from '../../../../../../main/webapp/app/entities/enrollment-payment-meta-data';
import { AgentService } from '../../../../../../main/webapp/app/entities/agent';

describe('Component Tests', () => {

    describe('Rule_Payment_Agent Management Dialog Component', () => {
        let comp: Rule_Payment_AgentDialogComponent;
        let fixture: ComponentFixture<Rule_Payment_AgentDialogComponent>;
        let service: Rule_Payment_AgentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_AgentDialogComponent],
                providers: [
                    EnrollmentPaymentMetaDataService,
                    AgentService,
                    Rule_Payment_AgentService
                ]
            })
            .overrideTemplate(Rule_Payment_AgentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_AgentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_AgentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Rule_Payment_Agent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.rule_Payment_Agent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rule_Payment_AgentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Rule_Payment_Agent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.rule_Payment_Agent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rule_Payment_AgentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
