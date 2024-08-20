export async function handler(event) {
    const { file } = JSON.parse(event.body);

    if (!file) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "File is required" }),
        };
    }

    // Example: process the file (e.g., convert it to base64 or store it in S3)
    // For simplicity, we'll just return success here

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "File uploaded successfully" }),
    };
}
