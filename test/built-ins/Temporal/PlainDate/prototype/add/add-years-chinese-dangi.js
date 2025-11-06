// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindate.prototype.add
description: Add duration with years only calculate correctly
info: |
  8. Let result be ? AddISODate(date.[[ISOYear]], date.[[ISOMonth]], date.[[ISODay]], duration.[[Years]], duration.[[Months]], duration.[[Weeks]], duration.[[Days]], overflow).
features: [Temporal]
includes: [temporalHelpers.js]
---*/

const calendars = ["chinese", "dangi"];

const p1y = new Temporal.Duration(1);

for (const calendar of calendars){

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 2019,
        monthCode:"M01",
        day: 1,
        calendar
      }).add(p1y),
        2020, 1, "M01", 1, "add 1 year from non-leap day"
  );

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1966,
        monthCode:"M03L",
        day: 1,
        calendar
      }).add(p1y),
        1967, 3, "M03", 1, "add 1 year from leap month"
  );

  TemporalHelpers.assertPlainDate(
    Temporal.PlainDate.from(
      {year: 1938,
        monthCode:"M06L",
        day: 30,
        calendar
      }).add(p1y),
        1939, 6, "M06", 29, "add 1 year from leap day in leap month"
  );
}


