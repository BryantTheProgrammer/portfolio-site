export const projects = [
  {
    slug: "laser-etcher",
    image: "/images/test-image.jpg",
    alt: "Laser Etcher Modernization project",
    title: "Laser Etcher Modernization",
    kicker: "Automation / Serialization",
    tagline: "Restored serialized traceability with a production-ready Ignition application.",
    metrics: ["$143K+ savings", "11 lines / 5 plants", "5,000 records/batch"],
    tech: ["Ignition", "Python/Jython", "SQL"],
    problem:
      "The plant’s laser etching line still depended on a manual, fragile Java workflow. Operators could not trust serialization at production pace, and the vendor protocol would not forgive a second command while a mark was in flight: Dynamark expects a strict request/response conversation over raw TCP, not a fire-and-forget socket.",
    approach:
      "I replaced the Java client with event-driven Ignition Perspective and gateway scripts. Operator work stayed in a Perspective UI that can page through a 5,000-record batch; the gateway owned the TCP session, a CommandQueue tag, and an EtcherBusy interlock so the etcher never saw overlapping requests.",
    architectureCaption:
      "Perspective submits a job. Gateway module etcherAI_P serializes one Dynamark frame onto TCP, waits for the ACK, then releases EtcherBusy so the next queued command can run.",
    implementation:
      "The gateway script is a small state machine, not a UI timer. Commands land on a tag-backed queue. onResponseReceived is the only path that clears the busy flag, which keeps the protocol honest when the line is under load.",
    code: {
      lang: "python",
      filename: "etcherAI_P.py",
      caption: "Sanitized Jython from the gateway module. Plant hostnames, serial payloads, and vendor constants removed.",
      source: `# etcherAI_P — one Dynamark conversation at a time
QUEUE = "[default]Etcher/CommandQueue"
BUSY = "[default]Etcher/EtcherBusy"
LAST_ACK = "[default]Etcher/LastAck"

def enqueue(command):
    if system.tag.readBlocking([BUSY])[0].value:
        return False
    system.tag.writeBlocking([BUSY, QUEUE], [True, command])
    return True

def onResponseReceived(event):
    payload = event.getMessage() or ""
    ack = payload.startswith("ACK")
    # Busy clears only after a complete response — never on send.
    system.tag.writeBlocking([LAST_ACK, BUSY], [ack, False])
`,
    },
    results: [
      { value: "$143K+", label: "Projected three-year savings versus keeping the Java platform" },
      { value: "11 / 5", label: "Line and plant rollout the architecture was designed to support" },
      { value: "5,000", label: "Records per batch in the operator UI, across ~500 pages" },
    ],
    reflection:
      "Next I would extract the TCP session into a dedicated driver with a recorded protocol log for commissioning, and parameterize plant IDs so the same project can drop onto the remaining lines without copying tags by hand.",
    videos: [
      { src: "https://www.youtube.com/embed/NlzmohUvFRo", title: "Laser Etcher overhaul project video", caption: "Laser Etcher overhaul" },
      { src: "https://www.youtube.com/embed/O4gmPoP8y_0", title: "Laser Etcher supporting project video", caption: "Supporting production workflow" },
    ],
  },
  {
    slug: "suds",
    image: "/images/test-image.jpg",
    alt: "SUDS Soap Usage and Dispensing System project",
    title: "SUDS — Soap Usage & Dispensing System",
    kicker: "Process / Edge",
    tagline: "Four-tank water quality monitoring with automated dosing at a fraction of vendor cost.",
    metrics: ["$3,051 delivered", "$35,850 quote", "91% reduction"],
    tech: ["RevPi", "Python", "Ignition Perspective"],
    problem:
      "Electrostatic-dissipating soap in the glass washer was causing static-shock incidents on the line. Early conductivity sensing was unusable: the same supply that drove the probes also collapsed under load, so readings looked like process swings when they were really voltage drop and coupled noise.",
    approach:
      "I treated it as a measurement problem before a software problem. Star grounding came first. Then Atlas Scientific conductivity modules got their own isolated supply and differential wiring into a Revolution Pi, with Python normalizing tank data for an Ignition Perspective dosing view.",
    architectureCaption:
      "Four washer tanks feed isolated Atlas Scientific conductivity modules. Independent 5 V rails and differential pairs land on the RevPi; Perspective only sees cleaned engineering units and dose commands.",
    implementation:
      "The edge script never trusts a raw UART line. It rejects probe chatter, converts microsiemens to a tank state, and only then writes tags the Perspective application uses for alarming and dose control.",
    code: {
      lang: "python",
      filename: "suds_conductivity.py",
      caption: "Sanitized RevPi reader for Atlas Scientific EZO conductivity. No plant I/O map.",
      source: `# Isolated 5 V rail + differential pair into the RevPi UART
PROBE_ERROR_PREFIXES = ("*", "ERROR")

def read_conductivity(uart):
    uart.write(b"R\\r")
    line = uart.readline().decode("ascii", errors="ignore").strip()
    if not line or line.startswith(PROBE_ERROR_PREFIXES):
        return None
    us_cm = float(line)
    if us_cm < 0:
        return None
    return us_cm

def tank_state(us_cm, low, high):
    if us_cm is None:
        return "fault"
    if us_cm < low:
        return "dose"
    if us_cm > high:
        return "high"
    return "ok"
`,
    },
    results: [
      { value: "$3,051", label: "Delivered four-tank monitoring and automated dosing" },
      { value: "$35,850", label: "Commercial vendor quote for the same class of system" },
      { value: "91%", label: "Cost reduction versus buying the packaged solution" },
    ],
    reflection:
      "Next I would add a commissioning screen that graphs supply voltage next to conductivity so the next technician can see grounding issues in minutes, and store dose totals per tank for soap usage reporting.",
    videos: [],
  },
  {
    slug: "plant-floor-visibility",
    image: "/images/test-image.jpg",
    alt: "Plant Floor Visibility Platform project",
    title: "Plant Floor Visibility Platform",
    kicker: "SCADA / Operations",
    tagline: "Real-time operational visibility presented to the North America plant manager network.",
    metrics: ["NA best practice", "Live visibility", "Plant-wide KPIs"],
    tech: ["Ignition Perspective", "OPC UA", "L2L"],
    problem:
      "Supervisors could not see line status, downtime, and alarms on one plant-accurate picture. Data lived in MES, the PLC, and tribal knowledge, so a walk of the floor was still the fastest way to know what was actually running.",
    approach:
      "I built an interactive real-time floor map in Ignition Perspective. Equipment state, downtime, and alarms bind to the same tag model the rest of the SCADA uses, so the map is an operator tool first and a leadership view second — not a slide that goes stale after the meeting.",
    architectureCaption:
      "OPC UA and L2L feed a single Ignition tag model. The Perspective map is a binding, not a screenshot: each cell is a component that inherits run, idle, alarm, and stale from live quality.",
    implementation:
      "State is derived, not painted. A small transform turns quality, running, and alarm into a four-state color contract the map and the KPI tiles share, so a bad OPC subscription cannot look like a running machine.",
    code: {
      lang: "python",
      filename: "equipment_state.py",
      caption: "Sanitized Perspective transform shared by the floor map and KPI tiles.",
      source: `STATES = ("stale", "alarm", "run", "idle")

def equipment_state(quality, running, alarm):
    if quality != "Good":
        return "stale"
    if alarm:
        return "alarm"
    if running:
        return "run"
    return "idle"

def cell_style(state):
    return {
        "stale": {"fill": "#3d4a63", "label": "No data"},
        "alarm": {"fill": "#e05d5d", "label": "Alarm"},
        "run": {"fill": "#7ef0c5", "label": "Running"},
        "idle": {"fill": "#73c2fb", "label": "Idle"},
    }[state]
`,
    },
    results: [
      { value: "Best practice", label: "Presented to senior leadership and North America plant managers" },
      { value: "Live map", label: "Equipment status, downtime, and alarms on one Perspective view" },
      { value: "Shared model", label: "Same tags drive the floor map and plant-wide KPIs" },
    ],
    reflection:
      "Next I would version the map geometry as data, not Designer drawings, so a line move is a coordinate update instead of a new view — and publish a read-only snapshot for sites that are not on Ignition yet.",
    videos: [],
  },
  {
    slug: "mes-revpi-integration",
    image: "/images/test-image.jpg",
    alt: "MES API and IIoT Integration project",
    title: "MES, API & IIoT Integration",
    kicker: "IIoT / Integration",
    tagline: "L2L and RevPi standardization that turned repeatable integration into a two-hour playbook.",
    metrics: ["~2 hr deployment", "Reusable images", "31+ plants"],
    tech: ["L2L REST API", "Node-RED", "RevPi"],
    problem:
      "Production counts and downtime still depended on manual entry. The plant needed a cybersecurity-reviewed edge device that could read digital pulses and analog signals and hand them to L2L and Ignition Edge without a clipboard on the line.",
    approach:
      "Revolution Pi became the nervous system of the floor: a locked-down image, pulse and analog capture, and a documented path into Leading2Lean plus Ignition Edge. The point was a playbook other plants could copy, not a one-off panel.",
    architectureCaption:
      "Field pulses and analog loops terminate on a reviewed RevPi image. Node-RED / Python translate counts to engineering units, then fan out to L2L REST and Ignition Edge — no operator keying.",
    implementation:
      "Pulse totals become production quantity in one function. The REST client posts a sanitized payload and treats timeouts as a buffer, not a lost count, so a MES hiccup does not erase what the sensor already saw.",
    code: {
      lang: "python",
      filename: "revpi_to_l2l.py",
      caption: "Sanitized edge translator. Endpoint host and auth headers omitted.",
      source: `def pulse_delta(current, last, rollover=65535):
    delta = current - last
    if delta < 0:
        delta += rollover + 1
    return delta

def publish_count(session, machine_id, pulses, duration_s):
    payload = {
        "machine": machine_id,
        "quantity": pulses,
        "duration_s": duration_s,
    }
    response = session.post("/api/v1/production", json=payload, timeout=5)
    response.raise_for_status()
    return response.status_code
`,
    },
    results: [
      { value: "~2 hr", label: "Per-unit RevPi deployment after reusable images and configs" },
      { value: "31+", label: "North America plants that adopted the integration precedent" },
      { value: "Zero clipboard", label: "Digital pulses and analog signals to L2L and Ignition Edge" },
    ],
    reflection:
      "Next I would ship a signed image with a health endpoint that reports pulse rate, last successful MES post, and clock skew, so a plant can commission the box without opening a laptop session on the device.",
    videos: [],
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
