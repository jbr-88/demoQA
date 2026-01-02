import fs from 'fs';

const FILE_PATH = 'test-data.json';

type TestData = {
    bearer?: string;
};

function readData(): TestData {
    if (!fs.existsSync(FILE_PATH)) {
      return {};
    }   
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
}

function writeData(data: TestData) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

export function saveBearer(bearer: string) {
    const data = readData();
    data.bearer = bearer;
    writeData(data);
}

export function getBearer(): string {
    const data = readData();
    if (!data.bearer) {
      throw new Error('bearer not found in test-data.json');
    }
    return data.bearer;
}