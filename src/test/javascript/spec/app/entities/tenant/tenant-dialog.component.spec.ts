/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { TenantDialogComponent } from '../../../../../../main/webapp/app/entities/tenant/tenant-dialog.component';
import { TenantService } from '../../../../../../main/webapp/app/entities/tenant/tenant.service';
import { Tenant } from '../../../../../../main/webapp/app/entities/tenant/tenant.model';

describe('Component Tests', () => {

    describe('Tenant Management Dialog Component', () => {
        let comp: TenantDialogComponent;
        let fixture: ComponentFixture<TenantDialogComponent>;
        let service: TenantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [TenantDialogComponent],
                providers: [
                    TenantService
                ]
            })
            .overrideTemplate(TenantDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TenantDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TenantService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Tenant(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.tenant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tenantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Tenant();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.tenant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tenantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
