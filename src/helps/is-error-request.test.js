import { describe, expect, it } from "vitest";
import { isErrorRequest } from "./is-error-request";

describe('Function isErrorRequest()', () => {
    it('should return true when the error is falsy', () => {
        const result = isErrorRequest();

        expect(result).toBe(true)
    })

    it('should return true when the response is undefined', () => {
        const error = { response: undefined }
        const result = isErrorRequest(error);

        expect(result).toBe(true)
    })

    it('should return true when the data is null', () => {
        const error = { response: { data: null } }
        const result = isErrorRequest(error);

        expect(result).toBe(true)
    })
})