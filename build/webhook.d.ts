export class WebhookRegistry {
    _handlerMap: {};
    _config: any;
    _fdkConfig: any;
    initialize(config: any, fdkConfig: any): Promise<void>;
    get isInitialized(): boolean;
    get isSubscribeOnInstall(): any;
    _validateEventsMap(handlerConfig: any): void;
    _getEventIdMap(events: any): any;
    _associationCriteria(applicationIdList: any): string;
    get _webhookUrl(): string;
    _isConfigUpdated(subscriberConfig: any): boolean;
    syncEvents(platformClient: any, config: any, enableWebhooks: any): Promise<void>;
    enableSalesChannelWebhook(platformClient: any, applicationId: any): Promise<void>;
    disableSalesChannelWebhook(platformClient: any, applicationId: any): Promise<void>;
    verifySignature(body: any, headers: any): void;
    processWebhook({ body, headers }: {
        body: any;
        headers: any;
    }): Promise<void>;
    getSubscriberConfig(platformClient: any): Promise<any>;
    getEventConfig(handlerConfig: any): Promise<any>;
}