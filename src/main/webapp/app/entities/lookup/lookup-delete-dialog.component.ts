import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Lookup } from './lookup.model';
import { LookupPopupService } from './lookup-popup.service';
import { LookupService } from './lookup.service';

@Component({
    selector: 'jhi-lookup-delete-dialog',
    templateUrl: './lookup-delete-dialog.component.html'
})
export class LookupDeleteDialogComponent {

    lookup: Lookup;

    constructor(
        private lookupService: LookupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lookupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lookupListModification',
                content: 'Deleted an lookup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lookup-delete-popup',
    template: ''
})
export class LookupDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lookupPopupService: LookupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lookupPopupService
                .open(LookupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
