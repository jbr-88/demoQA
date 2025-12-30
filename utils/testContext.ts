import fs from 'fs';

const FILE_PATH = 'test-data.json';

export function saveUserId(userId: string) {
    fs.writeFileSync(FILE_PATH, JSON.stringify({ userId }, null, 2));
}

export function getUserId(): string {
    const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    return data.userId;
}