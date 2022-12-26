declare const ENV: string;
class Logger {
  private static instance: Logger;
  private constructor() {}
  static getInstance() {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  public log(message?: any, ...optionalParams: any[]): void {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      console.log(message, [...optionalParams]);
    } else {
      console.log(message);
    }
  }

  public info(message?: any, ...optionalParams: any[]): void {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      console.info(message, [...optionalParams]);
    } else {
      console.info(message);
    }
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      console.warn(message, [...optionalParams]);
    } else {
      console.warn(message);
    }
  }

  public error(message?: any, ...optionalParams: any[]): void {
    if (ENV === 'production') return;
    if (optionalParams.length) {
      console.error(message, [...optionalParams]);
    } else {
      console.error(message);
    }
  }
}

export default Logger.getInstance();
