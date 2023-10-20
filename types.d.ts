export interface Ship {
    title: string;
    level: string;
    nation: {
        name: string;
    };
    type: {
        name: string;
    };
    description: string;
    icons: {
        large: string;
        medium: string;
    };
}
