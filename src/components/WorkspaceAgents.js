'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, Play, Laptop, Search, Settings, FileText, Film, 
  AlertCircle, Database, Sparkles, TerminalSquare, Info, ChevronRight, CheckCircle2
} from 'lucide-react';

const AGENTS = {
  coder: {
    name: 'Coder Agent',
    icon: <Code size={18} />,
    color: 'purple',
    desc: 'Searches, scores, and edits files autonomously. Employs keyboard macros to automate VS Code / Cursor editors, with built-in file system I/O fallbacks.',
    capabilities: [
      'Autonomously creates, modifies, and cleans code files (.js, .py, .css, etc.)',
      'Uses advanced keyboard macros to automate refactoring inside editor viewports',
      'Applies patches using smart diff-matching, avoiding full-file rewrites',
      'Runs post-patch build verification checks to guarantee syntax correctness'
    ],
    triggers: [
      '"tell coder agent to [instruction] in [file]"',
      '"tell coder to add a dark mode toggle to Navbar.js"'
    ],
    logs: [
      { text: '🤖 [Coder Agent] Activated inside active workspace.', delay: 350, progress: 10 },
      { text: '📂 [Coder Agent] Target: src/components/Navbar.js', delay: 300, progress: 25 },
      { text: '🔍 [Coder Agent] Scanning file structure... Found 104 lines of code.', delay: 400, progress: 40 },
      { text: '🔧 [Coder Agent] Constructing layout modifications patch...', delay: 500, progress: 60 },
      { text: '✨ [Coder Agent] Injecting theme context variables and toggle button listeners...', delay: 400, progress: 80 },
      { text: '🛡️ [Coder Agent] Running syntax verification compiles... PASS.', delay: 350, progress: 95 },
      { text: '🎉 [SUCCESS] Navbar patch committed successfully to workspace.', delay: 200, progress: 100 }
    ]
  },
  runner: {
    name: 'Runner & QA Agent',
    icon: <Play size={18} />,
    color: 'cyan',
    desc: 'Detects project configurations (Python, Node, React) to spin up local development servers in background threads, checks output streams for errors, and runs Selenium integration tests.',
    capabilities: [
      'Identifies runtime configs (package.json, requirements.txt, pyproject.toml)',
      'Launches server daemons (Next.js, FastAPI, Flask) in isolated sub-threads',
      'Monitors compiler logs and standard streams (stdout/stderr) for runtime crashes',
      'Coordinates Selenium and Cypress scripts to test user login & form submissions'
    ],
    triggers: [
      '"run my project"',
      '"start dev server"',
      '"run website test"'
    ],
    logs: [
      { text: '🤖 [Runner Agent] Parsing active workspace directory...', delay: 350, progress: 15 },
      { text: '📦 [Runner Agent] Detected Next.js framework configuration (package.json).', delay: 300, progress: 30 },
      { text: '⚙️ [Runner Agent] Executing dev command in background: npm run dev', delay: 400, progress: 50 },
      { text: '📡 [Runner Agent] Process initialized on PID 14920.', delay: 350, progress: 65 },
      { text: '🌐 [Runner Agent] Local developer server active at: http://localhost:3000', delay: 500, progress: 80 },
      { text: '🕵️ [Runner Agent] Running automated Selenium integration diagnostics...', delay: 450, progress: 95 },
      { text: '🎉 [SUCCESS] Diagnostic complete: 200 OK (0 linter errors, 0 runtime crashes).', delay: 200, progress: 100 }
    ]
  },
  web_builder: {
    name: 'Web Builder Agent',
    icon: <Laptop size={18} />,
    color: 'pink',
    desc: 'Autonomously structures web wireframes, plans responsive styling checklists, and directs the Coder Agent to build full layouts inside your workspace.',
    capabilities: [
      'Structures mockups and wireframes from high-level visual descriptions',
      'Generates modular Next.js components, page layouts, and CSS files',
      'Orchestrates the Coder Agent to write file buffers without developer intervention',
      'Sanity-checks mobile-first styling responsiveness on virtual breakpoints'
    ],
    triggers: [
      '"build website [topic]"',
      '"create website portfolio"'
    ],
    logs: [
      { text: '🤖 [Web Builder] Planning layout wireframe checklist for topic: Portfolio...', delay: 400, progress: 15 },
      { text: '📐 [Web Builder] Structuring page layout grids (Hero, Skills, Projects, Footer)...', delay: 450, progress: 35 },
      { text: '🎨 [Web Builder] Framework selected: Next.js + CSS modules.', delay: 300, progress: 50 },
      { text: '🔧 [Web Builder] Command Coder Agent: Create workspace files...', delay: 400, progress: 65 },
      { text: '     - Creating src/components/Hero.js ... Done.', delay: 200, progress: 75 },
      { text: '     - Creating src/app/globals.css ... Done.', delay: 200, progress: 85 },
      { text: '🧪 [Web Builder] Triggering preview server rendering check...', delay: 450, progress: 95 },
      { text: '🎉 [SUCCESS] Website generated successfully under workspace directory.', delay: 200, progress: 100 }
    ]
  },
  researcher: {
    name: 'Researcher Agent',
    icon: <Search size={18} />,
    color: 'purple',
    desc: 'Scrapes documentation websites and crawls search APIs. Summarizes topics into Markdown reports in your notes.',
    capabilities: [
      'Crawls Google Search, Wikipedia indices, and GitHub APIs for data retrieval',
      'Scrapes API documents, library guides, and code repositories on the fly',
      'Cleans scraped raw HTML text, distilling redundant paragraphs',
      'Writes technical summary briefs and notes lists directly to workspace files'
    ],
    triggers: [
      '"research [topic]"',
      '"scrape website [url]"'
    ],
    logs: [
      { text: '🤖 [Researcher] Initializing search query for topic: Vector Databases...', delay: 400, progress: 15 },
      { text: '📡 [Researcher] Contacting Google API and Wikipedia mirror registries...', delay: 450, progress: 35 },
      { text: '🔍 [Researcher] Parsing documentation structures for ChromaDB, Pinecone, and Qdrant...', delay: 500, progress: 60 },
      { text: '📝 [Researcher] Compiling markdown summaries using context-aware filters...', delay: 450, progress: 80 },
      { text: '💾 [Researcher] Writing compiled notes payload to workspace cache...', delay: 350, progress: 95 },
      { text: '🎉 [SUCCESS] Research report generated. File saved to C:/Users/patel/workspace/notes.md.', delay: 200, progress: 100 }
    ]
  },
  sys_admin: {
    name: 'System Admin Agent',
    icon: <Settings size={18} />,
    color: 'cyan',
    desc: 'Automates Windows operating system cleanups, terminates CPU-hogging lagging processes, and configures scheduled local project backups.',
    capabilities: [
      'Purges volatile AppData cache files and Windows temporary directories',
      'Scans task lists to identify and terminate lagging/heavy processes',
      'Establishes directory sync checks to backup target project builds',
      'Schedules custom cron triggers using native Windows Task Scheduler APIs'
    ],
    triggers: [
      '"cleanup system temp"',
      '"terminate lagging tasks"',
      '"schedule daily backup"'
    ],
    logs: [
      { text: '🤖 [SysAdmin] Launching local Windows system diagnostic scans...', delay: 350, progress: 15 },
      { text: '📂 [SysAdmin] Scanning AppData Temp caches and system event logs...', delay: 400, progress: 35 },
      { text: '🚨 [SysAdmin] Found: 1,482 volatile files cached in temp directories.', delay: 300, progress: 50 },
      { text: '🗑️ [SysAdmin] Purging cache files... Storage reclaimed: 1.24 GB.', delay: 450, progress: 75 },
      { text: '⚡ [SysAdmin] Optimizing thread queues... CPU usage stabilized.', delay: 350, progress: 90 },
      { text: '🎉 [SUCCESS] Temporary folders cleared. Workstation performance optimized.', delay: 200, progress: 100 }
    ]
  },
  office_doc: {
    name: 'Office Document Agent',
    icon: <FileText size={18} />,
    color: 'pink',
    desc: 'Parses local Excel and CSV sheets, constructs Matplotlib analytics charts, and auto-generates styled PDF business reports.',
    capabilities: [
      'Reads and edits workbook sheets (.xlsx, .csv) utilizing Pandas dataframes',
      'Generates Matplotlib and Seaborn analytics charts and data plots',
      'Compiles professional PDF invoices and analytical summary briefs via ReportLab',
      'Auto-wraps tabular database contents for clean print layouts'
    ],
    triggers: [
      '"compile report from spreadsheet"'
    ],
    logs: [
      { text: '🤖 [OfficeDoc] Locating spreadsheet source: contacts.csv...', delay: 400, progress: 20 },
      { text: '📊 [OfficeDoc] Reading database records... 244 contacts successfully parsed.', delay: 350, progress: 40 },
      { text: '📈 [OfficeDoc] Compiling analytical plots (Salary ranges vs. Age groups)...', delay: 450, progress: 65 },
      { text: '🖨️ [OfficeDoc] Structuring layout layouts via ReportLab PDF compiler...', delay: 400, progress: 85 },
      { text: '💾 [OfficeDoc] Writing file stream: report.pdf...', delay: 300, progress: 95 },
      { text: '🎉 [SUCCESS] PDF Report compiled successfully. File saved to C:/Users/patel/workspace/report.pdf.', delay: 200, progress: 100 }
    ]
  },
  media: {
    name: 'Media Agent',
    icon: <Film size={18} />,
    color: 'purple',
    desc: 'Orchestrates yt-dlp downloader engines, extracts video sound to high-quality MP3s, runs NVENC GPU transcodes, and applies ID3 metadata tags.',
    capabilities: [
      'Interfaces yt-dlp download libraries to retrieve online media payloads',
      'Extracts clean soundtrack buffers and encodes to high-quality MP3 logs',
      'Accelerates transcoding and file compression using NVENC GPU cores',
      'Writes complete ID3 header tags including Title, Album, and Cover Art'
    ],
    triggers: [
      '"download video [url]"',
      '"convert video to mp3"',
      '"apply metadata tags"'
    ],
    logs: [
      { text: '🤖 [Media Agent] Resolving streaming video signatures using yt-dlp...', delay: 450, progress: 15 },
      { text: '🎥 [Media Agent] Title: "Advanced Agentic Coding Course" (AAC / H.264).', delay: 300, progress: 30 },
      { text: '📥 [Media Agent] Downloading payload... [==========>         ] 55%', delay: 400, progress: 55 },
      { text: '📥 [Media Agent] Download complete (84 MB payload total).', delay: 350, progress: 75 },
      { text: '🔊 [Media Agent] Running NVENC GPU audio transcoding to MP3...', delay: 400, progress: 90 },
      { text: '🎉 [SUCCESS] ID3 metadata tags applied. Media saved to C:/Users/patel/Videos/.', delay: 200, progress: 100 }
    ]
  },
  solver: {
    name: 'Problems Solver',
    icon: <AlertCircle size={18} />,
    color: 'cyan',
    desc: 'Monitors the active code editor diagnostics and linter outputs. Locates active linter and compiler syntax errors, and applies patches.',
    capabilities: [
      'Queries active VS Code and Cursor workspace linter reports',
      'Identifies compiler exceptions, missing imports, and unused variables',
      'Modifies configuration files (eslint.config, package.json) to clear warnings',
      'Generates and deploys hotfixes to keep dev builds compiling cleanly'
    ],
    triggers: [
      '"solve problems"',
      '"fix editor errors"'
    ],
    logs: [
      { text: '🤖 [Problems Solver] Querying active VS Code compiler diagnostics...', delay: 350, progress: 15 },
      { text: '🚨 [Problems Solver] Located 1 code issue in: src/components/Navbar.js', delay: 400, progress: 40 },
      { text: '🔎 [Problems Solver] Diagnostic ID: "useRef is defined but never used" (Warning).', delay: 300, progress: 60 },
      { text: '🔧 [Problems Solver] Drafting code patch: Removing unused useRef import from line 4.', delay: 450, progress: 80 },
      { text: '🧪 [Problems Solver] Triggering compiler sanity checks... PASS.', delay: 350, progress: 95 },
      { text: '🎉 [SUCCESS] File src/components/Navbar.js patched. All editor errors resolved.', delay: 200, progress: 100 }
    ]
  },
  memory: {
    name: 'Workspace Memory',
    icon: <Database size={18} />,
    color: 'pink',
    desc: 'Tracks active directories, project states, and recent modifications. Keeps a persistent cache to reload your dev workspace layout.',
    capabilities: [
      'Tracks recently modified file paths, active processes, and cursor states',
      'Caches dev workstation sessions in local config indices (~/.jarvis)',
      'Restores active editing buffers to let developers resume workflow stages',
      'Maintains task lists and state milestones across multi-agent executions'
    ],
    triggers: [
      '"set active project"',
      '"resume yesterday\'s work"'
    ],
    logs: [
      { text: '🤖 [Workspace Memory] Accessing active workspace registry database...', delay: 350, progress: 20 },
      { text: '📦 [Workspace Memory] Restoring project config state from ~/.jarvis/active_project.json...', delay: 400, progress: 45 },
      { text: '📂 [Workspace Memory] Active project path loaded: C:/Users/patel/workspace/portfolio/', delay: 300, progress: 65 },
      { text: '📝 [Workspace Memory] Restoring modified file edit buffers:', delay: 300, progress: 75 },
      { text: '     - src/components/Hero.js ... Restored.', delay: 200, progress: 85 },
      { text: '     - src/components/DownloadBanner.js ... Restored.', delay: 200, progress: 95 },
      { text: '🎉 [SUCCESS] Development workspace session fully reloaded. Workspace is ready.', delay: 200, progress: 100 }
    ]
  }
};

export default function WorkspaceAgents() {
  const [activeAgent, setActiveAgent] = useState('coder');
  const [terminalState, setTerminalState] = useState('idle'); // idle | simulating | completed
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const terminalRef = useRef(null);

  // Scroll terminal logs to bottom automatically (without moving browser viewport)
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const handleSimulate = () => {
    if (terminalState === 'simulating') return;

    setTerminalState('simulating');
    setTerminalLogs([]);
    setProgress(0);

    const steps = AGENTS[activeAgent].logs;
    let currentStep = 0;

    const runNextStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        if (step.progress !== undefined) {
          setProgress(step.progress);
        }
        setTerminalLogs(prev => [...prev, step.text]);
        currentStep++;
        setTimeout(runNextStep, step.delay || 400);
      } else {
        setTerminalState('completed');
      }
    };

    runNextStep();
  };

  const currentAgent = AGENTS[activeAgent];

  return (
    <section className="agents-section" id="workspace-agents" style={{ padding: '8rem 0', background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)', borderBottom: '1px solid var(--border-color)' }}>
      {/* Local Styles */}
      <style>{`
        .agents-container {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 2.5rem;
          min-height: 540px;
          margin-top: 4rem;
        }

        @media (max-width: 968px) {
          .agents-container {
            grid-template-columns: 1fr;
          }
        }

        /* Sidebar lists */
        .agents-sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: rgba(8, 10, 15, 0.4);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.25rem;
        }

        .agent-list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .agent-list-item:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-primary);
        }

        .agent-list-item.active {
          border-color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.06);
          color: var(--text-primary);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.05);
        }

        .agent-item-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .agent-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .agent-list-item.active .agent-icon-wrap {
          background: var(--accent-purple);
          color: white;
        }

        .agent-list-item:not(.active) .agent-icon-wrap.purple { color: var(--accent-purple); background: rgba(139, 92, 246, 0.1); }
        .agent-list-item:not(.active) .agent-icon-wrap.cyan { color: var(--accent-cyan); background: rgba(6, 182, 212, 0.1); }
        .agent-list-item:not(.active) .agent-icon-wrap.pink { color: var(--accent-pink); background: rgba(236, 72, 153, 0.1); }

        .agent-badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-muted);
          font-weight: 600;
          font-family: monospace;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .agent-list-item.active .agent-badge {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
        }

        /* Detail/Terminal side */
        .agent-details-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .agent-info-card {
          padding: 1.75rem;
          background: rgba(11, 13, 19, 0.6);
        }

        .agent-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .agent-desc {
          color: var(--text-secondary);
          font-size: 0.925rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .trigger-header {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .trigger-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .trigger-item {
          font-family: monospace;
          font-size: 0.825rem;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.04);
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(6, 182, 212, 0.08);
          word-break: break-all;
        }

        /* Execution Terminal styles */
        .agent-terminal {
          background: #030406;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .terminal-head {
          background: rgba(16, 20, 30, 0.5);
          padding: 0.65rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .terminal-dots-wrap {
          display: flex;
          gap: 6px;
        }

        .terminal-actions-row {
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.01);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .terminal-actions-row button {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: var(--font-heading);
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: all var(--transition-fast);
        }

        .terminal-actions-row button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        }

        .terminal-actions-row button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .terminal-progress-container {
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding: 0.5rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          font-family: monospace;
          color: var(--text-secondary);
        }

        .progress-bar-wrap {
          flex: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          margin: 0 1rem;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          transition: width 0.05s ease-out;
        }

        .terminal-output {
          padding: 1.25rem;
          font-family: monospace;
          font-size: 0.825rem;
          line-height: 1.5;
          color: #e5e7eb;
          overflow-y: auto;
          max-height: 220px;
          min-height: 160px;
        }

        .terminal-log-line {
          margin-bottom: 0.35rem;
          word-break: break-all;
          white-space: pre-wrap;
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="release-tag" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <span className="pulse-dot"></span>
            <span className="tag-text">Multi-Agent Engine</span>
          </div>
          <h2 className="gradient-text">KIRA Autonomous Workspace</h2>
          <p className="subtitle">
            Kira coordinates specialized, background subagents directly inside your development project directories. Automate, debug, and script via direct voice prompts.
          </p>
        </div>

        <div className="agents-container">
          {/* Left Panel: Sidebar Directory */}
          <div className="agents-sidebar">
            <div style={{ padding: '0 0.5rem 0.5rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TerminalSquare size={16} style={{ color: 'var(--accent-purple)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'white', letterSpacing: '0.05em' }}>Agents Directory</span>
            </div>
            
            {Object.entries(AGENTS).map(([key, agent]) => (
              <button
                key={key}
                className={`agent-list-item ${activeAgent === key ? 'active' : ''}`}
                onClick={() => {
                  if (terminalState !== 'simulating') {
                    setActiveAgent(key);
                    setTerminalLogs([]);
                    setTerminalState('idle');
                  }
                }}
                suppressHydrationWarning={true}
              >
                <div className="agent-item-left">
                  <div className={`agent-icon-wrap ${agent.color}`}>
                    {agent.icon}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{agent.name}</span>
                </div>
                <span className="agent-badge">
                  {activeAgent === key && terminalState === 'simulating' ? 'running' : 'ready'}
                </span>
              </button>
            ))}
          </div>

          {/* Right Panel: Detail & Terminal Console */}
          <div className="agent-details-panel">
            {/* Info Card */}
            <div className="agent-info-card glass-card">
              <div className="agent-title-row">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)' }}>
                  {currentAgent.icon}
                </div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  {currentAgent.name}
                </h3>
              </div>
              <p className="agent-desc">{currentAgent.desc}</p>
              
              <div className="trigger-header">
                <Info size={12} />
                <span>Sample Voice Commands</span>
              </div>
              <div className="trigger-list">
                {currentAgent.triggers.map((trigger, index) => (
                  <div key={index} className="trigger-item">{trigger}</div>
                ))}
              </div>

              {/* Agent Capabilities & Features */}
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div className="trigger-header" style={{ marginBottom: '0.75rem' }}>
                  <Sparkles size={12} style={{ color: 'var(--accent-purple)' }} />
                  <span>Key Capabilities & Features</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {currentAgent.capabilities.map((cap, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={14} style={{ color: '#34d399', marginTop: '0.2rem', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Window */}
            <div className="agent-terminal">
              {/* Header bar */}
              <div className="terminal-head">
                <div className="terminal-dots-wrap">
                  <div className="terminal-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <div className="terminal-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                  <div className="terminal-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                  kira-agent-executor.py
                </div>
              </div>

              {/* Action controller */}
              <div className="terminal-actions-row">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                  Target: {currentAgent.name}
                </span>
                <button 
                  onClick={handleSimulate}
                  disabled={terminalState === 'simulating'}
                  suppressHydrationWarning={true}
                >
                  <Play size={12} />
                  <span>{terminalState === 'simulating' ? 'Executing Command...' : 'Simulate Workspace Command'}</span>
                </button>
              </div>

              {/* Progress indicator */}
              {terminalState === 'simulating' && (
                <div className="terminal-progress-container">
                  <span>Running diagnostic...</span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span>{progress}%</span>
                </div>
              )}

              {/* Console log outputs */}
              <div className="terminal-output" ref={terminalRef}>
                {terminalLogs.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)' }}>
                    KIRA Multi-Agent Daemon: STANDBY. Click "Simulate Workspace Command" to trigger mock execution pipeline.
                  </div>
                ) : (
                  terminalLogs.map((log, index) => {
                    let color = '#d1d5db'; // default light grey
                    if (log.includes('[SUCCESS]') || log.startsWith('✨')) color = '#34d399'; // success green
                    if (log.startsWith('🤖') || log.includes('Activated')) color = '#a78bfa'; // lavender action
                    if (log.includes('Target:') || log.includes('Detected')) color = '#60a5fa'; // light blue info
                    if (log.includes('[!]') || log.includes('Intruder')) color = '#fbbf24'; // amber warning
                    if (log.includes('- Creating') || log.includes('- File')) color = 'var(--text-muted)'; // muted sublogs
                    
                    return (
                      <div key={index} className="terminal-log-line" style={{ color }}>
                        {log}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
