import React, { useState } from 'react'
import deepDive from 'deep-dive'

const sampleData: any = {
    users: [
        {
            name: 'Adam Smith',
            age: 27,
            address: {
                line1: '123 Main St.',
                line2: 'Apt 101',
                city: 'San Francisco',
                state: 'CA',
                zip: '94103',
            },
        },
        {
            name: 'Barbara Jones',
            age: 31,
            address: {
                line1: '300 Madison Ave.',
                line2: '',
                city: 'Chicago',
                state: 'IL',
                zip: '60606',
            },
        },
        {
            name: 'Chris Lee',
            age: 16,
            address: {
                line1: '1801 N. Miami Dr.',
                line2: '',
                city: 'Miami',
                state: 'FL',
                zip: '33132',
            },
        },
        {
            name: 'David Lopez',
            age: 42,
            address: {
                line1: '5432 27th St.',
                line2: 'Apt 789',
                city: 'New York',
                state: 'NY',
                zip: '10023',
            },
        },
        {
            name: 'Ellen Anderson',
            age: 15,
            address: {
                line1: '2917 North Ave.',
                line2: '',
                city: 'Washington',
                state: 'DC',
                zip: '20012',
            },
        },
    ],
    selectedUserIndex: 0,
}

const DeepDiveDemo: React.FC = () => {
    const [data, setData] = useState(sampleData)
    const [updatedFirstUser, setUpdatedFirstUser] = useState(false)
    const [updatedAllUsers, setUpdatedAllUsers] = useState(false)

    return (
        <div>
            <h3>Sample Data</h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={tableCellStyle}>Name</th>
                        <th style={tableCellStyle}>Age</th>
                        <th style={tableCellStyle}>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.users.map((user: any, index: number) => (
                        <tr key={index}>
                            <td style={tableCellStyle}>{user.name}</td>
                            <td style={tableCellStyle}>{user.age}</td>
                            <td style={tableCellStyle}>
                                {user.address.line1}, {user.address.line2 ? `${user.address.line2}, ` : ''}
                                {user.address.city}, {user.address.state} {user.address.zip}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <br />

            <h3>1. Basic Property Access</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData, ['users', sampleData.selectedUserIndex, 'name'])</code>
            </p>
            <p>
                <strong>Explanation:</strong> Accesses the 'name' property of the user at the 'selectedUserIndex' in the 'users' array.
            </p>
            <p>
                <strong>Result:</strong> <code>{deepDive(sampleData, ['users', sampleData.selectedUserIndex, 'name'])}</code>
            </p>
            <br />
            <br />

            <h3>2. Accessing Nested Object Properties</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData, ['users', sampleData.selectedUserIndex, 'address', 'city'])</code>
            </p>
            <p>
                <strong>Explanation:</strong> Traverses deeper to access the 'city' property within the 'address' object of the selected user.
            </p>
            <p>
                <strong>Result:</strong> <code>{deepDive(sampleData, ['users', sampleData.selectedUserIndex, 'address', 'city'])}</code>
            </p>
            <br />
            <br />

            <h3>3. Filtering an Array Using a Function</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData, ['users', (user: any) =&gt; user.age &gt;= 18])</code>
            </p>
            <p>
                <strong>Explanation:</strong> Filters the 'users' array to return only users with age 18 or older.
            </p>
            <p>
                <strong>Result:</strong>
            </p>
            <pre>{JSON.stringify(deepDive(sampleData, ['users', (user: any) => user.age >= 18]), null, 4)}</pre>
            <br />
            <br />

            <h3>4. Getting Specific Properties from an Array of Objects</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData, ['users', ['name', 'age']])</code>
            </p>
            <p>
                <strong>Explanation:</strong> Extracts the 'name' and 'age' properties from each user in the 'users' array.
            </p>
            <p>
                <strong>Result:</strong>
            </p>
            <pre>{JSON.stringify(deepDive(sampleData, ['users', ['name', 'age']]), null, 4)}</pre>
            <br />
            <br />

            <h3>5. Getting specific properties from filtered array</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData, ['users', (user: any) =&gt; user.age &gt;= 18, ['name', 'address','city']])</code>
            </p>
            <p>
                <strong>Explanation:</strong> Filters the 'users' array to return only users with age 18 or older and then extracts the name, address and city properties.
            </p>
            <p>
                <strong>Result:</strong>
            </p>
            <pre>{JSON.stringify(deepDive(sampleData, ['users', (user: any) => user.age >= 18, ['name', 'address', 'city']]), null, 4)}</pre>
            <br />
            <br />

            <h3>6. Accessing a specific index of filtered array</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData,['users', (user:any) =&gt; user.age &gt;= 18, 0, 'address', 'city'])</code>
            </p>
            <p>
                <strong>Explanation:</strong> Filters the 'users' array to return only users with age 18 or older, then gets the first element and then gets the address.city
            </p>
            <p>
                <strong>Result:</strong> <code>{deepDive(sampleData, ['users', (user: any) => user.age >= 18, 0, 'address', 'city'])}</code>
            </p>
            <br />
            <br />

            <h3>7. Setting a Value</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData, ['users', 0, 'age'], 68)</code>
            </p>
            <p>
                <strong>Explanation:</strong> Sets the first user's age to 68.
            </p>
            <p>
                <strong>Result:</strong> {updatedFirstUser && <code>{data.users[0].age}</code>}
            </p>
            <div className="">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setData((state) => deepDive(state, ['users', 0, 'age'], 68))
                        setUpdatedFirstUser(true)
                    }}>
                    Update first user&apos;s age
                </button>
            </div>
            <br />
            <br />

            <h3>8. Setting Multiple Values in Array</h3>
            <p>
                <strong>Query:</strong> <code>deepDive(sampleData,['users', ['age', 'name'] ], [100, "Updated Name"])</code>
            </p>
            <p>
                <strong>Explanation:</strong> Sets all users age to 100 and their name to updated name.
            </p>
            <p>
                <strong>Result:</strong>
            </p>
            <div className="">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setData((state) => deepDive(state, ['users', ['age', 'name']], [100, 'Updated Name']))
                        setUpdatedAllUsers(true)
                    }}>
                    Update name and age of all users
                </button>
            </div>
            <br />
            {updatedAllUsers && (
                <pre>
                    <code>{JSON.stringify(data, null, 4)}</code>
                </pre>
            )}
            <br />
            <br />
        </div>
    )
}

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
}

export default DeepDiveDemo
