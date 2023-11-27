import { AzureFunction, Context } from "@azure/functions"

let globalContext: Context | null = null;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

process.on('SIGTERM', async () => {
    if (globalContext) {
        globalContext.log('処理が途中終了されました。');
        // ここにクリーンアップ処理を追加します。
        // 例: データベースのクローズ、ファイルの保存など
    }

    // 必要なクリーンアップ処理が完了したら、プロセスを終了します。
    process.exit(0);
});

process.on('SIGINT', async () => {
    if (globalContext) {
        globalContext.log('処理が中断されました。');
        // ここにクリーンアップ処理を追加します。
        // 例: データベースのクローズ、ファイルの保存など
    }

    // 必要なクリーンアップ処理が完了したら、プロセスを終了します。
    process.exit(0);
});

process.on('exit', async () => {
    if (globalContext) {
        globalContext.log('処理がexitされました。');
        // ここにクリーンアップ処理を追加します。
        // 例: データベースのクローズ、ファイルの保存など
    }

    // 必要なクリーンアップ処理が完了したら、プロセスを終了します。
    process.exit(0);
});

process.on('uncaughtException', async () => {
    if (globalContext) {
        globalContext.log('処理が異常終了されました。');
        // ここにクリーンアップ処理を追加します。
        // 例: データベースのクローズ、ファイルの保存など
    }

    // 必要なクリーンアップ処理が完了したら、プロセスを終了します。
    process.exit(0);
});

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: any[]): Promise<void> {
    globalContext = context;
    if (!!documents && documents.length > 0) {
        context.log('Document Id: ', documents[0].id);
    }

    // 3分30秒待機
    await sleep(30000);
    context.log('30秒経過...');
    await sleep(60000);
    context.log('1分30秒経過...');
    await sleep(60000);
    context.log('2分30秒経過...');
    await sleep(60000);
    context.log('3分30秒経過');

    // 完了
    context.log('Finished!!!');
}

export default cosmosDBTrigger;
