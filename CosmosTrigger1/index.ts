import { AzureFunction, Context } from "@azure/functions"

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

process.on('SIGTERM', () => {
    console.log('Function SIGTERM');
    process.exit(0);
});

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: any[]): Promise<void> {
    console.log('Function Start');

    if (!!documents && documents.length > 0) {
        context.log('Document Id: ', documents[0].id);
    }

    await sleep(30000);
    context.log('30秒経過...');
    await sleep(60000);
    context.log('1分30秒経過...');
    await sleep(60000);
    context.log('2分30秒経過...');
    await sleep(60000);
    context.log('3分30秒経過');

    console.log('Function Finished');
}

export default cosmosDBTrigger;
