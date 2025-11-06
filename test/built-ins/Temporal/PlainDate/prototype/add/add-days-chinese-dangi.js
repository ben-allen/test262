// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindate.prototype.add
description: Add duration with days and calculate correctly
info: |
  8. Let result be ? AddISODate(date.[[ISOYear]], date.[[ISOMonth]], date.[[ISODay]], duration.[[Years]], duration.[[Months]], duration.[[Weeks]], duration.[[Days]], overflow).
features: [Temporal, Intl.Era-monthcode]
includes: [temporalHelpers.js]
---*/

const calendars = ["chinese", "dangi"];

let p10d = new Temporal.Duration(0,0,0,10);


for (const calendar of calendars){
  TemporalHelpers.assertPlainDate(Temporal.PlainDate.from({year: 2021, monthCode: "M01", day: 1, calendar}).add(p10d), 2021, 1, "M01", 11, "add 10 days, ending in same month");

  TemporalHelpers.assertPlainDate(Temporal.PlainDate.from({year: 2021, monthCode: "M01", day: 29, calendar}).add(p10d), 2021, 2, "M02", 10, "add 10 days, ending in following month");

  TemporalHelpers.assertPlainDate(Temporal.PlainDate.from({year: 2021, monthCode: "M12", day: 29, calendar}).add(p10d), 2022, 1, "M01", 10, "add 10 days, ending in following year");

  TemporalHelpers.assertPlainDate(Temporal.PlainDate.from({year: 1955, monthCode: "M03L", day: 30, calendar}).add(p10d), 1955, 5, "M04", 10, "add 10 days from leap day in leap month");

  TemporalHelpers.assertPlainDate(Temporal.PlainDate.from({year: 1947, monthCode: "M02L", day: 29, calendar}).add(p10d), 1947, 4, "M03", 10, "add 10 days from last day of leap month");
}

