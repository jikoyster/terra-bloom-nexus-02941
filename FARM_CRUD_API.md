# Farm CRUD API Documentation

## Overview
Complete CRUD (Create, Read, Update, Delete) API for managing farms in the Aether Protocol system.

## Base URL
```
http://localhost:5000/api/farms
```

## Endpoints

### 1. Create a Farm
**POST** `/api/farms`

Creates a new farm in the system.

#### Request Body
```json
{
  "name": "string (required)",
  "region": "string (required)",
  "address": "string (optional)",
  "crops": "string (optional)",
  "hectares": "number (optional)",
  "yield": "number (optional)",
  "carbon_sequestered": "number (optional)"
}
```

#### Example Request
```bash
curl -X POST http://localhost:5000/api/farms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Green Valley Farm",
    "region": "Eastern Region",
    "address": "123 Farm Road, Village",
    "crops": "Maize, Beans, Wheat",
    "hectares": 50,
    "yield": 2500,
    "carbon_sequestered": 1200
  }'
```

#### Response (201 Created)
```json
{
  "farm_id": 1,
  "name": "Green Valley Farm",
  "region": "Eastern Region",
  "address": "123 Farm Road, Village",
  "crops": "Maize, Beans, Wheat",
  "hectares": 50,
  "yield": 2500,
  "carbon_sequestered": 1200,
  "created_at": "2026-02-09T10:30:00Z",
  "updated_at": "2026-02-09T10:30:00Z"
}
```

---

### 2. Get All Farms
**GET** `/api/farms`

Retrieves a list of all farms.

#### Example Request
```bash
curl -X GET http://localhost:5000/api/farms
```

#### Response (200 OK)
```json
[
  {
    "farm_id": 1,
    "name": "Green Valley Farm",
    "region": "Eastern Region",
    "address": "123 Farm Road, Village",
    "crops": "Maize, Beans, Wheat",
    "hectares": 50,
    "yield": 2500,
    "carbon_sequestered": 1200,
    "created_at": "2026-02-09T10:30:00Z",
    "updated_at": "2026-02-09T10:30:00Z"
  },
  {
    "farm_id": 2,
    "name": "Sunset Hills Farm",
    "region": "Western Region",
    "address": "456 Rural Lane, Town",
    "crops": "Rice, Sorghum",
    "hectares": 75,
    "yield": 3500,
    "carbon_sequestered": 1800,
    "created_at": "2026-02-08T14:15:00Z",
    "updated_at": "2026-02-08T14:15:00Z"
  }
]
```

---

### 3. Get Farm by ID
**GET** `/api/farms/{id}`

Retrieves details of a specific farm.

#### Path Parameters
- `id` (number, required): The farm ID

#### Example Request
```bash
curl -X GET http://localhost:5000/api/farms/1
```

#### Response (200 OK)
```json
{
  "farm_id": 1,
  "name": "Green Valley Farm",
  "region": "Eastern Region",
  "address": "123 Farm Road, Village",
  "crops": "Maize, Beans, Wheat",
  "hectares": 50,
  "yield": 2500,
  "carbon_sequestered": 1200,
  "created_at": "2026-02-09T10:30:00Z",
  "updated_at": "2026-02-09T10:30:00Z"
}
```

#### Error Response (404 Not Found)
```json
{
  "error": "Farm not found"
}
```

---

### 4. Update a Farm
**PUT** `/api/farms/{id}`

Updates an existing farm. Only provided fields will be updated.

#### Path Parameters
- `id` (number, required): The farm ID

#### Request Body
```json
{
  "name": "string (optional)",
  "region": "string (optional)",
  "address": "string (optional)",
  "crops": "string (optional)",
  "hectares": "number (optional)",
  "yield": "number (optional)",
  "carbon_sequestered": "number (optional)"
}
```

#### Example Request
```bash
curl -X PUT http://localhost:5000/api/farms/1 \
  -H "Content-Type: application/json" \
  -d '{
    "hectares": 60,
    "yield": 3000,
    "carbon_sequestered": 1500
  }'
```

#### Response (200 OK)
```json
{
  "farm_id": 1,
  "name": "Green Valley Farm",
  "region": "Eastern Region",
  "address": "123 Farm Road, Village",
  "crops": "Maize, Beans, Wheat",
  "hectares": 60,
  "yield": 3000,
  "carbon_sequestered": 1500,
  "created_at": "2026-02-09T10:30:00Z",
  "updated_at": "2026-02-09T11:45:00Z"
}
```

---

### 5. Delete a Farm
**DELETE** `/api/farms/{id}`

Deletes a farm from the system.

#### Path Parameters
- `id` (number, required): The farm ID

#### Example Request
```bash
curl -X DELETE http://localhost:5000/api/farms/1
```

#### Response (200 OK)
```json
{
  "message": "Farm deleted successfully"
}
```

#### Error Response (404 Not Found)
```json
{
  "error": "Farm not found"
}
```

---

### 6. Get Farm Soil Assessments
**GET** `/api/farms/{id}/soil`

Retrieves all soil assessments for a specific farm.

#### Path Parameters
- `id` (number, required): The farm ID

#### Example Request
```bash
curl -X GET http://localhost:5000/api/farms/1/soil
```

#### Response (200 OK)
```json
[
  {
    "assessment_id": 1,
    "farm_id": 1,
    "ph_level": 6.5,
    "nitrogen": 25,
    "phosphorus": 15,
    "potassium": 200,
    "assessment_date": "2026-02-09T10:30:00Z"
  }
]
```

---

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "error": "Name and region are required"
}
```

#### 404 Not Found
```json
{
  "error": "Farm not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Failed to [operation]"
}
```

---

## Status Codes

- `200 OK` - Successful GET, PUT, DELETE request
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `farm_id` | number | Auto | Unique identifier for the farm |
| `name` | string | Yes | Name of the farm |
| `region` | string | Yes | Geographic region where farm is located |
| `address` | string | No | Physical address of the farm |
| `crops` | string | No | Comma-separated list of crops grown |
| `hectares` | number | No | Total land area in hectares |
| `yield` | number | No | Total crop yield (kg or units) |
| `carbon_sequestered` | number | No | Carbon sequestered amount |
| `created_at` | ISO 8601 | Auto | Timestamp of creation |
| `updated_at` | ISO 8601 | Auto | Timestamp of last update |

---

## Frontend Integration

### Using the useFarms Hook

```typescript
import { useFarms } from '@/hooks/useFarms';

function MyComponent() {
  const {
    farms,
    loading,
    error,
    fetchFarms,
    createFarm,
    updateFarm,
    deleteFarm
  } = useFarms();

  // Fetch all farms on component mount
  useEffect(() => {
    fetchFarms();
  }, []);

  // Create a new farm
  const handleCreate = async () => {
    const newFarm = await createFarm({
      name: 'New Farm',
      region: 'Central Region'
    });
  };

  // Update a farm
  const handleUpdate = async (farmId: number) => {
    const updated = await updateFarm(farmId, {
      hectares: 100
    });
  };

  // Delete a farm
  const handleDelete = async (farmId: number) => {
    await deleteFarm(farmId);
  };
}
```

### Using the FarmsList Component

```typescript
import { FarmsList } from '@/components/dashboard/farms';

export function Dashboard() {
  return <FarmsList />;
}
```

---

## Testing

### Using Postman/cURL

1. **Create a farm:**
   ```bash
   POST http://localhost:5000/api/farms
   ```

2. **List all farms:**
   ```bash
   GET http://localhost:5000/api/farms
   ```

3. **Get specific farm:**
   ```bash
   GET http://localhost:5000/api/farms/1
   ```

4. **Update farm:**
   ```bash
   PUT http://localhost:5000/api/farms/1
   ```

5. **Delete farm:**
   ```bash
   DELETE http://localhost:5000/api/farms/1
   ```
