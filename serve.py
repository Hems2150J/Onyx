from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

port = 8000
handler = SimpleHTTPRequestHandler
server = ThreadingHTTPServer(('127.0.0.1', port), handler)
print(f"Starting multi-threaded server on 127.0.0.1:{port}")
try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down server.")
    server.server_close()
