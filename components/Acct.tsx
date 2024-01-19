import React from 'react'
// type Props = {}
// const Acct = (props: Props) => {
const ListPositions = () => {
    return (
        <div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>商品</TableCell>
                        <TableCell>方向</TableCell>
                        <TableCell>口數</TableCell>
                        <TableCell>成本</TableCell>
                        <TableCell>現價</TableCell>
                        <TableCell>損益</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* {ScannersChangePercentRank.map((entry, index) => ( */}
                    <TableRow key={index}>
                        <TableCell>{Object.keys(entry)[0]}          </TableCell>
                        <TableCell>{entry[Object.keys(entry)[0]][0]}</TableCell>
                        <TableCell>{entry[Object.keys(entry)[0]][1]}</TableCell>
                        <TableCell>{entry[Object.keys(entry)[0]][2]}</TableCell>
                        <TableCell>{entry[Object.keys(entry)[0]][3]}</TableCell>
                        <TableCell>{entry[Object.keys(entry)[0]][4]}</TableCell>
                    </TableRow>
                </TableBody>
                {/* ))} */}
            </Table>
        </div>
    )
}
// {
//     "TX417500M4": [
//         "17500M4",
//         "Buy",
//         1,
//         99,
//         26,
//         -3650
//     ]
// }
// =========================================================================================
const Margin = () => {
    return (
        <div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>取益數</TableCell>
                        <TableCell>可出金</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* {ScannersChangePercentRank.map((entry, index) => ( */}
                    <TableRow key={index}>
                        <TableCell>{Object.keys(entry)[0]}          </TableCell>
                        <TableCell>{entry[Object.keys(entry)[0]][0]}</TableCell>
                    </TableRow>
                </TableBody>
                {/* ))} */}
            </Table>
        </div>
    )
}

// {
//     "權益總值/可動用(出金)保證金": [
//         1305,
//         30
//     ]
// =========================================================================================
const ListProfitLossSummary = () => {
    return (
        <div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>取益數</TableCell>
                        <TableCell>可出金</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* {ScannersChangePercentRank.map((entry, index) => ( */}
                    <TableRow key={index}>
                        <TableCell>{Object.keys(entry)[0]}          </TableCell>
                        <TableCell>{entry[Object.keys(entry)[0]][0]}</TableCell>
                    </TableRow>
                </TableBody>
                {/* ))} */}
            </Table>
        </div>
    )
}