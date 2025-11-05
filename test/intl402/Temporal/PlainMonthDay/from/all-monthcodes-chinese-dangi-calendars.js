// Copyright (C) 2023 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plainmonthday.from
description: Verify that PlainMonthDay can be created for every valid monthcode in Chinese calenar
info: |
    sec-temporal.plainmonthday.from step 3:
      3. Return ? ToTemporalMonthDay(_item_, _options_).
    sec-temporal-totemporalmonthday step 11.:
      11. Set result to ? CreateTemporalMonthDay(_result_.[[Month]], _result_.[[Day]], _calendar_, _result_.[[Year]]).
includes: [temporalHelpers.js]
features: [Temporal]
---*/

// valid leap monthcode/day combos. We do not test leap months/days that do not occur between 1900 and 2034
// See https://github.com/unicode-org/icu4x/blob/main/components/calendar/src/cal/east_asian_traditional.rs#L219
// for calculated table

const knownLeapDates = [
  { monthCode: "M02L", day: 29, referenceYear: 1947 },
  { monthCode: "M03L", day: 29, referenceYear: 1966 },
  { monthCode: "M04L", day: 29, referenceYear: 1963 },
  { monthCode: "M05L", day: 29, referenceYear: 1971 },
  { monthCode: "M06L", day: 29, referenceYear: 1960 },
  { monthCode: "M07L", day: 29, referenceYear: 1968 },
  { monthCode: "M08L", day: 29, referenceYear: 1957 },
  { monthCode: "M09L", day: 29, referenceYear: 2014 },
  { monthCode: "M10L", day: 29, referenceYear: 1984 },
  { monthCode: "M11L", day: 29, referenceYear: 2033 },
  { monthCode: "M03L", day: 30, referenceYear: 1955 },
  { monthCode: "M04L", day: 30, referenceYear: 1944 },
  { monthCode: "M05L", day: 30, referenceYear: 1952 },
  { monthCode: "M06L", day: 30, referenceYear: 1941 },
  { monthCode: "M07L", day: 30, referenceYear: 1938 }
]

const calendars = ["chinese", "dangi"];

for (const calendar of calendars){
  for (const knownLeapDate of knownLeapDates){
    let monthDay = Temporal.PlainMonthDay.from({calendar, monthCode: knownLeapDate.monthCode, day: knownLeapDate.day});
    let plainMonthDayReferenceYear = Number(monthDay.toString({ calendarName: "always" }).split("-")[0]);
    assert.sameValue(plainMonthDayReferenceYear, knownLeapDate.referenceYear, "PlainMonthDay reference year " + plainMonthDayReferenceYear + " does not match correct reference year " + knownLeapDate.referenceYear)
  }
}
