import * as colorette from "colorette";

type LoggerType = "info" | "warn" | "error" | "fatal" | "debug";
type Colors = keyof typeof colorette;

interface ILogger {
  name: string;
  color?: Colors;
}

export default class Logger {
  private readonly options: ILogger;

  constructor(options: ILogger) {
    this.options = options;
  }

  info(...message: string[]) {
    this.log("info", ...message);
  }

  warn(...message: string[]) {
    this.log("warn", ...message);
  }

  error(...message: string[]) {
    this.log("fatal", ...message);
  }

  fatal(...message: string[]) {
    this.log("info", ...message);
  }

  debug(...message: string[]) {
    this.log("info", ...message);
  }

  private log(type: LoggerType, ...message: string[]) {
    const date = new Date().toLocaleString().replace(", ", " ");

    message.forEach((msg) => {
      console.log(
        `[${date} ${type}] | ${colorette[
          (this.options.color || "white") as any
        ](`[${this.options.name}]`)} ${msg}`
      );
    });
  }
}
