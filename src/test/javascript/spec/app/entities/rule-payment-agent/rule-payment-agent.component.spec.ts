/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_AgentComponent } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.component';
import { Rule_Payment_AgentService } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.service';
import { Rule_Payment_Agent } from '../../../../../../main/webapp/app/entities/rule-payment-agent/rule-payment-agent.model';

describe('Component Tests', () => {

    describe('Rule_Payment_Agent Management Component', () => {
        let comp: Rule_Payment_AgentComponent;
        let fixture: ComponentFixture<Rule_Payment_AgentComponent>;
        let service: Rule_Payment_AgentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_AgentComponent],
                providers: [
                    Rule_Payment_AgentService
                ]
            })
            .overrideTemplate(Rule_Payment_AgentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_AgentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_AgentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Rule_Payment_Agent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rule_Payment_Agents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
