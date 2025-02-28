# Deep Dive

A simple function to query and mutate values in deep objects and arrays

## Sample Data

| Name           | Age | Address                                        |
| -------------- | --- | ---------------------------------------------- |
| Adam Smith     | 27  | 123 Main St., Apt 101, San Francisco, CA 94103 |
| Barbara Jones  | 31  | 300 Madison Ave., Chicago, IL 60606            |
| Chris Lee      | 16  | 1801 N. Miami Dr., Miami, FL 33132             |
| David Lopez    | 42  | 5432 27th St., Apt 789, New York, NY 10023     |
| Ellen Anderson | 15  | 2917 North Ave., Washington, DC 20012          |

## 1. Basic Property Access

**Query:** `deepDive(sampleData, ['users', sampleData.selectedUserIndex, 'name'])`

**Explanation:** Accesses the 'name' property of the user at the 'selectedUserIndex' in the 'users' array.

**Result:** `Adam Smith`

## 2. Accessing Nested Object Properties

**Query:** `deepDive(sampleData, ['users', sampleData.selectedUserIndex, 'address', 'city'])`

**Explanation:** Traverses deeper to access the 'city' property within the 'address' object of the selected user.

**Result:** `San Francisco`

## 3. Filtering an Array Using a Function

**Query:** `deepDive(sampleData, ['users', (user: any) => user.age >= 18])`

**Explanation:** Filters the 'users' array to return only users with age 18 or older.

**Result:**

```json
[
    {
        "name": "Adam Smith",
        "age": 27,
        "address": {
            "line1": "123 Main St.",
            "line2": "Apt 101",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94103"
        }
    },
    {
        "name": "Barbara Jones",
        "age": 31,
        "address": {
            "line1": "300 Madison Ave.",
            "line2": "",
            "city": "Chicago",
            "state": "IL",
            "zip": "60606"
        }
    },
    {
        "name": "David Lopez",
        "age": 42,
        "address": {
            "line1": "5432 27th St.",
            "line2": "Apt 789",
            "city": "New York",
            "state": "NY",
            "zip": "10023"
        }
    }
]
```

## 4. Getting Specific Properties from an Array of Objects

**Query:** `deepDive(sampleData, ['users', ['name', 'age']])`

**Explanation:** Extracts the 'name' and 'age' properties from each user in the 'users' array.

**Result:**

```json
[
    {
        "name": "Adam Smith",
        "age": 27
    },
    {
        "name": "Barbara Jones",
        "age": 31
    },
    {
        "name": "Chris Lee",
        "age": 16
    },
    {
        "name": "David Lopez",
        "age": 42
    },
    {
        "name": "Ellen Anderson",
        "age": 15
    }
]
```

## 5. Getting specific properties from filtered array

**Query:** `deepDive(sampleData, ['users', (user: any) => user.age >= 18, ['name', 'address','city']])`

**Explanation:** Filters the 'users' array to return only users with age 18 or older and then extracts the name, address and city properties.

**Result:**

```json
[
    {
        "name": "Adam Smith",
        "address": {
            "line1": "123 Main St.",
            "line2": "Apt 101",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94103"
        }
    },
    {
        "name": "Barbara Jones",
        "address": {
            "line1": "300 Madison Ave.",
            "line2": "",
            "city": "Chicago",
            "state": "IL",
            "zip": "60606"
        }
    },
    {
        "name": "David Lopez",
        "address": {
            "line1": "5432 27th St.",
            "line2": "Apt 789",
            "city": "New York",
            "state": "NY",
            "zip": "10023"
        }
    }
]
```

## 6. Accessing a specific index of filtered array

**Query:** `deepDive(sampleData,['users', (user:any) => user.age >= 18, 0, 'address', 'city'])`

**Explanation:** Filters the 'users' array to return only users with age 18 or older, then gets the first element and then gets the address.city

**Result:** `San Francisco`

## 7. Setting a Value

**Query:** `deepDive(sampleData, ['users', 0, 'age'], 68)`

**Explanation:** Sets the first user's age to 68.

**Result:** `68`

## 8. Setting Multiple Values in Array

**Query:** `deepDive(sampleData,['users', ['age', 'name'] ], [100, "Updated Name"])`

**Explanation:** Sets all users age to 100 and their name to updated name.

**Result:**

```json
{
    "users": [
        {
            "name": "Updated Name",
            "age": 100,
            "address": {
                "line1": "123 Main St.",
                "line2": "Apt 101",
                "city": "San Francisco",
                "state": "CA",
                "zip": "94103"
            }
        },
        {
            "name": "Updated Name",
            "age": 100,
            "address": {
                "line1": "300 Madison Ave.",
                "line2": "",
                "city": "Chicago",
                "state": "IL",
                "zip": "60606"
            }
        },
        {
            "name": "Updated Name",
            "age": 100,
            "address": {
                "line1": "1801 N. Miami Dr.",
                "line2": "",
                "city": "Miami",
                "state": "FL",
                "zip": "33132"
            }
        },
        {
            "name": "Updated Name",
            "age": 100,
            "address": {
                "line1": "5432 27th St.",
                "line2": "Apt 789",
                "city": "New York",
                "state": "NY",
                "zip": "10023"
            }
        },
        {
            "name": "Updated Name",
            "age": 100,
            "address": {
                "line1": "2917 North Ave.",
                "line2": "",
                "city": "Washington",
                "state": "DC",
                "zip": "20012"
            }
        }
    ],
    "selectedUserIndex": 0
}
```
