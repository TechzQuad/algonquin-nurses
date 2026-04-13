import { getPayload, type Payload } from "payload";
import config from "@payload-config";

const globalForPayload = globalThis as unknown as {
  payload: Payload | null;
  payloadPromise: Promise<Payload> | null;
};

globalForPayload.payload ??= null;
globalForPayload.payloadPromise ??= null;

export async function getPayloadClient(): Promise<Payload> {
  if (globalForPayload.payload) return globalForPayload.payload;
  if (!globalForPayload.payloadPromise) {
    globalForPayload.payloadPromise = getPayload({ config }).then((p) => {
      globalForPayload.payload = p;
      return p;
    });
  }
  return globalForPayload.payloadPromise;
}
