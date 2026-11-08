# server.py - Port 7860 Dummy HTTP Health Server for Hugging Face Spaces
import http.server
import socketserver
import os

PORT = int(os.environ.get("PORT", 7860))

class HealthHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        html = """<!DOCTYPE html>
<html>
    <head><title>Musicishu 24/7 Status</title></head>
    <body style="background:#0f172a;color:#10b981;font-family:sans-serif;padding:40px;text-align:center;">
        <h1>Musicishu Bot is Running 24/7</h1>
        <p style="color:#94a3b8;">Hugging Face Space Active | 16 GB RAM | Audio Streaming Online</p>
        <div style="font-size:12px;color:#64748b;margin-top:20px;">Health Check Endpoint OK (Status 200)</div>
    </body>
</html>"""
        self.wfile.write(html.encode("utf-8"))

def start_server():
    with socketserver.TCPServer(("", PORT), HealthHandler) as httpd:
        print(f"[*] Hugging Face Health Server listening on port {PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()
