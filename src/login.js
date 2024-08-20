import AWS from 'aws-sdk';
import bcrypt from 'bcryptjs';

const dynamo = new AWS.DynamoDB.DocumentClient();

export async function handler(event) {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Email and password are required" }),
        };
    }

    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { email },
    };

    try {
        const result = await dynamo.get(params).promise();
        if (!result.Item || !(await bcrypt.compare(password, result.Item.password))) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: "Invalid email or password" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error logging in", error: error.message }),
        };
    }
}
