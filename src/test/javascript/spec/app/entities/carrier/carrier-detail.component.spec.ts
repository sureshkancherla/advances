/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { CarrierDetailComponent } from '../../../../../../main/webapp/app/entities/carrier/carrier-detail.component';
import { CarrierService } from '../../../../../../main/webapp/app/entities/carrier/carrier.service';
import { Carrier } from '../../../../../../main/webapp/app/entities/carrier/carrier.model';

describe('Component Tests', () => {

    describe('Carrier Management Detail Component', () => {
        let comp: CarrierDetailComponent;
        let fixture: ComponentFixture<CarrierDetailComponent>;
        let service: CarrierService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [CarrierDetailComponent],
                providers: [
                    CarrierService
                ]
            })
            .overrideTemplate(CarrierDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarrierDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarrierService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Carrier(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.carrier).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
