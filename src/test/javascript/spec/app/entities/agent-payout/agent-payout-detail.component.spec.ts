/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { Agent_PayoutDetailComponent } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout-detail.component';
import { Agent_PayoutService } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.service';
import { Agent_Payout } from '../../../../../../main/webapp/app/entities/agent-payout/agent-payout.model';

describe('Component Tests', () => {

    describe('Agent_Payout Management Detail Component', () => {
        let comp: Agent_PayoutDetailComponent;
        let fixture: ComponentFixture<Agent_PayoutDetailComponent>;
        let service: Agent_PayoutService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Agent_PayoutDetailComponent],
                providers: [
                    Agent_PayoutService
                ]
            })
            .overrideTemplate(Agent_PayoutDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Agent_PayoutDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Agent_PayoutService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Agent_Payout(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.agent_Payout).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
