import { EcosystemPillar, CaseStudy } from "./types";

export const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    id: "fintech",
    number: "01",
    title: "FinTech Infrastructure",
    subtitle: "Yeedem Books Ledger Engine",
    description: "Our flagship offline-first financial ledger. Engineered to process unstructured business transactions and sync securely in zero-data or low-connectivity environments. This directly solves the data-scarcity bottlenecks in emerging retail markets, ensuring full double-entry integrity on the edge.",
    technicalSpecs: [
      "Offline transactional queuing via IndexedDB",
      "Cryptographic ledger block checksum verification",
      "Delta sync reconciliation algorithms",
      "Optimized payload footprint (<2KB per transaction batch)"
    ],
    impactMetric: "99.99%",
    impactLabel: "Offline Sync Accuracy"
  },
  {
    id: "regtech",
    number: "02",
    title: "RegTech & Compliance Automation",
    subtitle: "Informal Economy Audit Rails",
    description: "Building localized, software-driven data compliance rails. Our proprietary parsing logic mitigates fraud risk and enforces structural accounting integrity for unmapped retail sectors, bringing informal commerce into regulatory, tax, and audit alignment completely offline.",
    technicalSpecs: [
      "Dynamic tax category mapping engines",
      "Localized VAT/GST compliance compilers",
      "Automated fraud risk pattern matching",
      "Encrypted ledger audit trails"
    ],
    impactMetric: "0% Leakage",
    impactLabel: "Mitigated Fraud Vectors"
  },
  {
    id: "climatetech",
    number: "03",
    title: "ClimateTech & Energy Asset Management",
    subtitle: "Decentralized Lithium Power Infrastructure",
    description: "Engineering decentralized energy storage solutions tailored for grid-deficient retail environments. We design high-efficiency, localized Lithium Iron Phosphate (LiFePO4) battery architectures to provide sustainable power continuity for micro-businesses, directly eliminating fossil-fuel dependency and ensuring continuous digital uptime.",
    technicalSpecs: [
      "LiFePO4 high-cycle battery configuration",
      "Telemetry systems for grid-independent uptime monitoring",
      "Fossil-fuel dependency elimination metrics",
      "Smart BMS charge-discharge cycle protection"
    ],
    impactMetric: "40% Abatement",
    impactLabel: "Fossil Fuel Reduction"
  },
  {
    id: "connectivity",
    number: "04",
    title: "Connectivity & Network Monitoring",
    subtitle: "Satellite Fleet Management Dashboard",
    description: "Enterprise-level hardware fleet management and satellite network monitoring dashboard operations. Specializing in maintaining 99.99% critical uptime for distributed corporate networks, remote terminals, and terminal gateways across fragmented terrains.",
    technicalSpecs: [
      "Starlink terminal telemetry synchronization",
      "Gateway latency tracking algorithms",
      "Real-time bandwidth utilization optimization",
      "Remote fleet firmware update managers"
    ],
    impactMetric: "99.99%",
    impactLabel: "Critical Network Uptime"
  },
  {
    id: "ai-automation",
    number: "05",
    title: "AI & Data Automation",
    subtitle: "Local Fuse Parser System",
    description: "Building localized predictive data models and localized parsing engines (like the Local Fuse Parser) tailored specifically to navigate emerging market infrastructure constraints, bringing unstructured real-world transactions into professional financial schemas.",
    technicalSpecs: [
      "Natural language business logic parsing",
      "Low-compute tokenization & data optimization",
      "Autonomous financial category schema compilation",
      "API bridging for unmapped economic domains"
    ],
    impactMetric: "< 1.2s",
    impactLabel: "Mean Local Parser Speed"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "yeedem-books",
    title: "Yeedem Books Integration",
    subtitle: "Offline-First Financial Ledger",
    description: "Deployed for unmapped merchants and retail suppliers. Features the proprietary Local Fuse Parser UI to transition raw chat invoices and unstructured receipts into verified double-entry accounting records with zero internet requirements.",
    deploymentUrl: "https://inv.yeedem.com",
    techStack: ["React", "IndexedDB", "Tailwind CSS", "Local Fuse Engine"],
    features: ["Real-time unstructured transaction parsing", "Deterministic tax calculation", "Offline database syncing", "Audit-ready reporting export"],
    metrics: { label: "Merchants Onboarded", value: "12,400+" }
  },
  {
    id: "starlink-stats",
    title: "My Starlink Stats",
    subtitle: "Enterprise Connectivity Dashboard",
    description: "A distributed satellite hardware fleet telemetry dashboard monitoring real-time connectivity health, constellation orbits, and packet transmission efficiency across remote operating centers.",
    deploymentUrl: "https://www.yeedem.com",
    techStack: ["Next.js", "Starlink Telemetry API", "D3.js Visualization", "Tailwind CSS"],
    features: ["Latency packet tracking", "Remote terminal health pinging", "Automated satellite alignment triggers", "Historical bandwidth logs"],
    metrics: { label: "Fleet Terminals Managed", value: "320+ Grid Nodes" }
  },
  {
    id: "cwc-portal",
    title: "CWC Educational Portal",
    subtitle: "Optimized Management Framework",
    description: "A performance-optimized educational management framework, restructuring legacy server databases to support remote learning, digital assets, and automated examinations under low-bandwidth parameters.",
    deploymentUrl: "https://www.yeedem.com",
    techStack: ["React", "Express Server", "Low-Bandwidth GraphQL", "Tailwind CSS"],
    features: ["Adaptive image resolution pipelines", "Offline student profile syncing", "Secure examination integrity verification", "Automated grading microservices"],
    metrics: { label: "Active Remote Students", value: "45,000+" }
  }
];

export const SIMULATION_TEMPLATES = [
  {
    label: "Informal WhatsApp Sale Log",
    text: "WhatsApp Msg - June 28: Sold 3 bags of wholesale rice to Mama Mary Food Market for 185000 NGN. Received 50000 NGN deposit via cash, remaining 135000 NGN balance pending payment next Friday. No tax invoiced yet, customer requested delivery to stall 44."
  },
  {
    label: "Grid-Battery Battery Diagnostic Telemetry",
    text: "SYS_LOG-LIFEP04: VoltEdge microgrid node #14. Charge status 84%, core temperature 31.4C. Carbon savings: 4.8kg CO2. Battery cycle counts: 421. High stability detected, grid load bypassed successfully. Dispatched maintenance token 2419."
  },
  {
    label: "Unstructured Retail Supplier Invoice",
    text: "SUPPLIER INVOICE - STARLINK DISTRIBUTOR CO. Received Starlink Enterprise Dish Kit serial #8493-SL-90. Cost is $1,250.00 USD. Shipped to remote station. Terms: Net 30. Code: INFRA-NET-409."
  }
];
