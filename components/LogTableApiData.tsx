import React, { useState, useEffect } from 'react'


export const LogTableApiData = () => {

    // console.table(ScannersAmountRank);
    const [AmountRank, setAmountRank] = useState<unknown[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/ScannersAmountRank');
            const data = await response.json();
            setAmountRank(data);
            console.table(data);
        };
        fetchPosts();
    }, []);


    // console.table(MockBlueChips);
    interface OrderBy { [key: string]: [number, number, string] }
    const [BlueChips, setBlueChips] = useState<OrderBy[]>([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/Snapshots_BlueChips');
            const data = await response.json();
            console.table(data);

            const dataArray: OrderBy[] = Object.entries(data).map(([key, value]) => ({
                [key]: value as [number, number, string],
            }));
            dataArray.sort((a, b) => b[Object.keys(b)[0]][1] - a[Object.keys(a)[0]][1]);
            setBlueChips(dataArray);
            // 有問題 table沒展開 仍是array包著   console.table(dataArray);
        };
        fetchPosts();
    }, []);


    // console.table(OpPremium);
    interface _OpPremium { strike: string[]; premium: number[]; }
    const [OpPremium, setOpPremium] = useState<_OpPremium>({ strike: [], premium: [] });
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/Snapshots_OpPremium');
            const data = await response.json();
            setOpPremium(data);
            console.table(data);
        };
        fetchPosts();

    }, []);


    // 有問題 table沒展開 仍是array包著 console.table(ScannersChangePercentRank);
    interface ScannerEntry {
        [key: string]: [string, number, number, number, number, number];
    }
    const [ScannersChangePercentRank, setScannersChangePercentRank] = useState<ScannerEntry[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/ScannersChangePercentRank');
            const data = await response.json();
            console.table(data);

            const dataArray: ScannerEntry[] = Object.entries(data).map(([key, value]) => ({
                [key]: value as [string, number, number, number, number, number],
            }));
            dataArray.sort((a, b) => b[Object.keys(b)[0]][4] - a[Object.keys(a)[0]][4]);
            setScannersChangePercentRank(dataArray);
            // 有問題 table沒展開 仍是array包著  console.table(dataArray);
        };
        fetchPosts();
    }, []);


    // console.table(ListAccountsSnapshots_NavBar);
    interface Data { Acct: string[]; TAIFEX: string[]; TSE: string[]; OTC: string[]; }
    const [TbarTseTxfOtc, setTbarTseTxfOtc] = useState<Data>({ Acct: [], TAIFEX: [], TSE: [], OTC: [] });
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:9033/api/ListAccountsSnapshots_NavBar');
                if (!response.ok) { throw new Error('Error fetching data'); }
                const data = await response.json();
                setTbarTseTxfOtc(data);
                console.table(data);
            } catch (error) { console.log(error) }
        };
        fetchPosts();
    }, []);



    // console.table(Margin);
    interface _Margin { Margin: number[]; ListPositions: string | number[]; }
    const [Margin, setMargin] = useState<_Margin>({ Margin: [], ListPositions: [] });
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:9033/api/_Margin');
            const data = await response.json();
            setMargin(data);
            console.table(data);
        };
        fetchPosts();
    }, []);


    return (
        <>
        </>
    );
};
