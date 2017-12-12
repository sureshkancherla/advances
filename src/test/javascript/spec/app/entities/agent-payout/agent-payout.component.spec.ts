/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { Agent_PayoutComponent } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.component';
import { Agent_PayoutService } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.service';
import { Agent_Payout } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.model';

describe('Component Tests', () => {

    describe('Agent_Payout Management Component', () => {
        let comp: Agent_PayoutComponent;
        let fixture: ComponentFixture<Agent_PayoutComponent>;
        let service: Agent_PayoutService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Agent_PayoutComponent],
                providers: [
                    Agent_PayoutService
                ]
            })
            .overrideTemplate(Agent_PayoutComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Agent_PayoutComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Agent_PayoutService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Agent_Payout(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.agent_Payouts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
