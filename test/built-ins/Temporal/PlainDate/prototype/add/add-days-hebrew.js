// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-temporal.plaindate.prototype.add
description: Add duration with years only calculate correctly
info: |
  8. Let result be ? AddISODate(date.[[ISOYear]], date.[[ISOMonth]], date.[[ISODay]], duration.[[Years]], duration.[[Months]], duration.[[Weeks]], duration.[[Days]], overflow).
features: [Temporal]
includes: [temporalHelpers.js]
---*/

const p10d = new Temporal.Duration(0,0,0,10);

TemporalHelpers.assertPlainDate(
  Temporal.PlainDate.from({
    year: 5784,
    monthCode: "M05L",
    day: 30,
    calendar: "hebrew",
  }, {
    overflow: "reject"
  }).add(p10d),
  5784, 7, "M06", 10, "add 10 days to leap day", era="am", eraYear=5784
);

TemporalHelpers.assertPlainDate(
  Temporal.PlainDate.from({
    year: 5785,
    monthCode: "M01",
    day: 1,
    calendar: "hebrew",
  }, {
    overflow: "reject"
  }).add(p10d),
  5785, 1, "M01", 11, "add 10 days to non-leap day", era="am", eraYear=5785
);
