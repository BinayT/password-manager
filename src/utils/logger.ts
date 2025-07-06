type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isProduction = process.env.NODE_ENV === 'production';

const timestamp = (): string => new Date().toISOString();

const log = (level: LogLevel, message: string, context?: unknown): void => {
  if (isProduction && level === 'debug') return;

  const prefix = `[${timestamp()}] [${level.toUpperCase()}]`;

  if (context) {
    console[level](`${prefix} ${message}`, context);
  } else {
    console[level](`${prefix} ${message}`);
  }
};

export const logger = {
  info: (msg: string, ctx?: unknown) => log('info', msg, ctx),
  warn: (msg: string, ctx?: unknown) => log('warn', msg, ctx),
  error: (msg: string, ctx?: unknown) => log('error', msg, ctx),
  debug: (msg: string, ctx?: unknown) => log('debug', msg, ctx),
};
