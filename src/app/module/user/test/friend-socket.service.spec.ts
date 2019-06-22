import { TestBed } from '@angular/core/testing';

import { FriendSocketService } from '../service/friend-socket.service';

describe('FriendSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendSocketService = TestBed.get(FriendSocketService);
    expect(service).toBeTruthy();
  });
});
