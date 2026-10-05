export const projects = [
  {
    slug: "laser-etcher",
    image: "/images/projects/laser-etcher.png",
    alt: "Laser Etcher Modernization project",
    viewTitle: "Operator HMI and diagnostics",
    viewImages: [
      {
        src: "/images/projects/laser-etcher-2.png",
        alt: "Laser Etcher operator HMI showing the schedule, sequence search, rework controls, record paging, live etch preview, and record values",
      },
      {
        src: "/images/projects/laser-etcher-state-machine.png",
        alt: "Dynamark state-machine diagnostics view with machine states, transition legend, and live etcherAI_P.writeToEtcher log",
      },
      {
        src: "/images/projects/laser-etcher-table.JPEG",
        alt: "Laser etcher and operator HMI installed beside the glass production table",
      },
    ],
    title: "Laser Etcher Modernization",
    kicker: "Automation / Serialization",
    tagline: "I replaced a deprecated, network-dependent etching package with an in-house Ignition system that marks glass from the production schedule.",
    metrics: ["$143K+ per implementation", "11 lines / 5 plants (rollout target)", "5,000 records/batch"],
    tech: ["Ignition Perspective", "Python/Jython", "SQL", "TCP / Dynamark", "PLC"],
    problem:
      "PPS, a deprecated Java-based etching package, depended on the network. When PPS or the network went down, lasers stopped etching to schedule: during one outage about 60,000 units shipped unetched, Venice went months unable to etch, and Stayton's etcher was beyond repair. Stayton was the only site without etching on a standard production line. The permanent etch identifies who made a unit, what it is, and where it was built, and traces back to its order and line. When labels are missing, it is the last ID left; it also supports warranty and customer care, IG certification, and brand.",
    approach:
      "I built a full-stack Python/Ignition replacement in house, deployed and supported on a local Ignition server. Titan ERP exports the production schedule as CSV to a network path; Ignition watches for new files and loads them into SQL. A Perspective HMI presents the batch. As each glass lite rides the float table, the DL05 PLC detects its position and triggers the Domino laser with the current record's data; the exit sensor advances the record. The gateway owns the Dynamark TCP conversation and waits for each response before sending the next command, preventing replies from getting scrambled. Etching runs locally without an internet dependency.",
    architectureCaption:
      "Titan ERP schedules arrive as CSV and load into SQL. Perspective presents the batch; the DL05 detects glass position and advances records, while the local Ignition gateway serializes Dynamark commands to the Domino laser and waits for each response.",
    implementation:
      "I built the Ignition and Python software; controls and mechanical partners handled the laser and float-table integration. Dynamark is a text protocol over TCP port 20000, terminated by CR/LF; replies are OK, RESULT, or ERROR n. On startup, the gateway loads the label and subscribes to SETMSG 1–5, 12, and 26. Its state machine covers DISCONNECTED, INITIALIZING, IDLE/READY, TX IN FLIGHT, WAITING MSG 26, PRINTING (MSG 2 to MSG 3), NOT READY (MSG 4/12), and FAULT (ERROR, TCP loss, or MSG 5). The CommandQueue, EtcherBusy, EtcherFaulted, and isConnected tags support this flow. A diagnostics view shows the state diagram and live etcherAI_P.writeToEtcher log for multi-session debugging. The operator HMI includes schedule selection, Start/Stop, Cycle-Start/Send-to-Print, Mark-Done and Mark-Reject, Show Rework, a live etch preview with record values, and paging through batches of about 5,000 records (about 500 pages). I added Sequence Search after operators requested it on the floor. Etch content is standardized, including the JW prefix and AAMA certification information, so it can replace the separate AAMA Gold sticker.",
    code: {
      lang: "python",
      filename: "etcherAI_P.py",
      caption: "Sanitized Jython excerpt. Tag paths and label name are placeholders.",
      source: `TCP_WRITE_TAG = "[provider]PLACEHOLDER/Etcher/Write"
COMMAND_QUEUE_TAG = "[provider]PLACEHOLDER/Etcher/CommandQueue"
ETCHER_BUSY_TAG = "[provider]PLACEHOLDER/Etcher/EtcherBusy"
ETCHER_FAULTED_TAG = "[provider]PLACEHOLDER/Etcher/EtcherFaulted"

def writeToEtcher(command):
    system.tag.writeBlocking([TCP_WRITE_TAG], [command + "\\r\\n"])

def setMsgsTrue(message_types):
    return ["SETMSG %d 1" % message_type for message_type in message_types]

def startUp():
    commands = ['LOADPROJECT "<label-name>"']
    commands.extend(setMsgsTrue([1, 2, 3, 4, 5, 12, 26]))
    system.tag.writeBlocking([COMMAND_QUEUE_TAG], [commands])
    sendNextCommand()

def sendNextCommand():
    busy = system.tag.readBlocking([ETCHER_BUSY_TAG])[0].value
    if busy:
        return
    queue = system.tag.readBlocking([COMMAND_QUEUE_TAG])[0].value or []
    if not queue:
        return
    command = queue.pop(0)
    system.tag.writeBlocking(
        [COMMAND_QUEUE_TAG, ETCHER_BUSY_TAG], [queue, True])
    writeToEtcher(command)

def onResponse(response):
    response = response.strip()
    if response.startswith("ERROR") or response == "MSG 5":
        system.tag.writeBlocking(
            [ETCHER_BUSY_TAG, ETCHER_FAULTED_TAG], [False, True])
        return
    if response == "OK" or response in ("MSG 3", "MSG 4", "MSG 12"):
        system.tag.writeBlocking([ETCHER_BUSY_TAG], [False])
        sendNextCommand()
`,
    },
    results: [
      { value: "$143K+", label: "Projected 3-year net avoidance per in-house build: vendor build/licensing avoided plus about $25K/year support/licensing. Reuse adds no vendor fee per line." },
      { value: "Outage-proof", label: "Etches locally from the loaded schedule without a live network, PPS, or internet dependency" },
      { value: "5,000 / batch", label: "Records per batch; sequence search added from operator feedback" },
    ],
    resultsNote:
      "Conservative. Excludes label elimination and service-trip savings, and scales with each line deployed.",
    reflection:
      "Next, I would complete the rollout pattern with a dedicated Ignition server per glass plant, so no site depends on another site's connection, and parameterize site and line IDs so I can deploy the project to the remaining lines without hand-copying tags.",
    videos: [
      { src: "https://www.youtube.com/embed/NlzmohUvFRo", title: "Laser Etcher overhaul project video", caption: "Laser Etcher overhaul" },
      { src: "https://www.youtube.com/embed/O4gmPoP8y_0", title: "Laser Etcher supporting project video", caption: "Supporting production workflow" },
      { src: "https://www.youtube.com/embed/UsK7NBZkWGk", title: "Laser Etcher functional test", caption: "Laser Etcher functional test" },
    ],
  },
  {
    slug: "suds",
    image: "/images/projects/Suds%20Logo.png",
    alt: "SUDS Soap Usage and Dispensing System project",
    viewTitle: "SUDS installation",
    viewImages: [
      {
        src: "/images/projects/SUDS.JPEG",
        alt: "Installed SUDS enclosure with Raspberry Pi and four conductivity displays",
      },
    ],
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
    image: "/images/projects/plant-floor-visibility.png",
    alt: "Plant Floor Visibility Platform project",
    overviewImage: "/images/projects/plant-floor-visibility-overview.png",
    overviewAlt: "Overview of the live plant-floor map with machine status by production area",
    title: "Plant Floor Visibility Platform",
    kicker: "SCADA / Operations",
    tagline: "Real-time operational visibility presented to the North America plant manager network.",
    metrics: ["NA best practice", "Live visibility"],
    tech: ["Ignition Perspective", "L2L REST API", "Jython"],
    problem:
      "During live production, teams kept asking which machines were down, which lines were impacted, and where on the floor. The answers were buried in scrolling L2L dispatch lists that required logging in and navigating. Every clarification cost response time.",
    approach:
      "I built a spatial status layer in Ignition Perspective. Machines sit where they physically are on the plant layout, colored by their most severe open L2L dispatch: red for down, yellow for impacted, and green for no impacting dispatches. All / Maint / IT filters scope by dispatch trade; area buttons jump to each production area, and the map supports zoom and pan. Double-clicking an asset opens that machine in L2L. It is designed to stay open on shared floor displays: a constant visual aid, not a report.",
    architectureCaption:
      "L2L remains the system of record. Once per minute, a single Ignition gateway REST API call reads all open dispatches for the site, resolves the most severe status for each machine by machine code, and refreshes the Perspective floor map. Double-clicking an asset opens that machine directly in L2L.",
    implementation:
      "I derive status from L2L dispatches: one gateway call refreshes the whole floor, keeping Perspective clients lightweight. Authenticated editing mode lets users move, add, and adjust assets live without a redeploy or Designer work; an L2L custom property defines each asset's map shape. The responsive layout works from an iPad mini to a 75-inch floor TV and in the Ignition Perspective mobile app. This is a visual awareness layer: it does not replace L2L dashboards, control machines, perform analytics, or act as a CMMS. The template needs a new background layout and the site's L2L code and dispatch types; it is already in use at another plant, and other sites have asked for it.",
    code: {
      lang: "python",
      filename: "dispatch_status.py",
      caption: "Sanitized Jython example using normalized dispatch fields.",
      source: `SEVERITY = {"none": 0, "impacted": 1, "down": 2}

def worst_status_by_machine(open_dispatches, machine_codes):
    status_by_machine = dict((code, "none") for code in machine_codes)
    for dispatch in open_dispatches:
        machine_code = dispatch.get("machine_code")
        severity = dispatch.get("severity")
        if machine_code in status_by_machine and severity in ("down", "impacted"):
            current = status_by_machine[machine_code]
            if SEVERITY[severity] > SEVERITY[current]:
                status_by_machine[machine_code] = severity
    return status_by_machine

def cell_style(severity):
    return {
        "down": {"fill": "#ff0000", "label": "Machine/Equipment Down"},
        "impacted": {"fill": "#ffff00", "label": "Machine/Equipment Impacted"},
        "none": {"fill": "#008000", "label": "No impacting dispatches"},
    }[severity]
`,
    },
    results: [
      { value: "Best practice", label: "Presented to plant leadership and the North America plant manager network" },
      { value: "One call, whole floor", label: "A single API call per minute keeps every asset current" },
      { value: "Reusable pattern", label: "New sites need a layout, L2L site code, and dispatch types; already extended to another plant" },
    ],
    reflection:
      "Next, I would explore an event-driven push from L2L instead of polling, and evaluate the map as a native L2L visualization so sites without Ignition could use it.",
    videos: [
      {
        src: "https://www.youtube.com/embed/26jgrERn-EU",
        title: "Ignition plant floor visibility map demo",
        caption: "Ignition Perspective live plant-floor map",
      },
    ],
  },
  {
    slug: "mes-revpi-integration",
    image: "/images/projects/mes-iiot-integration.png",
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
