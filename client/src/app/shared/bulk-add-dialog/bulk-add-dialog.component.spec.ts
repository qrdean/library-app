import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkAddDialogComponent } from './bulk-add-dialog.component';

describe('BulkAddDialogComponent', () => {
  let component: BulkAddDialogComponent;
  let fixture: ComponentFixture<BulkAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
