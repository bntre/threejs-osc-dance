"""
Simple WebSocket Broadcast Server (Python)

Requirements:
    - Python 3.9+
    - websockets

Install:
    pip install websockets

Run:
    python ws_broadcast_server.py
"""

import asyncio
import json
import websockets

clients = set()

async def handler(websocket):
    clients.add(websocket)
    print(f"Client connected | total clients: {len(clients)}")

    try:
        async for message in websocket:
            msg_type = type(message).__name__
            msg_len = len(message) if hasattr(message, "__len__") else "?"

            print(
                "Message received",
                "| type:", msg_type,
                "| len:", msg_len
            )

            # Try to parse JSON (optional debug)
            if isinstance(message, (str, bytes)):
                try:
                    text = message.decode("utf-8") if isinstance(message, bytes) else message
                    parsed = json.loads(text)
                    print("Parsed JSON:", parsed)
                except Exception:
                    print("Not JSON")

            # Broadcast to all connected clients
            disconnected = []
            for client in clients:
                try:
                    await client.send(message)
                except websockets.exceptions.ConnectionClosed:
                    disconnected.append(client)

            for client in disconnected:
                clients.remove(client)

    finally:
        clients.remove(websocket)
        print(f"Client disconnected | total clients: {len(clients)}")


async def main():
    async with websockets.serve(handler, "0.0.0.0", 8080):
        print("WebSocket server running on ws://localhost:8080")
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
