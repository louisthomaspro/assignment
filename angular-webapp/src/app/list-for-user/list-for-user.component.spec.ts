import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForUserComponent } from './list-for-user.component';

describe('ListForUserComponent', () => {
  let component: ListForUserComponent;
  let fixture: ComponentFixture<ListForUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListForUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
