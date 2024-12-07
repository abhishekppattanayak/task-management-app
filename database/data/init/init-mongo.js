db = db.getSiblingDB('tasks');
db.createCollection('tasks');

db.tasks.insertMany([
  {
      "_id": "6750b57cf980769a370d8191",
      "id": "952311cb-8beb-4b01-ba8f-b80dde28ef43",
      "title": "Prepare slides for meeting",
      "status": "Pending",
      "priority": "Medium",
      "dueDate": "2024-12-05",
      "group": ""
  },
  {
      "_id": "6753191483c8e4b602d366dc",
      "id": "afcffde8-5ecd-4ead-89fc-6f2616d706ed",
      "title": "Submit the project",
      "priority": "High",
      "status": "Pending",
      "dueDate": "2024-12-07",
      "group": ""
  },
  {
      "_id": "67537b5424d3c8e786407c31",
      "id": "507716ed-68c1-412e-b0f8-5f41f7cc0e6f",
      "title": "Add filters for the list",
      "priority": "High",
      "status": "Pending",
      "dueDate": "2024-12-08",
      "group": ""
  },
  {
      "_id": "67537b6c24d3c8e786407c32",
      "id": "6786cc21-eae5-4ecf-820e-aab302dc2269",
      "title": "Work on the sidebar",
      "priority": "Low",
      "status": "Completed",
      "dueDate": "2024-12-09",
      "group": ""
  },
  {
      "_id": "67537b9724d3c8e786407c33",
      "id": "b55ddde1-4310-432b-9fcb-1f3832fb46d7",
      "title": "Update README.md",
      "priority": "Medium",
      "status": "Pending",
      "dueDate": "2024-12-08",
      "group": ""
  },
  {
      "_id": "67537c3824d3c8e786407c34",
      "id": "f195c9e9-6899-496a-bcab-c2c39baf4299",
      "title": "Add dockerfiles",
      "priority": "Medium",
      "status": "Pending",
      "dueDate": "2024-12-08",
      "group": ""
  },
  {
      "_id": "67537c5324d3c8e786407c35",
      "id": "7cab9ecb-d71f-4ffb-b9ac-c8110c5f0432",
      "title": "Use docker compose to manage containers",
      "priority": "Medium",
      "status": "Pending",
      "dueDate": "2024-12-07",
      "group": ""
  },
  {
      "_id": "67537e8d24d3c8e786407c36",
      "id": "da394906-72af-4f35-a95e-165155430541",
      "title": "Eat Snickers",
      "priority": "Low",
      "status": "Completed",
      "dueDate": "2024-12-10",
      "group": ""
  }
]);