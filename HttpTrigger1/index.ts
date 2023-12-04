import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

process.on('SIGTERM', () => {
    console.log('Function SIGTERM');
    process.exit(0);
});

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log('Function Start');

    await sleep(30000);
    context.log('30s...');
    await sleep(60000);
    context.log('90s...');
    await sleep(60000);
    context.log('150s...');
    await sleep(60000);
    context.log('210s...');

    console.log('Function Finished');

    context.res = {
        body: "Hello, World!"
    };

};

export default httpTrigger;
