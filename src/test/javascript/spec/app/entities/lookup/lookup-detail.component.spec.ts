/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { LookupDetailComponent } from '../../../../../../main/webapp/app/entities/lookup/lookup-detail.component';
import { LookupService } from '../../../../../../main/webapp/app/entities/lookup/lookup.service';
import { Lookup } from '../../../../../../main/webapp/app/entities/lookup/lookup.model';

describe('Component Tests', () => {

    describe('Lookup Management Detail Component', () => {
        let comp: LookupDetailComponent;
        let fixture: ComponentFixture<LookupDetailComponent>;
        let service: LookupService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [LookupDetailComponent],
                providers: [
                    LookupService
                ]
            })
            .overrideTemplate(LookupDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LookupDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LookupService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Lookup(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lookup).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
