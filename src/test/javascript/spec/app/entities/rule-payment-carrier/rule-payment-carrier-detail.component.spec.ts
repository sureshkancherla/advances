/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_CarrierDetailComponent } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier-detail.component';
import { Rule_Payment_CarrierService } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.service';
import { Rule_Payment_Carrier } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.model';

describe('Component Tests', () => {

    describe('Rule_Payment_Carrier Management Detail Component', () => {
        let comp: Rule_Payment_CarrierDetailComponent;
        let fixture: ComponentFixture<Rule_Payment_CarrierDetailComponent>;
        let service: Rule_Payment_CarrierService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_CarrierDetailComponent],
                providers: [
                    Rule_Payment_CarrierService
                ]
            })
            .overrideTemplate(Rule_Payment_CarrierDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_CarrierDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_CarrierService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Rule_Payment_Carrier(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rule_Payment_Carrier).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
