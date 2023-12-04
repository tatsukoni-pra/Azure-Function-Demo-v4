import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient, PatchOperation } from "@azure/cosmos";

const client = new CosmosClient(process.env["cosmosdbtatsukonitestv2_DOCUMENTDB"]);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const container = client.database("TatsukoniTest2").container("tatsukoni-test-2");
    const operations: PatchOperation[] = [
        {
            op: "replace", // replace operation を使用
            path: "/text", // 更新するプロパティのパス
            value: "Function_2"
        }
    ];
    await container.item("1", "1").patch(operations);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Hello, World 2"
    };

};

export default httpTrigger;