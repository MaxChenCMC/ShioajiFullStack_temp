import React from 'react'

type Department = {
    Emp_Id: number;
    Name: string;
    Age: number;
};
let dict: { [DepartmentNo: string]: Department[] } = {};
dict[0] = [
    { Emp_Id: 1, Name: "Test", Age: 23 },
    { Emp_Id: 2, Name: "Test", Age: 23 },
    { Emp_Id: 3, Name: "Test", Age: 23 },
];
dict[1] = [
    { Emp_Id: 1, Name: "Test 2", Age: 23 },
    { Emp_Id: 2, Name: "Test 3", Age: 23 },
    { Emp_Id: 3, Name: "Test 4", Age: 23 },
];
dict[2] = [
    { Emp_Id: 1, Name: "Test 2", Age: 23 },
    { Emp_Id: 2, Name: "Test 3", Age: 23 },
];


// =========================================================================








const tsrafce = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Emp_Id</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(dict).map(([key, value]) => {
                    return value.map((department) => {
                        return (
                            <tr key={department.Emp_Id}>
                                <td>{department.Emp_Id}</td>
                                <td>{department.Name}</td>
                                <td>{department.Age}</td>
                            </tr>
                        );
                    });
                })}
            </tbody>
        </table>
    );
}

export default tsrafce