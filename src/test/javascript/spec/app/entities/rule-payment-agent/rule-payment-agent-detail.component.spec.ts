/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_AgentDetailComponent } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent-detail.component';
import { Rule_Payment_AgentService } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.service';
import { Rule_Payment_Agent } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.model';

describe('Component Tests', () => {

    describe('Rule_Payment_Agent Management Detail Component', () => {
        let comp: Rule_Payment_AgentDetailComponent;
        let fixture: ComponentFixture<Rule_Payment_AgentDetailComponent>;
        let service: Rule_Payment_AgentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_AgentDetailComponent],
                providers: [
                    Rule_Payment_AgentService
                ]
            })
            .overrideTemplate(Rule_Payment_AgentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_AgentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_AgentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Rule_Payment_Agent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rule_Payment_Agent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
