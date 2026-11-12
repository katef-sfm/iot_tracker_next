import {
  InfluxDBClient,
  PartialWriteError,
  Point,
} from "@influxdata/influxdb3-client";

const host = process.env.INFLUX_HOST || "";
const token = process.env.INFLUX_TOKEN || "";
const database = process.env.INFLUX_DATABASE || "";

/**
 * This example shows various ways to instantiate the client.
 * Make sure the following environment variables are set: INFLUX_HOST, INFLUX_TOKEN
 */

async function main() {
  // Create a new client using ClientOptions
  const client: InfluxDBClient = new InfluxDBClient({ host, token, database });

  // code goes here

  console.log("client influxdb", client);

//  await client.close();

  return client;
}

const client = await main();

export  {host, token, database, client }

/*
https://github.com/InfluxCommunity/influxdb3-js/tree/285b12497f4e1b31d8acd31c2d75d86117843328/examples/basic
*/
