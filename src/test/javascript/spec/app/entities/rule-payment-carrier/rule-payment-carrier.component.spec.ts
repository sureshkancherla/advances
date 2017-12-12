/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { Rule_Payment_CarrierComponent } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.component';
import { Rule_Payment_CarrierService } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.service';
import { Rule_Payment_Carrier } from '../../../../../../main/webapp/app/entities/rule-payment-carrier/rule-payment-carrier.model';

describe('Component Tests', () => {

    describe('Rule_Payment_Carrier Management Component', () => {
        let comp: Rule_Payment_CarrierComponent;
        let fixture: ComponentFixture<Rule_Payment_CarrierComponent>;
        let service: Rule_Payment_CarrierService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [Rule_Payment_CarrierComponent],
                providers: [
                    Rule_Payment_CarrierService
                ]
            })
            .overrideTemplate(Rule_Payment_CarrierComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Rule_Payment_CarrierComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Rule_Payment_CarrierService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Rule_Payment_Carrier(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rule_Payment_Carriers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
