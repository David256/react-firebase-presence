import firebase from 'firebase/compat/app';
import type { SessionPayload } from './types';
import { sessionStatus } from './constants';

export function createSessionPayload<T = any>(userId: string, organizationId: string) {
  const payload: SessionPayload<T> = {
    userId,
    organizationId,
    startTimestamp: firebase.database.ServerValue.TIMESTAMP,
    status: sessionStatus.ONLINE,
  };

  return payload;
}

/**
 * Given an session payload, this function modifies it to convert to a session
 * payload that says offline.
 * 
 * @param payload The sesion payload.
 * @returns A modified session payload.
 */
 export function destroySessionPayload<T = any>(payload: SessionPayload<T>): SessionPayload<T> {
  const newPayload = { ...payload };
  delete newPayload.startTimestamp;
  newPayload.status = sessionStatus.OFFLINE;
  newPayload.endTimestamp = firebase.database.ServerValue.TIMESTAMP;
  return newPayload;
};