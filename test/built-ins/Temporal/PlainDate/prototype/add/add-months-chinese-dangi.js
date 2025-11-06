// Copyright (C) 2025 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindate.prototype.add
description: Add duration with months and calculate correctly
info: |
  8. Let result be ? AddISODate(date.[[ISOYear]], date.[[ISOMonth]], date.[[ISODay]], duration.[[Years]], duration.[[Months]], duration.[[Weeks]], duration.[[Days]], overflow).
features: [Temporal, Intl.Era-monthcode]
includes: [temporalHelpers.js]
---*/

let p1m = new Temporal.Duration(0, 1);

const calendars = ["chinese", "dangi"];


for (const calendar of calendars){
  // add a month, with result in same year
  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 2019,
        monthCode:"M11",
        day: 1,
        calendar
      }).add(p1m),
        2019, 12, "M12", 1, "add 1 months, with result in same year"
  );


  // add a month with result in next year
  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 2019,
        monthCode:"M12",
        day: 1,
        calendar
      }).add(p1m),
        2020, 1, "M01", 1, "add 1 months, with result in next year"
  );

  // add a month, starting at start of leap month
   TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1947,
        monthCode:"M02L",
        day: 1,
        calendar
      }).add(p1m),
        1947, 4, "M03", 1, "add 1 months, starting at start of leap month"
  );

  // add a month, starting at start of leap month with 30 days
   TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1955,
        monthCode:"M03L",
        day: 1,
        calendar
      }).add(p1m),
        1955, 5, "M04", 1, "add 1 months, starting at start of leap month with 30 days"
  );
}
