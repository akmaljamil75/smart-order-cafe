import pino, { Logger } from "pino";

export class PinoLogger {
  
  private readonly logger: Logger;

  constructor(readonly name: string) {
    this.logger = pino({
      name,
    });
  }

  info(msg: string, meta : Record<string, unknown>) {
    this.logger.info(
      meta,
      msg
    );
  }

  error(msg: string, meta : Record<string, unknown>, err?: Error) {
    this.logger.error(
      {
        meta,
        err,
      },
      msg
    );
  }
  
}