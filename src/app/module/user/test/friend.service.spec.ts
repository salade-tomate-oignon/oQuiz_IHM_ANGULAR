import { TestBed } from '@angular/core/testing';

import { FriendService } from '../service/friend.service';

describe('FriendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendService = TestBed.get(FriendService);
    expect(service).toBeTruthy();
  });
});
