import {database, client} from "@/lib/influxdb";

// Execute query
const query = `
    SELECT *
    FROM "stat"
    WHERE
    time >= now() - interval '5 minute'
    AND
    "unit" IN ('temperature')
`
const queryResult = await client.query(query, database)

for await (const row of queryResult) {
  console.log(`avg is ${row.avg}`)
  console.log(`max is ${row.max}`)
}
