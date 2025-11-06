// Copyright (C) 2025 Igalia, S.L.. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindate.prototype.add
description: Add duration with months and weeks and calculate correctly
info: |
  8. Let result be ? AddISODate(date.[[ISOYear]], date.[[ISOMonth]], date.[[ISODay]], duration.[[Years]], duration.[[Months]], duration.[[Weeks]], duration.[[Days]], overflow).
features: [Temporal]
includes: [temporalHelpers.js]
---*/

const calendars = ["chinese", "dangi"];

const p2m3w = new Temporal.Duration(0,2,3);

for (const calendar of calendars) {
  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1947,
        monthCode:"M02L",
        day: 29,
        calendar
      }).add(p2m3w),
        1947, 6, "M05", 20, "add 2 months 3 weeks from last day leap month without leap day"
  );

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1955,
        monthCode:"M03L",
        day: 30,
        calendar
      }).add(p2m3w),
        1955, 7, "M06", 21, "add 2 months 3 weeks from leap day in leap month"
  );

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 2021,
        monthCode:"M01",
        day: 1,
        calendar
      }).add(p2m3w),
        2021, 3, "M03", 22, "add 2 months 3 weeks from non-leap day/month, ending in same year"
  );

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1947,
        monthCode:"M01",
        day: 29,
        calendar
      }).add(p2m3w),
        1947, 4, "M03", 21, "add 2 months 3 weeks from immediately before a leap month"
  );

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1955,
        monthCode:"M06",
        day: 29,
        calendar
      }).add(p2m3w),
        1955, 10, "M09", 20, "add 2 months 3 weeks from immediately before a leap month"
  );

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 2021,
        monthCode:"M12",
        day: 29,
        calendar
      }).add(p2m3w),
        2022, 3, "M03", 21, "add 2 months 3 weeks from end of year to next year"
  );
}
