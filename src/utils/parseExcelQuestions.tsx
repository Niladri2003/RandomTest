import { read, utils } from 'xlsx';

interface Question {
    id: number;
    title: string;
    description: string;
    explanation: string;
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

                // Required columns
                const requiredColumns = ["Title", "Description", "Explanation","Type","Options","CorrectAnswer","Code","TestCases"];
                const missingColumns = requiredColumns.filter(col => !Object.keys(data[0] || {}).includes(col));
                console.log(missingColumns);
                // if (missingColumns.length > 0) {
                //     return reject(new Error(`Missing required columns: ${missingColumns.join(', ')}`));
                // }

                const questions: Question[] = data.map((row: any, index: number) => {
                    // Validate each required field
                    if (!row.Title || !row.Description || !row.Type) {
                        throw new Error(`Row ${index + 1}: Missing required fields (Title, Description, Type).`);
                    }

                    const type = row.Type.toLowerCase();

                    // Validate MCQ fields
                    if (type === "mcq" && (!row.Options || !row.CorrectAnswer)) {
                        throw new Error(`Row ${index + 1}: MCQ question must have Options and CorrectAnswer.`);
                    }

                    // Validate Coding fields
                    if (type === "coding" && (!row.Code || !row.TestCases)) {
                        throw new Error(`Row ${index + 1}: Coding question must have Code and TestCases.`);
                    }

                    return {
                        id: Date.now() + Math.random(),
                        title: row.Title.trim(),
                        description: row.Description.trim(),
                        explanation: row.Explanation?.trim() || "",
                        type: type,
                        ...(type === "mcq"
                            ? {
                                options: row.Options.split(",").map((opt: string) => opt.trim()),
                                correctAnswer: row.CorrectAnswer.trim(),
                            }
                            : {
                                code: row.Code.trim(),
                                testCases: row.TestCases
                                    ? row.TestCases.split("|").map((testCase: string) => {
                                        const [input, output] = testCase.split("=");
                                        return { input: input.trim(), expectedOutput: output.trim() };
                                    })
                                    : [],
                            }),
                    };
                });

                resolve(questions);
            } catch (error) {
                reject(new Error(`Error processing Excel file: ${error.message}`));
            }
        };

        reader.onerror = () => reject(new Error("Failed to read the file."));
        reader.readAsBinaryString(file);
    });
}