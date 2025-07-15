from datetime import datetime
import subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer

log_file = "learning-log.txt"

class Handler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path == "/push":
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            # ログファイルに書き込む
            with open(log_file, "a") as f:
                f.write(f"Udemy視聴ログ: {timestamp}\n")

            # Gitでコミット＆プッシュ
            subprocess.run(["git", "add", log_file], check=True)
            subprocess.run(["git", "commit", "-m", f"学習ログ {timestamp}"], check=True)
            subprocess.run(["git", "push"], check=True)

            # レスポンス（CORSヘッダー込み）
            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()
            self.wfile.write(b"Push Complete")

def run_server():
    server_address = ('', 3001)
    httpd = HTTPServer(server_address, Handler)
    print("Push server running at http://localhost:3001")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()
