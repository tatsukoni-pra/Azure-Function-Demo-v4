import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient, PatchOperation } from "@azure/cosmos";

const client = new CosmosClient(process.env["cosmosdbtatsukonitestv2_DOCUMENTDB"]);

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

process.on('SIGTERM', async () => {
    let timeStamp = new Date().toISOString();
    const container = client.database("TatsukoniTest2").container("tatsukoni-test-2");
    const operations: PatchOperation[] = [
        {
            op: "replace", // replace operation を使用
            path: "/text", // 更新するプロパティのパス
            value: "Function SIGTERM: " + timeStamp
        }
    ];
    await container.item("1", "1").patch(operations);
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
