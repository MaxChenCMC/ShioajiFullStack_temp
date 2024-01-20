// Dictionary<string, List<object>>
// Snapshots_BlueChips()

export type jsonBlueChips1 = {
    change_rate: number;
    total_amount: number;
    tick_type: string;
}

export type jsonBlueChips2 = {
    [key: string]: [number, number, string ];
}


export const BLUECHIPS: jsonBlueChips[] =
    [
        { "1216": [0, 2.49, "Buy"] },
        { "1301": [-0.77, 4.24, "Sell"] },
    ]


    
// {
//     "3029": [
//         "零壹",
//         65.75,
//         69.9,
//         5.43,
//         7.99,
//         0.06
//     ],
//         "3036": [
//             "文曄",
//             120.27,
//             147,
//             9.29,
//             70.2,
//             0.22
//         ]
// }