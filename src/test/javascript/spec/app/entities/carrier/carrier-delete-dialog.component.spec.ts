/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AdvancesTestModule } from '../../../test.module';
import { CarrierDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/carrier/carrier-delete-dialog.component';
import { CarrierService } from '../../../../../../main/webapp/app/entities/carrier/carrier.service';

describe('Component Tests', () => {

    describe('Carrier Management Delete Component', () => {
        let comp: CarrierDeleteDialogComponent;
        let fixture: ComponentFixture<CarrierDeleteDialogComponent>;
        let service: CarrierService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AdvancesTestModule],
                declarations: [CarrierDeleteDialogComponent],
                providers: [
                    CarrierService
                ]
            })
            .overrideTemplate(CarrierDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CarrierDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarrierService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
