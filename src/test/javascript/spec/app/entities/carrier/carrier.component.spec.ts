/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { AdvancesTestModule } from '../../../test.module';
import { CarrierComponent } from '../../../../../../main/webapp/app/entities/carrier/carrier.component';
import { CarrierService } from '../../../../../../main/webapp/app/entities/carrier/carrier.service';
import { Carrier } from '../../../../../../main/webapp/app/entities/carrier/carrier.model';

describe('Component Tests', () => {

    describe('Carrier Management Component', () => {
        let comp: CarrierComponent;
        let fixture: ComponentFixture<CarrierComponent>;
        let service: CarrierService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [CarrierComponent],
                providers: [
                    CarrierService
                ]
            })
            .overrideTemplate(CarrierComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarrierComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarrierService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Carrier(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.carriers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
