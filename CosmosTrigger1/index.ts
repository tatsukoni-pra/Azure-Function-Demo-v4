import { AzureFunction, Context } from "@azure/functions"
import { ServiceBusClient } from "@azure/service-bus";

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
const queueName = "mytopic";

const messageId = () => {
    return crypto.randomUUID() + '--' + new Date().getTime();
}

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: any[]): Promise<void> {
    console.log('Function Start');

    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(queueName);

    try {
        const message = {
            body: {
                "type": "Albert Einstein",
                "content": {
                    "user_id": documents[0].id,
                    "text": documents[0].text,
                }
            },
            messageId: messageId()
        };
        let batch = await sender.createMessageBatch();
        if (!batch.tryAddMessage(message)) {
            await sender.sendMessages(batch);
            batch = await sender.createMessageBatch();
            if (!batch.tryAddMessage(message)) {
                throw new Error("Message too big to fit in a batch");
            }
        }
        await sender.sendMessages(batch);

        console.log(`Sent a batch of messages to the queue: ${queueName}`);
        await sender.close();
    } catch (err) {
        console.log(err);
    } finally {
        await sbClient.close();
    }

    console.log('Function Finished');
}

export default cosmosDBTrigger;
