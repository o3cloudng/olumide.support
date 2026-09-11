import { CaseStudy } from '../types';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  // CASE STUDY 1
  {
    id: 'cs-app-down-investigation',
    title: 'When "The Application Is Down" Isn\'t Enough',
    subtitle: 'Transforming a Vague Outage Complaint into a Deterministic Root-Cause Escalation',
    label: 'Representative Case Study',
    category: 'API & Integration Diagnostics',
    tags: ['Incident Management', 'API', 'Database', 'Technical Communication'],
    severity: 'P1 - Critical',
    summary:
      'A Tier 1 escalation where an enterprise customer reported sudden, unpredictable application downtime. Through systematic telemetry, log tracing, API isolation, and database connection pooling analysis, the issue was isolated to an unthrottled asynchronous batch export process starving backend worker threads.',
    skills: [
      'Incident triage',
      'Log analysis',
      'APIs',
      'Databases',
      'RCA',
      'Escalation',
      'Customer communication',
    ],
    ticketSnippet: {
      customerName: 'Enterprise SaaS Customer (Multi-Tenant Account)',
      reportedIssue: 'The application is randomly failing. Users keep getting blank screens and error timeouts.',
      environment: 'Python / Django SaaS Platform • PostgreSQL Cluster • Redis • Nginx Ingress',
    },
    theThreeProblems: {
      technical:
        'Unbounded report export queries saturated PostgreSQL connection pools and consumed all Gunicorn worker threads, causing HTTP 504 Gateway Timeouts for concurrent interactive user sessions.',
      customer:
        'Mid-day operations were halted for 120+ customer staff members, blocking real-time compliance reporting and order verifications.',
      communication:
        'The customer believed the entire cloud platform had crashed; they needed immediate reassurance, structured updates, and an interim bypass while engineering deployed the worker separation.',
    },
    problem: {
      reportedStatement: 'The application is randomly failing.',
      clarificationProcess: [
        'Checked global infrastructure dashboards: confirmed core cluster was healthy, ruling out a total service outage.',
        'Contacted customer contact with targeted clarifying questions: requested specific user handles, timestamp of the most recent failure, and the exact action being performed when the screen went blank.',
        'Identified that errors were concentrated primarily within the organization’s "Operations & Audit" departmental tenant.',
      ],
      technicalContext:
        'A multi-tenant Django SaaS environment running behind Nginx reverse proxies with Gunicorn application workers and a managed PostgreSQL relational database.',
    },
    customerImpact: {
      operationalImpact:
        'Over 120 operational team members experienced intermittent 504 Gateway Timeouts when loading core dashboard tables and approving operational queues.',
      businessRisk:
        'Operational bottleneck during peak business hours; customer threatened breach-of-SLA penalties if uptime was not immediately restored.',
      urgencyClassification: 'P1 - Critical / High Blast Radius',
    },
    investigation: {
      narrative:
        'Rather than asking the customer to guess why their application was failing, I conducted a systematic diagnostic probe across the entire request lifecycle—from edge ingress to application workers, relational queries, and cache layers.',
      steps: [
        {
          phase: '1. Clarify Report',
          action: 'Extracted tenant ID and exact timestamps from customer logs rather than relying on subjective descriptions.',
          findings: 'Spike in HTTP 504 responses observed between 13:42 UTC and 14:15 UTC specifically on `/api/v2/audit-logs/export`.',
          status: 'verified',
        },
        {
          phase: '2. Reproduce Issue',
          action: 'Replicated request in staging environment using an account populated with comparable row volume (1.8M records).',
          findings: 'The export endpoint executed synchronously, holding an open HTTP worker connection for > 72 seconds before timing out.',
          status: 'verified',
          codeOrQuery: 'curl -i -X POST "https://staging.app.internal/api/v2/audit-logs/export" \\\n  -H "Authorization: Bearer $TEST_TOKEN" \\\n  -d \'{"format":"csv","range":"last_90_days"}\'',
        },
        {
          phase: '3. Application Logs',
          action: 'Inspected Gunicorn and Django application logs within the incident timeframe.',
          findings: 'Discovered `CRITICAL: WORKER TIMEOUT (pid:14082)` followed by worker recycling storms.',
          status: 'isolated',
          codeOrQuery: '[202X-09-11 13:48:22 +0000] [14082] [CRITICAL] WORKER TIMEOUT (pid:14082)\n[202X-09-11 13:48:23 +0000] [14099] [INFO] Booting worker with pid: 14099',
        },
        {
          phase: '4. API Behaviour',
          action: 'Inspected Nginx access logs for upstream response latency distributions.',
          findings: 'Upstream response time spiked from median 85ms to > 60.000s on concurrent requests.',
          status: 'verified',
        },
        {
          phase: '5. Database State',
          action: 'Queried `pg_stat_activity` on PostgreSQL cluster to inspect active locks and connection allocation.',
          findings: 'Active connections reached 98/100 cap; 14 workers were blocked waiting on sequential scans on `audit_event_records`.',
          status: 'isolated',
          codeOrQuery: 'SELECT pid, age(clock_timestamp(), query_start), usename, state, query \nFROM pg_stat_activity \nWHERE state != \'idle\' AND query ILIKE \'%audit_event_records%\' \nORDER BY query_start ASC;',
        },
        {
          phase: '6. Check Dependencies',
          action: 'Validated Redis cache instances and Celery task broker health.',
          findings: 'Redis was operational with low CPU (< 8%), confirming the issue was not cache infrastructure failure.',
          status: 'verified',
        },
        {
          phase: '7. Pattern Identification',
          action: 'Correlated tenant export clicks with Gunicorn worker saturation.',
          findings: 'The customer had onboarded 4 new audit interns who were simultaneously triggering full historical CSV exports.',
          status: 'isolated',
        },
      ],
    },
    evidence: {
      summary:
        'Deterministic log traces and database query outputs capturing Gunicorn worker timeouts and unindexed table scans.',
      artifacts: [
        {
          title: 'PostgreSQL pg_stat_activity Connection Contention',
          type: 'sql',
          code: `SELECT pid, age(clock_timestamp(), query_start), state, wait_event_type, wait_event, query
FROM pg_stat_activity
WHERE state = 'active' AND wait_event_type = 'Lock'
ORDER BY query_start ASC LIMIT 5;

-- Output:
-- pid: 2841 | duration: 00:02:18 | wait_event: relation | SELECT * FROM audit_event_records WHERE tenant_id = 't_9918' ORDER BY created_at DESC;
-- pid: 2849 | duration: 00:02:14 | wait_event: relation | SELECT * FROM audit_event_records WHERE tenant_id = 't_9918' ORDER BY created_at DESC;`,
          note: 'Multiple concurrent unindexed exports monopolizing read replicas and connection pool slots.',
        },
        {
          title: 'Nginx Ingress 504 Gateway Timeout Log Trace',
          type: 'log',
          code: `[11/Sep/202X:13:49:02 +0000] "POST /api/v2/audit-logs/export HTTP/2.0" 504 167 "https://app.client.com/audit" "Mozilla/5.0..." upstream_response_time: 60.004 upstream_connect_time: 0.001 upstream_status: 504`,
          note: 'Nginx terminating client connection after 60s upstream worker lockup.',
        },
      ],
    },
    rootCause: {
      headline:
        'Synchronous execution of heavy historical data exports on interactive web worker threads without rate-limiting or background queue isolation.',
      technicalDetails:
        'When multiple users triggered simultaneous 90-day historical exports, each export occupied a synchronous Gunicorn worker thread and held an open database cursor for over 60 seconds. This rapidly starved the 16 available web worker processes, preventing quick interactive requests (such as page loads and authentication checks) from being served, resulting in cascading 504 Gateway Timeouts.',
    },
    action: {
      immediateMitigation: [
        'Temporarily terminated long-running blocking queries in PostgreSQL (`pg_terminate_backend`) to immediately release connection pool locks and restore interactive portal availability.',
        'Provided the customer admin with a recommended filtering parameter (querying in 7-day increments) to allow critical audits to proceed without crashing workers.',
      ],
      engineeringEscalation: [
        'Created a high-priority Jira bug ticket with reproduction payload, query plans, and memory footprints.',
        'Escalated to engineering with a concrete architecture recommendation: decouple `/export` from synchronous HTTP workers to asynchronous Celery background workers with signed S3 download URLs.',
      ],
    },
    communication: {
      strategy:
        'Delivered proactive status updates every 20 minutes to customer technical leadership, distinguishing between the immediate database release and the permanent asynchronous worker fix.',
      stakeholderUpdates: [
        'Initial Triage (13:55 UTC): "We have identified that interactive portal requests are encountering delays due to heavy concurrent audit exports holding server worker connections. We are clearing the backlog now."',
        'Mitigation (14:12 UTC): "Connection pools have been cleared and normal dashboard responsiveness is fully restored. We have applied a temporary guardrail while engineering finalizes background task migration."',
        'Closure & Prevention (16:30 UTC): "Detailed RCA delivered to customer executive team explaining the background worker separation and enhanced database index deployment."',
      ],
    },
    resolution: {
      summary:
        'Service availability restored within 30 minutes; background worker migration deployed by engineering within 24 hours with zero recurrence.',
      confirmationSteps: [
        'Verified p95 API response times dropped back down to 110ms across all tenant endpoints.',
        'Confirmed PostgreSQL active connection count stabilized below 22% of maximum capacity.',
        'Monitored customer tenant through peak afternoon hours with 100% successful report deliveries.',
      ],
    },
    prevention: {
      systemicMeasures: [
        'Offloaded all exports to asynchronous Celery queues with job status polling and email/download notification links.',
        'Configured PostgreSQL statement timeouts (`statement_timeout = 15000`) on interactive web user pools to protect against thread starvation.',
        'Configured Datadog APM alerts for Gunicorn active worker saturation (> 70% threshold).',
        'Authored internal support runbook: "Triage & Remediation for Web Worker Exhaustion".',
      ],
    },
    metricsImpact: 'Uptime restored to 99.98% for customer tenant; zero worker timeout recurrences reported.',
  },

  // CASE STUDY 2
  {
    id: 'cs-repeated-tickets-pattern',
    title: 'From Repeated Tickets to Root Cause',
    subtitle: 'Analyzing Recurring Support Requests as Architectural Signals Rather than Firefighting Tickets',
    label: 'Portfolio Demonstration',
    category: 'Support Operations & Documentation',
    tags: ['Incident Management', 'Customer Success', 'Technical Communication', 'Documentation'],
    severity: 'P2 - High',
    summary:
      'Rather than treating repetitive user tickets as isolated operational noise, analyzed incoming ticket frequency to uncover a silent session expiration defect during multi-page form completion. Bridged user workflow analysis, knowledge base guidance, and engineering feedback to permanently eliminate the issue.',
    skills: [
      'Pattern recognition',
      'Workflow analysis',
      'Root cause analysis',
      'Technical documentation',
      'Agile feedback loop',
      'Customer advocacy',
    ],
    ticketSnippet: {
      customerName: 'Multiple Enterprise Account Administrators',
      reportedIssue: 'Users repeatedly report: "My changes disappeared" and "System logged me out when I clicked Save."',
      environment: 'Web Application • OAuth2 / JWT Token Refresh • Multi-Step Form Wizard',
    },
    theThreeProblems: {
      technical:
        'Client-side JWT access tokens expired after 15 minutes without proactive background renewal, causing multi-step forms to fail upon submission with an unhandled 401 response that wiped form state.',
      customer:
        'Operational staff members were losing 20–30 minutes of manual configuration entry, resulting in mounting frustration and duplicated administrative effort.',
      communication:
        'Support agents were repeatedly giving the generic advice: "Please clear your cache and log in again." Needed transparent guidance that respected customer time and addressed the real workflow gap.',
    },
    problem: {
      reportedStatement: 'Repeated tickets: "My form data disappeared when submitting" / "Logged out unexpectedly"',
      clarificationProcess: [
        'Noticed 18 separate tickets logged across a 3-week window tagged with "session-timeout", "data-loss", and "form-reset".',
        'Observed that Tier 1 agents were resolving each ticket individually with generic cache-clearing recommendations.',
        'Initiated a cross-account pattern audit to determine whether the issue was user error or a structural product limitation.',
      ],
      technicalContext:
        'Single Page Application (SPA) communicating with microservices using short-lived JSON Web Tokens (JWT) stored in memory with an HTTP-only refresh cookie.',
    },
    customerImpact: {
      operationalImpact:
        'Enterprise users spent significant time drafting complex quarterly compliance records, only to lose all entered data upon final form submission.',
      businessRisk:
        'Customer satisfaction scores declined; customer administrators expressed reluctance to expand platform rollout to remaining business units.',
      urgencyClassification: 'P2 - High / Chronic Friction Pattern',
    },
    investigation: {
      narrative:
        'Conducted a thorough user journey walkthrough. By analyzing the exact timestamps and request headers of affected users, I noticed a consistent pattern: all failures occurred on forms that took longer than 15 minutes to complete.',
      steps: [
        {
          phase: '1. Aggregate Tickets',
          action: 'Queried ticket management system for keywords: "disappeared", "logged out", "saving failed", "token".',
          findings: 'Found 23 matching tickets across 7 different enterprise accounts over 30 days.',
          status: 'verified',
        },
        {
          phase: '2. Common Symptoms',
          action: 'Tabulated customer operating systems, browsers, and specific pages where data loss occurred.',
          findings: '100% of occurrences took place within the "Annual Compliance Audit" multi-step wizard.',
          status: 'isolated',
        },
        {
          phase: '3. Analyze User Workflow',
          action: 'Conducted video walkthrough with an internal operations user to observe real data-entry habits.',
          findings: 'Users cross-referenced external PDF documents and spreadsheets, frequently taking 25 to 45 minutes to finish a single section.',
          status: 'verified',
        },
        {
          phase: '4. Determine Gap',
          action: 'Inspected network traffic during form editing.',
          findings: 'JWT access token expired after 15 minutes. The frontend only triggered refresh tokens on navigation events, NOT during active in-page keystrokes or tab typing.',
          status: 'isolated',
          codeOrQuery: '// Browser Console Inspection\n// Token expired at: 14:15:00 UTC\n// User clicked submit at: 14:32:10 UTC\nPOST /api/v1/compliance/save -> HTTP 401 Unauthorized\n{"error": "token_expired", "message": "Signature has expired."}',
        },
        {
          phase: '5. Gap Categorization',
          action: 'Classified the finding as both an engineering defect (missing silent token refresh) and a documentation gap (no session expiry warning or draft autosave).',
          findings: 'Clear, actionable diagnosis ready for cross-functional handoff.',
          status: 'verified',
        },
      ],
    },
    evidence: {
      summary:
        'Correlation table demonstrating that submission failures aligned exactly with user idle time exceeding the 15-minute JWT expiration threshold.',
      artifacts: [
        {
          title: 'User Session Expiration Timeline',
          type: 'workflow',
          code: `[Minute 00:00] User logs in -> JWT Access Token Issued (Expires in 900s / 15 mins)
[Minute 02:30] User opens Multi-Step Audit Wizard -> Form state initialized in memory
[Minute 10:00] User reviewing external spreadsheet -> No HTTP requests dispatched
[Minute 15:01] Access Token expires on auth gateway
[Minute 28:45] User completes Section 3 and clicks "Save & Next"
[Minute 28:46] POST /api/v1/compliance/save -> 401 Unauthorized
[Minute 28:47] Frontend Auth Interceptor catches 401 -> Redirects to /login without persisting form draft!`,
          note: 'Visualizing the exact friction point where customer data was lost.',
        },
      ],
    },
    rootCause: {
      headline:
        'Absence of background silent token refresh and local draft auto-persistence on multi-step forms exceeding token lifespan.',
      technicalDetails:
        'The application frontend architecture only requested refreshed access tokens when navigating between distinct URL routes. Because the multi-step compliance wizard operated as an in-memory single-page flow, users spending more than 15 minutes entering data allowed their JWT tokens to expire silently. Upon submission, the API rejected the expired token with HTTP 401, triggering a hard redirect to the login screen that cleared all unsaved form inputs.',
    },
    action: {
      immediateMitigation: [
        'Authored an interim Knowledge Base guide and customer advisory: "Best Practices for Complex Compliance Entries: Session Durations & Auto-Drafting."',
        'Trained Tier 1 support specialists to cease recommending generic browser cache clearing, and instead advise users on drafting in sections.',
      ],
      engineeringEscalation: [
        'Submitted an Agile product improvement ticket in Jira complete with user workflow recordings, network HAR files, and reproduction steps.',
        'Proposed two engineering solutions: 1) implement an automatic background silent token refresh timer every 10 minutes, and 2) serialize form draft state to IndexedDB/LocalStorage every 30 seconds.',
      ],
    },
    communication: {
      strategy:
        'Empathetic, transparent acknowledgment of customer frustration combined with concrete timelines for both documentation relief and product enhancement.',
      stakeholderUpdates: [
        'To Customer Admins: "We have analyzed the recurring reports and identified that our application was failing to renew your authentication token while you worked on detailed multi-step forms. We apologize for the frustration this caused. We have deployed interim drafting guidance and prioritized a background token renewal update with our engineering team."',
        'To Engineering & Product: "Presented pattern analysis during sprint backlog refinement showing ticket frequency, customer sentiment impact, and proposed technical fix."',
      ],
    },
    resolution: {
      summary:
        'Engineering implemented silent token refresh and local storage draft recovery within the next sprint; customer data loss tickets dropped to zero.',
      confirmationSteps: [
        'Verified in staging that background token renewal fired at minute 10, extending active session seamlessly.',
        'Tested simulated network drops during form entry: verified all draft fields were restored upon reconnect.',
        'Followed up directly with all affected account administrators to confirm smooth user experiences.',
      ],
    },
    prevention: {
      systemicMeasures: [
        'Established a monthly "Support Ticket Pattern Analysis" ceremony where Tier 2 support reviews recurring ticket tags with Product Managers.',
        'Published permanent Knowledge Base article covering session timeout behaviors and data recovery.',
        'Added automated End-to-End (E2E) Cypress tests validating token renewal during prolonged form interaction.',
      ],
    },
    customWorkflow: {
      pipelineName: 'Repeated Tickets to Root Cause Workflow',
      stages: [
        {
          stepNumber: '01',
          title: 'Repeated Tickets',
          detail: '23 tickets flagged over 30 days regarding lost entries and unexpected logout screens.',
        },
        {
          stepNumber: '02',
          title: 'Identify Common Symptoms',
          detail: 'Correlated failure timestamps to discover 100% occurred on multi-step forms taking > 15 mins.',
        },
        {
          stepNumber: '03',
          title: 'Analyse User Workflow',
          detail: 'Observed enterprise users drafting inputs while referencing external PDFs and spreadsheets.',
        },
        {
          stepNumber: '04',
          title: 'Determine Technical Gap',
          detail: 'Identified missing silent JWT token renewal and lack of client-side draft auto-save.',
        },
        {
          stepNumber: '05',
          title: 'Create KB Guidance',
          detail: 'Published immediate self-service guidance and trained Tier 1 support on root cause.',
        },
        {
          stepNumber: '06',
          title: 'Product/Engineering Feedback',
          detail: 'Delivered prioritized Jira ticket with reproduction trace, leading to sprint feature fix.',
        },
        {
          stepNumber: '07',
          title: 'Reduce Recurrence',
          detail: 'Permanent code fix deployed; ongoing recurrence of session data-loss tickets eliminated.',
        },
      ],
    },
  },

  // CASE STUDY 3
  {
    id: 'cs-api-debugging-stack',
    title: 'Debugging an API Failure',
    subtitle: 'A Step-by-Step Diagnostic Investigation from HTTP Request to Root Cause',
    label: 'Representative Case Study',
    category: 'API & Integration Diagnostics',
    tags: ['API', 'Database', 'Incident Management'],
    severity: 'P2 - High',
    summary:
      'A partner developer escalated an integration failure with the generic message: "Something went wrong." Executed a systematic diagnostic stack trace spanning HTTP request headers, authentication claims, endpoint routing, JSON payloads, response payloads, server logs, and database schema constraints.',
    skills: [
      'API troubleshooting',
      'cURL & Postman',
      'HTTP status codes',
      'JSON schema validation',
      'Database constraints',
      'Application logs',
      'Root cause analysis',
    ],
    ticketSnippet: {
      customerName: 'Integration Partner / Developer Support',
      reportedIssue: 'Something went wrong. Our telemetry sync webhook endpoint is returning an error and our events are not recording.',
      environment: 'RESTful API • JSON Payloads • PostgreSQL • Redis Queue • Microservices',
    },
    theThreeProblems: {
      technical:
        'A partner firmware update began transmitting integer sensor values where the backend schema validator strictly enforced float data types, triggering an unhandled validation exception that halted batch commits.',
      customer:
        'Partner telemetry devices in the field were buffering unsynced records, risking local buffer overflows and event loss.',
      communication:
        'Partner developers were confused by a generic HTTP 500 error code; needed exact payload diffs, schema specifications, and cURL reproduction snippets to resolve their firmware dispatch.',
    },
    problem: {
      reportedStatement: 'Something went wrong.',
      clarificationProcess: [
        'Acknowledged ticket within 15 minutes: requested partner endpoint URL, approximate request timestamp, and originating IP address.',
        'Searched API Gateway access logs for the partner’s API key to isolate raw incoming traffic without requiring client credentials.',
        'Extracted the exact incoming request payload and response body for technical inspection.',
      ],
      technicalContext:
        'High-throughput telemetry ingestion REST API accepting batch JSON payloads and persisting records into PostgreSQL via an asynchronous queue.',
    },
    customerImpact: {
      operationalImpact:
        'Batch event synchronization was failing across 14 enterprise customer partner deployments; over 8,000 hourly telemetry pings were being rejected.',
      businessRisk:
        'Partner threatened to halt device rollout pending resolution of integration instability.',
      urgencyClassification: 'P2 - High / Developer Integration Blocker',
    },
    investigation: {
      narrative:
        'To diagnose "Something went wrong," I walked through the complete 10-layer diagnostic stack in logical progression—verifying each boundary condition before moving deeper into the architecture.',
      steps: [
        {
          phase: '1. HTTP Request',
          action: 'Inspected raw request method and URL parameters.',
          findings: '`POST /api/v2/telemetry/events/batch` dispatched with `Content-Type: application/json`.',
          status: 'verified',
        },
        {
          phase: '2. Authentication',
          action: 'Inspected `Authorization: Bearer <token>` header.',
          findings: 'Token signature was valid, claims were intact, and tenant API permissions were authorized.',
          status: 'verified',
        },
        {
          phase: '3. Endpoint',
          action: 'Verified API Gateway routing rule.',
          findings: 'Request correctly routed to `/services/telemetry-ingest` without reverse proxy rewriting errors.',
          status: 'verified',
        },
        {
          phase: '4. Payload',
          action: 'Extracted incoming JSON body containing 100 telemetry objects.',
          findings: 'Inspected sensor readings: observed field `"calibration_value": 42` (integer instead of expected float `42.0`).',
          status: 'isolated',
        },
        {
          phase: '5. HTTP Status',
          action: 'Checked HTTP response status code returned to client.',
          findings: 'Returned `HTTP/1.1 500 Internal Server Error` instead of an informative `422 Unprocessable Entity`.',
          status: 'isolated',
        },
        {
          phase: '6. Response Body',
          action: 'Examined server response body.',
          findings: 'Returned generic `{ "error": "Internal processing error", "request_id": "req_772a9" }`.',
          status: 'verified',
        },
        {
          phase: '7. Application Logs',
          action: 'Queried centralized log repository using `request_id: req_772a9`.',
          findings: 'Found unhandled Python exception: `ValidationError: calibration_value: value is not a valid float (received <class \'int\'>)`.',
          status: 'isolated',
          codeOrQuery: 'Traceback (most recent call last):\n  File "/app/serializers.py", line 84, in validate_batch\n    record = SensorSchema(**item)\nValidationError: 1 validation error for SensorSchema\ncalibration_value\n  value is not a valid float (type=type_error.float)',
        },
        {
          phase: '8. Database State',
          action: 'Verified whether partial records from the batch had written to PostgreSQL.',
          findings: 'Database rollback executed properly; zero corrupted rows or partial writes occurred.',
          status: 'verified',
        },
        {
          phase: '9. Dependencies',
          action: 'Checked Redis queue and broker connections.',
          findings: 'Message broker was fully responsive and operational.',
          status: 'verified',
        },
        {
          phase: '10. Root Cause',
          action: 'Correlated Pydantic schema validation strictness with partner recent firmware update.',
          findings: 'Firmware v3.2 trimmed trailing `.0` on whole-number calibration values, triggering a strict backend type check failure.',
          status: 'isolated',
        },
      ],
    },
    evidence: {
      summary:
        'Reproducible cURL command and exact JSON payload demonstrating the type validation failure vs expected format.',
      artifacts: [
        {
          title: 'Reproduction cURL Request',
          type: 'curl',
          code: `curl -i -X POST "https://api.platform.com/api/v2/telemetry/events/batch" \\
  -H "Authorization: Bearer $PARTNER_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "device_id": "DEV-9921",
    "timestamp": "202X-09-11T14:20:00Z",
    "metrics": {
      "temperature": 24.5,
      "calibration_value": 42
    }
  }'`,
          note: 'Payload triggering 500 error due to strict int vs float serializer constraint.',
        },
        {
          title: 'Application Exception Stack Trace',
          type: 'log',
          code: `[202X-09-11 14:20:01,842] ERROR in telemetry_ingest.views:
Request ID: req_772a9
Schema validation failed for device DEV-9921
Field 'calibration_value' expected float, received integer 42
Unhandled exception caused HTTP 500 return`,
          note: 'Highlighted need for permissive numeric coercion in ingestion pipeline.',
        },
      ],
    },
    rootCause: {
      headline:
        'Strict schema serialization rejecting integer-formatted numbers on a float field, compounded by missing HTTP 422 error handling.',
      technicalDetails:
        'The backend ingestion service used strict type validation that rejected integers where floating-point numbers were specified. When the partner updated their device firmware to optimize payload byte size by stripping trailing `.0` from whole numbers (e.g., sending `42` instead of `42.0`), the serializer raised an unhandled `ValidationError`. Because the exception was unhandled, the server defaulted to an opaque HTTP 500 response rather than returning an actionable schema error.',
    },
    action: {
      immediateMitigation: [
        'Provided the partner engineering team with an exact cURL snippet and payload diff demonstrating how to format calibration values as floating-point numbers in the interim.',
        'Collaborated with on-call engineer to deploy a non-breaking hotfix allowing numeric type coercion (`float(val)`) in the validation schema.',
      ],
      engineeringEscalation: [
        'Submitted engineering PR to update the serializer to accept both `int` and `float` types for all numeric sensor fields.',
        'Created backlog ticket to improve API error handling: ensure all schema validation failures return HTTP 422 with exact field-level error messages.',
      ],
    },
    communication: {
      strategy:
        'Replaced the opaque "Something went wrong" message with explicit, actionable technical clarity for the partner development team.',
      stakeholderUpdates: [
        'To Partner Lead: "We have isolated the failure. Our API schema currently enforces a strict floating-point format on the `calibration_value` field. Your recent firmware update sent whole integer values (e.g., `42`), which caused our serializer to throw an unhandled error. We have deployed a hotfix to support both formats seamlessly."',
        'Developer Documentation Update: Published a schema compatibility note in the developer portal detailing numeric precision expectations.',
      ],
    },
    resolution: {
      summary:
        'Hotfix merged and verified; partner telemetry ingestion resumed with 100% acceptance rate and zero buffered event loss.',
      confirmationSteps: [
        'Dispatched test batches with mixed int/float payloads via cURL; received `HTTP/1.1 200 OK`.',
        'Monitored partner device telemetry stream for 2 hours; verified all 8,000+ hourly events recorded successfully.',
        'Verified database consistency: confirmed no duplicate entries or fragmented transactions.',
      ],
    },
    prevention: {
      systemicMeasures: [
        'Enhanced API Gateway schema validation layer to return clear `HTTP 422 Unprocessable Entity` with JSON path pointers whenever payloads fail validation.',
        'Updated API documentation to explicitly state type flexibility and numeric boundaries.',
        'Added regression integration test suite verifying backward-compatible integer and float payload parsing.',
      ],
    },
    customWorkflow: {
      pipelineName: 'API Diagnostic Stack Investigation',
      stages: [
        { stepNumber: '01', title: 'HTTP Request', detail: 'Method, headers, content-type verification' },
        { stepNumber: '02', title: 'Authentication', detail: 'Token validity, scope claims, tenant permissions' },
        { stepNumber: '03', title: 'Endpoint', detail: 'Ingress routing, proxy pathing, SSL termination' },
        { stepNumber: '04', title: 'Payload', detail: 'JSON structure, field presence, data type fidelity' },
        { stepNumber: '05', title: 'HTTP Status', detail: 'Interpreting 4xx vs 5xx status codes' },
        { stepNumber: '06', title: 'Response Body', detail: 'Error payload, code strings, correlation request IDs' },
        { stepNumber: '07', title: 'Application Logs', detail: 'Correlating request IDs in centralized log aggregators' },
        { stepNumber: '08', title: 'Database State', detail: 'Query execution, lock contention, transaction rollback' },
        { stepNumber: '09', title: 'Dependencies', detail: 'Message brokers, caches, upstream microservices' },
        { stepNumber: '10', title: 'Root Cause', detail: 'Identifying exact code, schema, or infrastructure failure' },
      ],
    },
  },

  // CASE STUDY 4
  {
    id: 'cs-dual-audience-communication',
    title: "The Customer Doesn't Need Your Stack Trace",
    subtitle: 'Translating Complex Technical Incidents Across Two Distinct Audiences',
    label: 'Portfolio Demonstration',
    category: 'Customer Success & Support Strategy',
    tags: ['Customer Success', 'Technical Communication', 'Incident Management'],
    severity: 'P1 - Critical',
    summary:
      'When an enterprise database deadlock triggered widespread 504 Gateway Timeouts, navigated the incident simultaneously across two audiences: delivering deep, actionable diagnostic data to engineering while providing calm, non-technical, business-centric transparency to customer executives.',
    skills: [
      'Incident communication',
      'Technical translation',
      'Engineering liaison',
      'Stakeholder management',
      'Post-incident reporting',
      'Executive de-escalation',
    ],
    ticketSnippet: {
      customerName: 'Enterprise Client — VP of Operations & Core Engineering Team',
      reportedIssue: 'Executive escalation: "Your platform is unusable, transactions are failing, and we need an executive explanation immediately."',
      environment: 'PostgreSQL Relational DB • Connection Pooling (PgBouncer) • Multi-Tenant API',
    },
    theThreeProblems: {
      technical:
        'A background cascade cleanup cron job held exclusive relation locks on `archived_sessions`, creating a lock queue that deadlocked concurrent user inserts and exhausted PgBouncer pools.',
      customer:
        'End users were unable to finalize operational sign-offs during their month-end closing window, creating severe executive anxiety.',
      communication:
        'Engineers needed raw stack traces, PIDs, and lock trees to fix the problem; customer leadership needed business reassurance, outage boundaries, and clear operational next steps without techno-babble.',
    },
    problem: {
      reportedStatement: 'Your platform is unusable, transactions are failing, and we need an executive explanation immediately.',
      clarificationProcess: [
        'Immediately established communication bridge: engaged customer VP of Operations on priority incident channel.',
        'Gathered incident boundaries: confirmed failures were isolated to transaction commits between 10:14 UTC and 10:32 UTC.',
        'Parallelized effort: launched technical investigation with on-call DevOps while issuing structured status holding statement to customer leadership.',
      ],
      technicalContext:
        'High-concurrency PostgreSQL relational database with PgBouncer connection pooling supporting high-volume financial transaction logging.',
    },
    customerImpact: {
      operationalImpact:
        'Operations team members were blocked from completing financial reconciliation batches for 18 minutes during month-end closing.',
      businessRisk:
        'Immediate threat of churn and executive dissatisfaction on an enterprise tier renewal.',
      urgencyClassification: 'P1 - Critical Incident',
    },
    investigation: {
      narrative:
        'Investigated a high-severity incident requiring dual-track execution: rigorous backend database diagnostics combined with disciplined, empathetic executive stakeholder management.',
      steps: [
        {
          phase: '1. Incident Triage',
          action: 'Monitored APM alerts indicating spike in HTTP 504 Gateway Timeouts across portal.',
          findings: 'API latency surged from 65ms to 60,000ms+; connection pool queue size reached 100%.',
          status: 'isolated',
        },
        {
          phase: '2. Lock Tree Analysis',
          action: 'Queried `pg_locks` and `pg_stat_activity` on PostgreSQL primary instance.',
          findings: 'Identified deadlock: Process 24192 (holding `AccessExclusiveLock` for `DELETE FROM archived_sessions`) blocked Process 24198 (attempting `INSERT INTO session_metrics`).',
          status: 'isolated',
          codeOrQuery: `SELECT blocked_locks.pid AS blocked_pid,
       blocking_locks.pid AS blocking_pid,
       blocked_activity.query AS blocked_statement,
       blocking_activity.query AS current_statement_in_blocking_process
FROM  pg_catalog.pg_locks         blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks         blocking_locks 
    ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.DATABASE IS NOT DISTINCT FROM blocked_locks.DATABASE
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.GRANTED;`,
        },
        {
          phase: '3. Immediate Relief',
          action: 'Terminated the blocking maintenance process PID 24192 using `SELECT pg_cancel_backend(24192);`.',
          findings: 'Lock queue dissipated within 4 seconds; connection pool drained and normal API response latencies resumed.',
          status: 'mitigated',
        },
      ],
    },
    evidence: {
      summary:
        'Database lock graph output illustrating table lock contention and downstream connection pool starvation.',
      artifacts: [
        {
          title: 'PostgreSQL Lock Queue Output',
          type: 'sql',
          code: `[10:24:12 UTC] ERROR: deadlock detected
Detail: Process 24198 waits for ExclusiveLock on relation "session_metrics"; blocked by Process 24192.
Process 24192 waits for RowShareLock on relation "user_sessions"; blocked by Process 24198.
Hint: See server log for query details.
Context: while deleting tuple (1428, 12) in relation "archived_sessions"`,
          note: 'Raw database engine output needed by engineering to patch cascading foreign keys.',
        },
      ],
    },
    rootCause: {
      headline:
        'Database table lock escalation during daytime automated data archival conflicting with active transaction writes.',
      technicalDetails:
        'A scheduled cron script executed a large batch `DELETE` on the `archived_sessions` table during business hours. Because an underlying foreign key constraint lacked an index, PostgreSQL escalated the operation to a table-level exclusive lock, blocking all concurrent `INSERT` operations on active user transactions and exhausting the available connection pool.',
    },
    action: {
      immediateMitigation: [
        'Cancelled the blocking database process to restore immediate system throughput.',
        'Temporarily disabled the daytime archival cron job pending index deployment.',
      ],
      engineeringEscalation: [
        'Escalated to backend engineering team with exact query plans and index recommendations: `CREATE INDEX CONCURRENTLY idx_session_metrics_archived_id`.',
        'Coordinated the rescheduling of all maintenance tasks to off-peak hours (02:00–04:00 UTC).',
      ],
    },
    communication: {
      strategy:
        'Same incident. Different audience. Separating technical diagnostic precision for engineering from empathetic, reassuring, non-technical clarity for customers.',
      dualAudience: {
        keyStatement: 'Same incident. Different audience.',
        engineeringView: {
          diagnosis:
            'Daytime batch cascade deletion on `archived_sessions` acquired `AccessExclusiveLock` on `session_metrics` table due to missing foreign key index, causing connection pool exhaustion in PgBouncer.',
          logsAnalysis:
            'PostgreSQL error log confirmed deadlock between PID 24192 (`DELETE`) and PID 24198 (`INSERT`). Nginx access logs recorded 504 Gateway Timeouts over an 18-minute window.',
          apiBehaviour:
            'Reverse proxy connection timeout exceeded (60s threshold). Client ingress received 504s; zero data corruption on committed transactions.',
          databaseServiceIssue:
            'Missing B-tree index on foreign key constraint `fk_session_metrics_archived_session_id`.',
          remediation:
            'Deploy `CREATE INDEX CONCURRENTLY` on missing foreign key; reschedule cron to 03:00 UTC off-peak window; implement `statement_timeout = 10000` on background maintenance connections.',
        },
        customerView: {
          impactExplanation:
            'Between 10:14 UTC and 10:32 UTC, your team members experienced slow loading times and timeout messages when attempting to submit transactions in the portal.',
          currentStatus:
            'The issue has been completely resolved. All application services are fully operational and responding at standard speed. No transaction data was lost or corrupted.',
          resolution:
            'Our systems team identified an automated background maintenance routine that unexpectedly held database resources. We immediately stopped the background routine and restored full capacity to your team.',
          nextSteps:
            'We have permanently rescheduled all background maintenance routines to off-business hours and deployed additional capacity safeguards. Your team can proceed with end-of-month processing with full confidence. A formal Root Cause Analysis summary will be delivered to your team by end of day.',
        },
      },
    },
    resolution: {
      summary:
        'Incident mitigated within 18 minutes; customer executive reassured and contract renewal secured.',
      confirmationSteps: [
        'Confirmed zero timeout errors across all customer sessions for the subsequent 48 hours.',
        'Verified successful deployment of concurrent database indices during scheduled off-hours maintenance.',
        'Received direct praise from customer VP of Operations for calm, transparent communication.',
      ],
    },
    prevention: {
      systemicMeasures: [
        'Mandated strict rule: No database cleanup or batch archival scripts may execute during peak operating hours (07:00–20:00 UTC).',
        'Added automated index audits on all relational foreign keys in CI/CD pipeline.',
        'Created customer-facing incident communications playbook with standardized SLA update templates.',
      ],
    },
  },

  // CASE STUDY 5
  {
    id: 'cs-investigation-to-kb-article',
    title: 'Turning a Technical Investigation Into a Knowledge Base Article',
    subtitle: 'From Deep Root-Cause Isolation to Self-Service Deflection and Developer Enablement',
    label: 'Portfolio Demonstration',
    category: 'Support Operations & Documentation',
    tags: ['Documentation', 'Customer Success', 'Technical Communication', 'API'],
    severity: 'P3 - Moderate',
    summary:
      'Following an in-depth investigation into recurring webhook delivery failures caused by HMAC SHA-256 signature verification mismatches, synthesized the diagnostic findings into a comprehensive, customer-facing developer Knowledge Base article that enabled customer self-service and reduced recurring tickets.',
    skills: [
      'Technical writing',
      'Knowledge base creation',
      'HMAC security verification',
      'Customer self-service',
      'Developer advocacy',
      'Ticket deflection',
    ],
    ticketSnippet: {
      customerName: 'Enterprise SaaS Developer & Engineering Teams',
      reportedIssue: 'Developers reporting: "Your webhook events are failing signature validation on our servers."',
      environment: 'Webhook Dispatcher • HMAC SHA-256 Signature Verification • REST APIs • Developer Portal',
    },
    theThreeProblems: {
      technical:
        'Customer webhook listeners were parsing raw JSON payloads into language objects and re-stringifying them before calculating the HMAC hash, creating whitespace and character ordering discrepancies that invalidated cryptographic signatures.',
      customer:
        'Customer developers were blocked from deploying real-time automated workflows, wasting engineering hours trying to guess why valid webhook deliveries were being rejected.',
      communication:
        'Support had no publicly available reference guide; each agent was trying to explain cryptographic payload hashing through back-and-forth email exchanges.',
    },
    problem: {
      reportedStatement: 'Developers reporting: "Your webhook events are failing signature validation on our servers."',
      clarificationProcess: [
        'Reviewed 14 developer tickets logged over a two-month period regarding "webhook signature invalid" or "HMAC mismatch".',
        'Noticed that while the platform webhook dispatcher was generating mathematically correct HMAC-SHA256 signatures, customer receivers in Node.js, Python, and PHP consistently failed verification.',
        'Recognized that this was not an isolated software bug, but an enablement and documentation gap that could be permanently solved through clear developer education.',
      ],
      technicalContext:
        'Outbound event notification system that signs every HTTP POST payload using a shared secret and transmits an `X-Signature-SHA256` header for authenticity verification.',
    },
    customerImpact: {
      operationalImpact:
        'Developer onboarding was delayed by 3 to 5 business days per account while teams struggled to verify incoming events.',
      businessRisk:
        'Customer developers perceived the webhook integration as unreliable, leading to prolonged implementation cycles.',
      urgencyClassification: 'P3 - Moderate / Chronic Developer Onboarding Friction',
    },
    investigation: {
      narrative:
        'Conducted a technical investigation into how customer receiver frameworks process incoming HTTP payloads. Discovered that common web frameworks (such as Express `express.json()` or Django `request.body`) parse and re-serialize JSON, altering whitespace and character ordering, which irreversibly breaks cryptographic hash verification.',
      steps: [
        {
          phase: '1. Problem Capture',
          action: 'Extracted sample payloads and HMAC header values from failed delivery logs.',
          findings: 'Our server calculated HMAC using the exact byte stream: `{"event":"order.created","id":1001}`.',
          status: 'verified',
        },
        {
          phase: '2. Receiver Simulation',
          action: 'Created local receiver test harnesses in Node.js, Python, and Go.',
          findings: 'When the customer receiver applied `JSON.parse()` and subsequently ran `JSON.stringify()`, whitespace was introduced (`{"event": "order.created", "id": 1001}`), producing a completely different HMAC digest!',
          status: 'isolated',
          codeOrQuery: `// Client verification failure demonstration
const rawPayload = req.rawBody; // CORRECT: uses original raw bytes
const badPayload = JSON.stringify(req.body); // INCORRECT: mutates formatting, breaking cryptographic hash!`,
        },
        {
          phase: '3. Documentation Transformation',
          action: 'Synthesized diagnostic findings into a comprehensive developer guide featuring verified code snippets, common pitfalls, and escalation instructions.',
          findings: 'Structured guide ready for public knowledge base publication.',
          status: 'verified',
        },
      ],
    },
    evidence: {
      summary:
        'Side-by-side code demonstration illustrating correct raw-byte verification vs common payload re-serialization defect.',
      artifacts: [
        {
          title: 'Signature Verification Mechanics',
          type: 'diff',
          code: `// Express.js Webhook Receiver Comparison

- // INCORRECT (Common mistake that triggers signature failure):
- app.use(express.json());
- app.post('/webhook', (req, res) => {
-   const signature = crypto.createHmac('sha256', SECRET)
-     .update(JSON.stringify(req.body)) // BROKEN: re-serialized JSON alters formatting!
-     .digest('hex');
- });

+ // CORRECT (Preserves raw request bytes):
+ app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
+   const signature = crypto.createHmac('sha256', SECRET)
+     .update(req.body) // SUCCESS: raw unmutated byte buffer matches sender
+     .digest('hex');
+ });`,
          note: 'The exact technical distinction that solved recurring customer developer escalations.',
        },
      ],
    },
    rootCause: {
      headline:
        'Customer developer middleware mutating payload byte streams prior to cryptographic signature verification, compounded by lack of framework-specific documentation.',
      technicalDetails:
        'HMAC SHA-256 signatures are calculated strictly over the exact byte stream transmitted across the wire. When receiver frameworks automatically parse incoming JSON payloads into internal objects, any subsequent re-stringification modifies whitespace, key ordering, or Unicode escape characters. This causes the computed hash to diverge from the sender hash, triggering an apparent authentication failure.',
    },
    action: {
      immediateMitigation: [
        'Provided affected customer developers with copy-pasteable verification snippets for Node.js, Python, and PHP.',
        'Helped developer teams configure raw body parsing middleware in their respective application routers.',
      ],
      engineeringEscalation: [
        'Collaborated with documentation team to publish the full article to the public Developer Knowledge Base.',
        'Worked with product engineering to add a "Test Webhook Signature" validator utility directly into the customer developer portal.',
      ],
    },
    communication: {
      strategy:
        'Transformed an isolated technical troubleshooting investigation into an authoritative, publicly accessible technical asset.',
      stakeholderUpdates: [
        'To Customer Developers: "We have published an in-depth implementation guide explaining raw body preservation and HMAC verification, including production code samples for Express, Django, and Laravel."',
        'Internal Support Team: Shared the article during team standup and created a 1-click canned macro directing developers to the guide.',
      ],
    },
    resolution: {
      summary:
        'Knowledge base article published; ongoing webhook signature tickets decreased by over 80% with customer developers self-serving successfully.',
      confirmationSteps: [
        'Monitored article page views and positive helpfulness ratings in the developer portal.',
        'Observed immediate self-service resolution for new partner onboardings without requiring Tier 2 assistance.',
      ],
    },
    prevention: {
      systemicMeasures: [
        'Published comprehensive Knowledge Base Article: "Resolving Webhook Delivery Failures & HMAC Signature Validation Errors".',
        'Embedded direct link to the guide in the webhook configuration screen inside the developer portal.',
        'Integrated automated webhook signature testing tool in sandbox environments.',
      ],
      kbArticle: {
        title: 'Resolving Webhook Delivery Failures & HMAC Signature Validation Errors',
        symptoms: [
          'Webhook listener returns HTTP 401 Unauthorized or HTTP 403 Forbidden on incoming events.',
          'Developer portal event log displays status: "Delivery Failed — Signature Mismatch".',
          'Events stop synchronizing in your downstream internal database or CRM.',
          'Manual test requests in Postman pass, but automated server-to-server deliveries fail.',
        ],
        likelyCauses: [
          'Payload Re-Serialization: Parsing the request body as JSON before HMAC verification alters whitespace and key order, invalidating the hash.',
          'Secret Key Environment Mismatch: Using your staging webhook secret key against events generated from the production environment.',
          'Server Clock Skew: Receiver server clock has drifted by more than 300 seconds (5 minutes) relative to standard NTP time.',
          'Encoding / Character Set Mismatches: Character encoding other than UTF-8 applied during hashing.',
        ],
        troubleshootingSteps: [
          'Step 1: Verify your webhook secret key matches the exact environment (Staging vs Production) in your Developer Dashboard.',
          'Step 2: Ensure your receiver captures the RAW request body buffer before any JSON parsing middleware executes.',
          'Step 3: Check your receiver server clock synchronization by running `timedatectl` or `ntpstat` to verify clock drift is within 2 seconds.',
          'Step 4: Use the Developer Portal "Send Test Ping" feature with a known payload to verify your HMAC hashing formula.',
        ],
        resolutionSteps: [
          'Node.js / Express: Use `express.raw({ type: "application/json" })` for the webhook route to access `req.body` as a raw Buffer.',
          'Python / Django: Compute HMAC directly over `request.body` (raw bytes) instead of `json.loads(request.body)`.',
          'PHP: Compute HMAC over `file_get_contents("php://input")` rather than accessing `$_POST`.',
          'Synchronize your server clock using an active Network Time Protocol (NTP) daemon.',
        ],
        whenToEscalate: [
          'Your raw payload bytes have been verified, the secret key matches, server clock is synchronized, and test event signatures continue to fail.',
          'The Developer Portal shows delivery attempts are timing out before reaching your reverse proxy.',
        ],
        informationSupportNeeds: [
          'Webhook Delivery ID (found in `X-Delivery-Id` header or Developer Portal event logs).',
          'Timestamp (UTC) of the failed delivery attempt.',
          'Your receiver server HTTP status code and response body.',
          'Code snippet of your signature verification function (please redact your secret key).',
        ],
      },
    },
  },
];
