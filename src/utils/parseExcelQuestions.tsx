import { read, utils } from 'xlsx';

interface Question {
    id: number;
    title: string;
    description: string;
    type: string;
    options?: string[];
    correctAnswer?: string;
    code?: string;
    testCases?: { input: string; expectedOutput: string }[];
}

export async function parseExcelQuestions(file: File): Promise<Question[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const workbook = read(e.target?.result, { type: 'binary' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = utils.sheet_to_json(worksheet);

                const questions: Question[] = data.map((row: any) => ({
                    id: Date.now() + Math.random(),
                    title: row.Title,
                    description: row.Description,
                    type: row.Type.toLowerCase(),
                    ...(row.Type.toLowerCase() === 'mcq' ? {
                        options: row.Options.split(',').map((opt: string) => opt.trim()),
                        correctAnswer: row.CorrectAnswer
                    } : {
                        code: row.Code,
                        testCases: row.TestCases.split('|').map((testCase: string) => {
                            const [input, output] = testCase.split('=');
                            return {
                                input,
                                expectedOutput: output
                            };
                        })
                    })
                }));

                resolve(questions);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
}