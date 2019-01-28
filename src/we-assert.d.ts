declare type handlerFunction = (message: string) => void;
declare type evalFunction = (...args: any) => boolean;
declare const _default: {
    checkVulcan(): any;
    build: () => {
        define: {
            type: (typeName: string, vEval: (x: any) => boolean) => void;
        };
        assume: (logicSentence: string) => void;
        setLevel: (levelString: string) => void;
        getLevel: () => string;
        checkIsProved: (symbol: string) => Boolean;
        setHandler: (newHandler: handlerFunction) => void;
        getProposition: (symbol: string) => [evalFunction, any[], string];
        defineProposition: (symbol: string, prop: [evalFunction, any[], string]) => void;
        assert: {
            that: (statement: boolean, message: string) => boolean;
            proposition: (symbol: string, prop: [evalFunction, any[], string]) => any;
            thatIsProved: (symbol: string, message: string) => Boolean;
            forXBetween: (min: number, max: number) => {
                that: (evalFunction: evalFunction, message: string) => void;
            };
            typeOf(data: any): {
                is(dataType: string, message: string): void;
            };
            atLevel: (someLevelString: string) => {
                that: (statement: boolean, message: string) => void;
            };
        };
    };
};
export default _default;
