import { host, database, client} from "@/lib/influxdb";

import {Point} from "@influxdata/influxdb3-client";

const line = `stat,unit=temperature avg=20.5,max=45.0`
await client.write(line, database)

// Optional: prioritize tag order for first-write column order in InfluxDB 3
const point = Point.measurement('cpu')
  .setTag('region', 'us-east')
  .setTag('host', 'web-01')
  .setFloatField('usage', 0.76)


await client.write(point, database, host, {
  tagOrder: ['region', 'host'],
})
