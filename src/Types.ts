import * as rt from "runtypes";
import {
  SimpleLoggerInterface,
  SimpleHttpRequestHandlerInterface,
} from "@wymp/ts-simple-interfaces";
import { CacheInterface } from "@wymp/sql";

/**
 * Block #1: Uncomment this block and comment out block #2. Run tsc and it will compile fine, but
 * run npm t and it will fail with the "excessively deep" error.
 */
import * as Weenie from "@wymp/weenie-framework";
export const AppConfigValidator = rt.Intersect(
  Weenie.baseConfigValidator,
  rt.Record({
    domain: rt.Literal("luminous-core"),
    http: Weenie.webServiceConfigValidator,
    amqp: Weenie.mqConnectionConfigValidator,
    db: Weenie.databaseConfigValidator,
    stubAuth: rt.Boolean,

    // Optional cache config
    cache: rt.Optional(
      rt.Record({
        maxLength: rt.Union(rt.Number, rt.Undefined),
        ttlSec: rt.Union(rt.Number, rt.Undefined),
      })
    ),
  })
)
/**/

/**
 * Block #2: Uncomment this block and comment out block #1. Run tsc and it will compile fine; run
 * npm t and it will also run just fine.
 * /
const Port = rt.Number;
const Host = rt.String;
export const webServiceConfigValidator = rt.Record({
  listeners: rt.Array(rt.Tuple(Port, rt.Optional(Host))),
  logIncoming: rt.Optional(rt.Union(rt.Null, rt.Boolean)),
  parseJson: rt.Optional(rt.Union(rt.Null, rt.Boolean)),
  jsonMimeTypes: rt.Optional(rt.Union(rt.Null, rt.Array(rt.String))),
  handleErrors: rt.Optional(rt.Union(rt.Null, rt.Boolean)),
  handleFallthrough: rt.Optional(rt.Union(rt.Null, rt.Boolean)),
  listenOnReady: rt.Optional(rt.Union(rt.Null, rt.Boolean)),
  mask500Errors: rt.Optional(rt.Union(rt.Null, rt.Boolean, rt.String)),
  errOnBlankPost: rt.Optional(rt.Union(rt.Null, rt.Boolean)),
});
export type WebServiceConfig = rt.Static<typeof webServiceConfigValidator>;

export const apiConfigValidator = rt.Record({
  key: rt.String,
  secret: rt.String,
  baseUrl: rt.String,
});
export type ApiConfig = rt.Static<typeof apiConfigValidator>;

export const mqConnectionConfigValidator = rt.Record({
  protocol: rt.Optional(rt.Literal("amqp")),
  hostname: rt.Optional(rt.String),
  port: rt.Optional(rt.Number),
  username: rt.Optional(rt.String),
  password: rt.Optional(rt.String),
  locale: rt.Optional(rt.String),
  vhost: rt.Optional(rt.String),
  heartbeat: rt.Optional(rt.Number),
});
export type MqConnectionConfig = rt.Static<typeof mqConnectionConfigValidator>;

export const databaseConfigValidator = rt.Union(
  rt.Record({
    host: rt.Union(rt.String, rt.Undefined, rt.Null),
    port: rt.Union(rt.Number, rt.Undefined, rt.Null),
    socketPath: rt.Optional(rt.Union(rt.Undefined, rt.Null)),
    user: rt.String,
    password: rt.String,
    database: rt.String,
  }),
  rt.Record({
    host: rt.Optional(rt.Union(rt.Undefined, rt.Null)),
    port: rt.Optional(rt.Union(rt.Undefined, rt.Null)),
    socketPath: rt.String,
    user: rt.String,
    password: rt.String,
    database: rt.String,
  })
);
export type DatabaseConfig = rt.Static<typeof databaseConfigValidator>;

export const loggerConfigValidator = rt.Record({
  logLevel: rt
    .Literal("debug")
    .Or(rt.Literal("info"))
    .Or(rt.Literal("notice"))
    .Or(rt.Literal("warning"))
    .Or(rt.Literal("error"))
    .Or(rt.Literal("alert"))
    .Or(rt.Literal("critical"))
    .Or(rt.Literal("emergency")),

  // If this is null, then logs are only written to stdout
  logFilePath: rt.Optional(rt.String.Or(rt.Null)),
});
export type LoggerConfig = rt.Static<typeof loggerConfigValidator>;

export const environmentAwareConfigValidator = rt.Record({
  envType: rt.String,
  envName: rt.String,
});
export type EnvironmentAwareConfig = rt.Static<typeof environmentAwareConfigValidator>;

export const jobManagerConfigValidator = rt.Record({
  initialJobWaitMs: rt.Optional(rt.Number),
  maxJobWaitMs: rt.Optional(rt.Number),
});
export type JobManagerConfig = rt.Static<typeof jobManagerConfigValidator>;

export const serviceManagerConfigValidator = rt.Record({
  initializationTimeoutMs: rt.Number,
});
export type ServiceManagerConfig = rt.Static<typeof serviceManagerConfigValidator>;

export const baseConfigValidator = rt.Intersect(
  environmentAwareConfigValidator,
  jobManagerConfigValidator,
  serviceManagerConfigValidator,
  rt.Record({
    serviceName: rt.String,
    logger: loggerConfigValidator,
  })
);
export type BaseConfig = rt.Static<typeof baseConfigValidator>;

export const AppConfigValidator = rt.Intersect(
  baseConfigValidator,
  rt.Record({
    domain: rt.Literal("luminous-core"),
    http: webServiceConfigValidator,
    amqp: mqConnectionConfigValidator,
    db: databaseConfigValidator,
    stubAuth: rt.Boolean,

    // Optional cache config
    cache: rt.Optional(
      rt.Record({
        maxLength: rt.Union(rt.Number, rt.Undefined),
        ttlSec: rt.Union(rt.Number, rt.Undefined),
      })
    ),
  })
);
/**/

export type AppConfig = rt.Static<typeof AppConfigValidator>;

export type AppDeps = {
  config: AppConfig;
  log: SimpleLoggerInterface;
  http: SimpleHttpRequestHandlerInterface;
  cache: CacheInterface;
};

/**
 *
 *
 *
 *
 *
 * Data Model
 *
 *
 *
 *
 *
 */

export type BankingProviderAttributes = {
  name: string;
};
export namespace Api {
  export type BankingProvider = BankingProviderAttributes & {
    id: string;
    type: "banking-providers";
  };
}

export namespace Db {
  export type BankingProvider = BankingProviderAttributes & {
    id: Buffer;
  };
}

