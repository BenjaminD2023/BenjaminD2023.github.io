#!/usr/bin/env python3
"""
Simple HTTP server for HP Tracker
Serves files on port 8888
"""
import http.server
import socketserver
import os

PORT = 3001
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🎮 HP Tracker Server Running!")
        print(f"📊 Main Display: http://localhost:{PORT}/index.html")
        print(f"🎛️  Control Panel: http://localhost:{PORT}/server.html")
        print(f"\nPress Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped")
