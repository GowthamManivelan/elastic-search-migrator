import asyncio
from datetime import datetime
from pymongo import MongoClient
from viam.robot.client import RobotClient
from viam.components.board import Board
from viam.components.motor import Motor
from viam.components.base import Base
from viam.components.camera import Camera
from viam.components.encoder import Encoder
from viam.components.movement_sensor import MovementSensor
from viam.services.vision import VisionClient

# Replace with your actual MongoDB URI, database, and collection names
MONGO_URI = 'your_mongodb_uri'
DATABASE_NAME = 'your_database_name'
COLLECTION_NAME = 'your_collection_name'

async def connect():
    opts = RobotClient.Options.with_api_key(
        api_key='et5spqlo1np20ziu915ihifbwkf070l9',
        api_key_id='90e41180-d694-426b-877c-2b9cc5cafd36'
    )
    return await RobotClient.at_address('ecommerce-robot-main.s7yh0cudj1.viam.cloud', opts)

async def main():
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collection = db[TIME_SERIES_COLLECTION_NAME]

    robot = await connect()
    print('Resources:')
    print(robot.resource_names)

    # Add your code to interact with the robot and gather data here
    # For example, interacting with the 'right' motor:
    right = Motor.from_robot(robot, "right")
    right_return_value = await right.is_moving()
    print(f"right is_moving return value: {right_return_value}")

    # Replace 'x_coordinate' and 'y_coordinate' with actual values
    right_data = {
        "component_type": "rdk:component:motor",
        "component_name": "right",
        # ... other fields ...
        "data": {
            "is_on": right_return_value,
            "power_pct": 0  # Replace with actual power percentage if available
        },
        "position": {
            "x": x_coordinate,  # Replace with actual x coordinate
            "y": y_coordinate   # Replace with actual y coordinate
        },
        "time_received": datetime.now().isoformat()
    }
    collection.insert_one(right_data)

    # Repeat similar blocks for other components

    # Close the robot and MongoDB client
    await robot.close()
    client.close()

if __name__ == '__main__':
    asyncio.run(main())
