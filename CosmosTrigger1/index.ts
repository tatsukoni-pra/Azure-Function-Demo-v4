import { AzureFunction, Context } from "@azure/functions"

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

process.on('SIGTERM', () => {
    console.log('処理が途中終了されました。');
    // クリーンアップ処理
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('処理が中断されました。');
    // クリーンアップ処理
    process.exit(0);
});

process.on('exit', () => {
    console.log('処理がexitされました。');
    // クリーンアップ処理
    process.exit(0);
});

process.on('uncaughtException', () => {
    console.log('処理が異常終了されました。');
    // クリーンアップ処理
    process.exit(0);
});

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: any[]): Promise<void> {
    process.on('SIGTERM', () => {
        console.log('処理が途中終了されました。');
        // クリーンアップ処理
        process.exit(0);
    });
    
    process.on('SIGINT', () => {
        console.log('処理が中断されました。');
        // クリーンアップ処理
        process.exit(0);
    });
    
    process.on('exit', () => {
        console.log('処理がexitされました。');
        // クリーンアップ処理
        process.exit(0);
    });
    
    process.on('uncaughtException', () => {
        console.log('処理が異常終了されました。');
        // クリーンアップ処理
        process.exit(0);
    });

    console.log('実行開始');

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
