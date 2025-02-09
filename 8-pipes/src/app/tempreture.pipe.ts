import { Pipe } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true,
})

export class TempreturePipe {
    transform(
        // if you want to combine decimal pipe, need null type
        value: string | number | null, 
        inputType: 'cel'|'fah', 
        outputType: 'cel'|'fah'
    ) {
        // handle null
        if (!value) {
            return value;
        }

        let val: number;

        if (typeof value === 'string'){
            // convert string to a number
            val = parseFloat(value);
        } else {
            val = value;
        }

        let outputTemp: number;
        if (inputType === 'cel' && outputType === 'fah'){
            // from celsius to fahrenheit
            outputTemp =  val * (9 / 5) + 32;
        } else if (inputType === 'fah' && outputType === 'cel'){
            outputTemp = (val - 32) * (5 / 9);
        } else {
            outputTemp = val;
        };

        let symbol: '℉' | '℃';
        if (!outputType) {
            symbol = inputType === 'cel' ? '℃' : '℉';
        } else {
            symbol = outputType === 'cel' ? '℃' : '℉';
        }

        return `${outputTemp.toFixed(2)} ${symbol};`
    }
}