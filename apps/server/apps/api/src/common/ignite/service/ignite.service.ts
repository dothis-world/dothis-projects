import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const IgniteClient = require('apache-ignite-client');
const IgniteClientConfiguration = IgniteClient.IgniteClientConfiguration;

const SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
@Injectable()
export class IgniteService implements OnModuleInit, OnModuleDestroy {
  public readonly client: typeof IgniteClient;

  public readonly SqlFieldsQuery = IgniteClient.SqlFieldsQuery;
  private readonly logger: Logger = new Logger(IgniteService.name);

  constructor(private configService: ConfigService) {
    // Create a new Ignite client instance.
    this.client = new IgniteClient(this.onStateChanged.bind(this));
  }
  public createDistributedJoinQuery(sqlQuery: string) {
    return new SqlFieldsQuery(sqlQuery)
      .setDistributedJoins(true)
      .setLazy(false);
  }
  /*
   * ignite 재시도 로직
   */
  private async connectWithRetry(
    retryDelay: number,
    maxRetries: number,
  ): Promise<void> {
    let retries = 0;
    const endpoint1 = this.configService.get<string>('ignite.IGNITE_ENDPOINT1');
    const endpoint2 = this.configService.get<string>('ignite.IGNITE_ENDPOINT2');
    const endpoint3 = this.configService.get<string>('ignite.IGNITE_ENDPOINT3');

    const username = this.configService.get<string>('ignite.IGNITE_USER_NAME');
    const password = this.configService.get<string>('ignite.IGNITE_PASSWORD');
    const igniteClientConfiguration = new IgniteClientConfiguration(endpoint1)
      .setUserName(username)
      .setPassword(password);

    const attemptConnection = async () => {
      try {
        await this.client.connect(igniteClientConfiguration);
        this.logger.log('Successfully connected to Ignite server.');
      } catch (err) {
        this.logger.error(`Failed to connect to Ignite server: ${err.message}`);
        if (retries < maxRetries) {
          retries++;
          this.logger.log(
            `Attempting to reconnect... (${retries}/${maxRetries})`,
          );
          setTimeout(attemptConnection, retryDelay);
        } else {
          this.logger.error(
            'Max retries reached. Ignite client failed to connect.',
          );
        }
      }
    };

    await attemptConnection();
  }
  // NestJS hook that is called after the module is initialized.
  async onModuleInit(): Promise<void> {
    await this.connectWithRetry(5000, 5); // 5초 간격으로 최대 5번 재시도
  }

  // NestJS hook that is called before the module is destroyed.
  async onModuleDestroy(): Promise<void> {
    try {
      // Disconnect from Ignite server if connected.
      if (this.client) {
        await this.client.disconnect();
        console.log('Disconnected from Ignite server.');
      }
    } catch (err) {
      console.error('Error during Ignite client disconnection:', err);
    }
  }

  private onStateChanged(state: number, reason?: string): void {
    switch (state) {
      case IgniteClient.STATE.CONNECTED:
        this.logger.log('Client is started');
        break;
      case IgniteClient.STATE.CONNECTING:
        this.logger.log('Client is connecting');
        break;
      case IgniteClient.STATE.DISCONNECTED:
        this.logger.log('Client is stopped');
        if (reason) {
          this.logger.log(reason);
        }
        break;
    }
  }
  public currentDate(): {
    currentDate: Date;
    currentYear: number;
    currentMonth: number;
    currentDay: number;
  } {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDay();
    return { currentDate, currentYear, currentMonth, currentDay };
  }
}
