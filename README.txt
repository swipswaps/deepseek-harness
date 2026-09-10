================================================================================
DEEPSEEK HARNESS 2.0 & V4.1 FLASH ARCHITECTURE
Academic Specification, Theoretical Framework, & Operational Reference Manual
================================================================================

1. ABSTRACT & SYSTEM ARCHITECTURE
--------------------------------------------------------------------------------
The DeepSeek Harness 2.0 provides an asynchronous, event-driven middleware framework
designed to orchestrate high-throughput, low-latency inferencing operations against
the DeepSeek V4.1 Flash language model architecture.

By encapsulating the transport semantics and runtime state within a lightweight Node.js
daemon context, the harness decouples local client execution from continuous inference
pipelines. The application layer leverages native HTTP standard modules to minimize
heap overhead, eliminate dependency bloat, and maintain an immutable operational footprint.

System Architecture Topology:
+----------------------------------------------------------------------------+
|                        Systemd User Space Service                          |
|                       (deepseek-harness.service)                           |
|                                                                            |
|  +----------------------+      HTTP Socket Loop      +------------------+  |
|  | Node.js Runtime (v22+) |  <======================>  | Local Host/Port  |  |
|  |  [src/index.js]      |    (127.0.0.1:3080)        |  [Client App]    |  |
|  +----------------------+                            +------------------+  |
|            |                                                               |
|            v Environment Layer                                             |
|     [.env State Specs]                                                     |
+----------------------------------------------------------------------------+


2. DEPLOYMENT & INSTALLATION PROTOCOL
--------------------------------------------------------------------------------
Executing standard installation requires a modern Node.js environment (>=22.19.0)
and systemd for background daemonization.

Step 1: Clone and Stage Environment
  git clone https://github.com/swipswaps/deepseek-harness.git
  cd deepseek-harness
  cp .env.example .env

Step 2: Install Audited Dependencies
  npm install

Step 3: Register and Instantiate Systemd Unit
  mkdir -p ~/.config/systemd/user
  ln -sf "$(pwd)/systemd/deepseek-harness.service" ~/.config/systemd/user/
  systemctl --user daemon-reload
  systemctl --user enable --now deepseek-harness.service

Step 4: Verify Runtime Health
  curl -s http://127.0.0.1:3080/health


3. API ENDPOINT SPECIFICATIONS
--------------------------------------------------------------------------------
The daemon exposes clean RESTful HTTP interfaces for programmatic probing and state inspection.

--------------------------------------------------------------------------------
Endpoint:     GET /health
Description:  Returns runtime system metrics, initialized model context, and ISO timestamp.
Protocol:     HTTP/1.1
Response Code: 200 OK
Payload Type: application/json

Example Response:
{
  "status": "OK",
  "model": "deepseek-ai/deepseek-v4.1-flash",
  "timestamp": "2026-09-10T19:09:16.604Z"
}

--------------------------------------------------------------------------------
Endpoint:     GET /
Description:  Root verification endpoint for basic daemon connectivity.
Protocol:     HTTP/1.1
Response Code: 200 OK
Payload Type: text/plain

Example Response:
DeepSeek Harness 2.0 Online | Active Model: deepseek-ai/deepseek-v4.1-flash


4. TROUBLESHOOTING & PAIN POINT MATRIX
--------------------------------------------------------------------------------
+-------------------------------+-----------------------------------+---------------------------------------------------+
| Error / Symptom               | Root Cause Analysis               | Remediation Protocol                              |
+-------------------------------+-----------------------------------+---------------------------------------------------+
| `ERR_MODULE_NOT_FOUND` on launch| Non-existent or unresolvable      | Remove non-existent packages from package.json;   |
|                               | npm dependencies in manifest.     | execute clean `npm install` with audit enabled.   |
+-------------------------------+-----------------------------------+---------------------------------------------------+
| Connection Refused (Port 3080)| Service unit failed to bind or    | Verify unit state: `systemctl --user status        |
|                               | port collision on host interface. | deepseek-harness`. Adjust DSH_PORT in `.env`.     |
+-------------------------------+-----------------------------------+---------------------------------------------------+
| `ETARGET` / `E404` npm error  | Dependency tag requested from     | Audit `package.json` against public npm registry  |
|                               | public registry does not exist.   | indices; clear legacy package caches.             |
+-------------------------------+-----------------------------------+---------------------------------------------------+
| `git push` Rejected           | Local tracking branch detached or | Re-align local HEAD with remote tracking branch:  |
|                               | upstream remote mismatch.         | `git push -u origin main`.                        |
+-------------------------------+-----------------------------------+---------------------------------------------------+
| Non-breaking space syntax     | Clipboard copying introduced      | Sanitize script via ASCII strip:                  |
| error (`\u00A0`) in bash      | non-standard UTF-8 characters.    | `sed -i 's/\xC2\xA0/ /g' script.sh`.              |
+-------------------------------+-----------------------------------+---------------------------------------------------+


5. REPOSITORY SYNCHRONIZATION
--------------------------------------------------------------------------------
To commit this updated documentation specification and push to the public remote:

  git add README.txt
  git commit -m "docs(readme): add academic specification, API endpoints, and troubleshooting matrix"
  git push origin main
