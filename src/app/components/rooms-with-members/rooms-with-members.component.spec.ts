import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsWithMembersComponent } from './rooms-with-members.component';

describe('RoomsWithMembersComponent', () => {
  let component: RoomsWithMembersComponent;
  let fixture: ComponentFixture<RoomsWithMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsWithMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsWithMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
