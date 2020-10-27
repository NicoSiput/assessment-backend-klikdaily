## Available Scripts
In the project directory, you can run:
```bash
npm run seeding
```
Runs the app for seeding data to database

```bash
npm run start
```
Starting the app in port: **3000**
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available API Endpoint 
In this project, you can access this endpoint:

### `/klikdaily/stocks`
> Method: **GET**

Response:
```json
{
    "status_code": 200,
    "status_message": "Success",
    "stocks": [
        {
            "id": 1,
            "location": "A-1-1",
            "quantity": 100,
            "product": "Indomie Goreng"
        },
        {
            "id": 2,
            "location": "A-1-2",
            "quantity": 68,
            "product": "Indomie Rebus"
        },
        {
            "id": 3,
            "location": "A-1-3",
            "quantity": 25,
            "product": "Gula Pasir"
        },
        {
            "id": 4,
            "location": "A-1-4",
            "quantity": 67,
            "product": "Aqua"
        },
        {
            "id": 5,
            "location": "A-1-5",
            "quantity": 45,
            "product": "Adees"
        },
        {
            "id": 6,
            "location": "A-1-6",
            "quantity": 15,
            "product": "Le Mineral"
        }
    ]
}
```

### `/klikdaily/adjustment`
> Method: **POST**

Request: 
```json
[
    {
        "location_id": 1,
        "product": "Indomie Goreng",
        "adjustment": -10
    },
    {
        "location_id": 2,
        "product": "Indomie Rebus",
        "adjustment": -40
    },
    {
        "location_id": 3,
        "product": "Gula",
        "adjustment": 15
    },
    {
        "location_id": 7,
        "product": "Gula",
        "adjustment": 5
    }
]
```
Response:
```json
{
    "status_code": 200,
    "status_message": "Success",
    "requests": 4,
    "adjusted": 2,
    "results": [
        {
            "status": "Success",
            "updated_at": "2020-10-27T05:50:59.336Z",
            "location_id": 1,
            "location_name": "A-1-1",
            "product": "Indomie Goreng",
            "adjustment": -10,
            "stock_quantity": 90
        },
        {
            "status": "Success",
            "updated_at": "2020-10-27T05:50:59.340Z",
            "location_id": 2,
            "location_name": "A-1-2",
            "product": "Indomie Rebus",
            "adjustment": -40,
            "stock_quantity": 28
        },
        {
            "status": "Failed",
            "error_message": "Invalid Product",
            "updated_at": "2020-10-27T05:50:59.342Z",
            "location_id": 3
        },
        {
            "status": "Failed",
            "error_message": "Invalid Location Id",
            "updated_at": "2020-10-27T05:50:59.342Z",
            "location_id": 7
        }
    ]
}
```

### `/klikdaily/logs/{id_location}`
> Method: **GET**

Response:
#### Logs found
```json
{
    "status_code": 200,
    "status_message": "Success, logs found",
    "id": 1,
    "name": "Indomie Goreng",
    "qty": 115,
    "location_id": 1,
    "created_at": "2020-10-27T05:43:00.000Z",
    "updated_at": "2020-10-27T05:52:55.000Z",
    "location": "A-1-1",
    "logs": [
        {
            "id": 3,
            "type": "Inbound",
            "adjustment": 25,
            "qty": 115,
            "location_id": 1,
            "created_at": "2020-10-27T05:52:55.000Z"
        },
        {
            "id": 1,
            "type": "Outbound",
            "adjustment": -10,
            "qty": 90,
            "location_id": 1,
            "created_at": "2020-10-27T05:50:59.000Z"
        }
    ]
}
```

#### Logs not found
```json
{
    "status_code": 403,
    "status_message": "Failed"
}
```

#### Id Location not found
```json
{
    "status_code": 403,
    "status_message": "Failed, location id not found"
}
```
