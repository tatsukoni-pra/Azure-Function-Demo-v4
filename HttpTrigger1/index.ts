import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

process.on('SIGTERM', () => {
    console.log('SIGTERM');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT');
    process.exit(0);
});

process.on('SIGHUP', () => {
    console.log('SIGHUP');
    process.exit(0);
});

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log('実行開始');

    await sleep(30000);
    context.log('30s...');
    await sleep(60000);
    context.log('90s...');
    await sleep(60000);
    context.log('150s...');
    await sleep(60000);
    context.log('210s...');

    context.log('Finished!!!');

    context.res = {
        body: "Hello, World!"
    };

};

export default httpTrigger;
