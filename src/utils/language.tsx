interface Language {
    id: string;
    name: string;
    extension: string;
    defaultTemplate: string;
}

export const supportedLanguages: Language[] = [
    {
        id: 'python',
        name: 'Python',
        extension: 'py',
        defaultTemplate: `# Write your Python code here
`,
    },
    {
        id: 'java',
        name: 'Java',
        extension: 'java',
        defaultTemplate: `public class Main {
    public static void main(String[] args) {
        // Write your Java code here
    }
}
`,
    },
    {
        id: 'c',
        name: 'C',
        extension: 'c',
        defaultTemplate: `#include <stdio.h>

// Write your C code here

int main() {
    return 0;
}
`,
    },
    {
        id: 'cpp',
        name: 'C++',
        extension: 'cpp',
        defaultTemplate: `#include <iostream>

// Write your C++ code here

int main() {
    return 0;
}
`,
    }
];