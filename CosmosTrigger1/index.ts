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
        context.log(documents);
    }

    console.log('Function Finished');
}

export default cosmosDBTrigger;
