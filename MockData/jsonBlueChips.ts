// Dictionary<string, List<object>>
// Snapshots_BlueChips()

export type BlueChip = {
    change_rate: number;
    total_amount: number;
    tick_type: string;
}

export const BlueChips: BlueChip[] = [
    { change_rate: 0, total_amount: 2.49, tick_type: "Buy" },
    { change_rate: -0.77, total_amount: 4.24, tick_type: "Sell" },
]


// ==========================================
export type jsonBlueChips2 = {
    [key: string]: [number, number, string];
}

export const BLUECHIPS: jsonBlueChips[] =
    [
        { "1216": [0, 2.49, "Buy"] },
        { "1301": [-0.77, 4.24, "Sell"] },
    ]
// ==========================================