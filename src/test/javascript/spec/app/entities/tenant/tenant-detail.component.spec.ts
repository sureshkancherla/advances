/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { AdvancesTestModule } from '../../../test.module';
import { TenantDetailComponent } from '../../../../../../main/webapp/app/entities/tenant/tenant-detail.component';
import { TenantService } from '../../../../../../main/webapp/app/entities/tenant/tenant.service';
import { Tenant } from '../../../../../../main/webapp/app/entities/tenant/tenant.model';

describe('Component Tests', () => {

    describe('Tenant Management Detail Component', () => {
        let comp: TenantDetailComponent;
        let fixture: ComponentFixture<TenantDetailComponent>;
        let service: TenantService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [TenantDetailComponent],
                providers: [
                    TenantService
                ]
            })
            .overrideTemplate(TenantDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TenantDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TenantService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Tenant(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tenant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
