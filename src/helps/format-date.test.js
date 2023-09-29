import { describe, expect, it } from "vitest";
import { DEFAULT_DATE_LOCALE, ERROR_MESSAGE_DATE_IS_REQUIRED, ERROR_MESSAGE_FORMAT_DATE_IS_NOT_VALID, formatDate } from "./format-date";

describe("Function formatDate()", () => {
    it(`Should show the error message ${ERROR_MESSAGE_DATE_IS_REQUIRED} when the date is undefined`, () => {
        const wrapFormatDate = () => formatDate()

        expect(wrapFormatDate).toThrowError(ERROR_MESSAGE_DATE_IS_REQUIRED)
    })

    it(`Should show the error message ${ERROR_MESSAGE_FORMAT_DATE_IS_NOT_VALID} when the format date is not valid`, () => {
        const wrapFormatDate = () => formatDate("Invalid")

        expect(wrapFormatDate).toThrowError(ERROR_MESSAGE_FORMAT_DATE_IS_NOT_VALID)
    })

    it(`Should format the date with the default locale ${DEFAULT_DATE_LOCALE}`, () => {
        const date = new Date("1995-12-17T00:00:00")
        const result = formatDate(date)

        const expected = "12/17/1995"
        expect(result).toBe(expected)
    })

    it("Should format the date as per the options set", () => {
        const date = new Date("1995-12-17T00:00:00")
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const result = formatDate(date, options)

        const expected = "Sunday, December 17, 1995"
        expect(result).toBe(expected)
    })
})