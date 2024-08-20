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

    const hashedPassword = await bcrypt.hash(password, 10);

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            email,
            password: hashedPassword,
        },
    };

    try {
        await dynamo.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User created successfully" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error creating user", error: error.message }),
        };
    }
}
