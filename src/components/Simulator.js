'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Code, 
  Mic, 
  Play, 
  Send, 
  Smartphone, 
  Wifi, 
  Camera, 
  Shield, 
  Cpu, 
  Folder, 
  Eye, 
  Download, 
  Check, 
  AlertTriangle, 
  RefreshCw,
  QrCode,
  Lock,
  Volume2,
  MessageSquare,
  Mail,
  FileText
} from 'lucide-react';

const PRESETS = {
  multilang: {
    title: '🗣️ Gujarati: "Havaman kevo che"',
    prompt: 'Havaman kevo che',
    steps: [
      { type: 'input', text: 'Voice command: "Havaman kevo che"' },
      { type: 'process', text: 'Speech engine parsing romanized Gujarati...' },
      { type: 'info', text: '🌐 Language auto-detected: GUJARATI' },
      { type: 'action', text: '📍 Resolving street location via Nominatim API...' },
      { type: 'action', text: '🌤️ Fetching OpenWeather report for current coordinates...' },
      { type: 'success', text: '✨ "Havaman saaf chhe, tapman 30 degree chhe." (Weather is sunny, 30°C)' }
    ],
    voiceReply: 'Mausam saaf chhe, tapman 30 degree chhe. Today weather in your location is clear and warm.'
  },
  memory: {
    title: '🧠 Conversational Memory',
    prompt: 'What\'s the weather in Mumbai? ... How about Delhi?',
    steps: [
      { type: 'input', text: 'User: "What\'s the weather in Mumbai?"' },
      { type: 'action', text: '🔍 Fetching weather: Mumbai (28°C, Cloudy)' },
      { type: 'success', text: 'Kira: "It is 28 degrees and cloudy in Mumbai."' },
      { type: 'input', text: 'User: "How about Delhi?"' },
      { type: 'process', text: 'Resolving follow-up prompt...' },
      { type: 'info', text: '🧠 Context restored: (Category: Weather) -> Target: Delhi' },
      { type: 'action', text: '🔍 Fetching weather: Delhi (34°C, Clear)' },
      { type: 'success', text: 'Kira: "Delhi is currently 34 degrees and clear."' }
    ],
    voiceReply: 'Delhi is currently 34 degrees and clear. Memory query resolved.'
  },
  security: {
    title: '🛡️ Webcam Lock & CCTV Stream',
    prompt: 'Enable security mode',
    steps: [
      { type: 'input', text: 'User: "Enable security mode"' },
      { type: 'process', text: 'Activating OpenCV camera thread...' },
      { type: 'info', text: '📷 Scanning face landmarks (dlib tolerance: 0.48)...' },
      { type: 'action', text: '⚠️ Intruder detected! No matching face landmarks for 5.0 seconds.' },
      { type: 'action', text: '🔒 Locking workstation (Win+L)...' },
      { type: 'success', text: '✨ Locked. Intruder snapshot uploaded to phone companion portal (Connection PIN: 1234)' }
    ],
    voiceReply: 'Workstation locked. Intruder alert posted to your mobile companion portal.'
  },
  workflow: {
    title: '🖥️ Workflow: Google to Notepad',
    prompt: 'search google for events and save to notepad',
    steps: [
      { type: 'input', text: 'Voice command: "search google for local developer events and save to notepad"' },
      { type: 'process', text: 'Speech engine parsing command intent...' },
      { type: 'info', text: '🤖 Intent detected: Multi-Agent Vision-Action Loop' },
      { type: 'action', text: '🌐 Launching Google Chrome & searching events...' },
      { type: 'action', text: '🔍 Extracting clean page content using Gemini 2.5 search grounding...' },
      { type: 'action', text: '🖥️ Injecting local PyAutoGUI clicks & opening notepad.exe...' },
      { type: 'success', text: '✨ Content pasted and saved to "Desktop/events.txt" (Emergency stop corners active).' }
    ],
    voiceReply: 'Google search grounding complete. Event data compiled and saved to notepad file on your desktop.'
  }
};

const DEFAULT_CODE = `# plugins/discord_webhook.py
import requests
import psutil

def execute():
    webhook_url = "https://discord.com/api/webhooks/mock"
    cpu_usage = psutil.cpu_percent()
    
    print(f"[+] Scanning system CPU diagnostics...")
    print(f"[+] CPU Load detected: {cpu_usage}%")
    
    if cpu_usage > 90:
        print("[!] Warning: High CPU load! Alerting webhook...")
        payload = {"content": f"⚠️ System alert: CPU load is {cpu_usage}%!"}
        res = requests.post(webhook_url, json=payload)
        return f"Discord alert triggered successfully (status: {res.status_code})"
    
    print("[+] CPU levels normal. Diagnostic script complete.")
    return "Check complete. CPU load is healthy."
`;

export default function Simulator() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('console'); // console | playground | portal
  const [activePreset, setActivePreset] = useState('multilang');
  const [running, setRunning] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [voiceWave, setVoiceWave] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  
  // Custom user input state
  const [userInput, setUserInput] = useState('');
  
  // Web Speech API state
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  
  // Code editor states
  const [codeContent, setCodeContent] = useState(DEFAULT_CODE);
  const [playgroundOutput, setPlaygroundOutput] = useState(['System ready. Click "Run Plugin" to execute script.']);
  const [runningPlayground, setRunningPlayground] = useState(false);

  // Companion Portal States
  const [portalConnected, setPortalConnected] = useState(false);
  const [portalConnecting, setPortalConnecting] = useState(false);
  const [activePhoneTab, setActivePhoneTab] = useState('dashboard'); // dashboard | cctv | explorer | chat | email
  const [guardActive, setGuardActive] = useState(false);
  const [intruderDetected, setIntruderDetected] = useState(false);
  const [metricsData, setMetricsData] = useState({ cpu: 42, memory: 51, disk: 245, battery: 88 });
  const [explorerFiles, setExplorerFiles] = useState([
    { name: 'notes_draft.txt', size: '12 KB', status: 'ready' },
    { name: 'app_settings.json', size: '4 KB', status: 'ready' },
    { name: 'kira-installer.exe', size: '14.2 MB', status: 'ready' },
    { name: 'intruder_snapshot.jpg', size: '2.4 MB', status: 'ready' }
  ]);
  const [lockState, setLockState] = useState('unlocked'); // unlocked | locking | locked
  const [toastMessage, setToastMessage] = useState('');
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Expanded 2-way sync states
  const [volumeLevel, setVolumeLevel] = useState(70);
  const [showVolumeHud, setShowVolumeHud] = useState(false);
  const [pcActiveFile, setPcActiveFile] = useState(null);
  const [screenshotFlash, setScreenshotFlash] = useState(false);
  const [isTypingAgent, setIsTypingAgent] = useState(false);
  const [mobileChatText, setMobileChatText] = useState('');
  const [mobileChatMessages, setMobileChatMessages] = useState([
    { id: 1, sender: 'kira', text: 'KIRA Mobile Companion live, sir. Ready to assist.', time: '13:43' }
  ]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [volumeTimer, setVolumeTimer] = useState(null);

  // Real Companion authentication states
  const [portalAuthenticated, setPortalAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [phoneSidebarOpen, setPhoneSidebarOpen] = useState(false);
  const [agentLogs, setAgentLogs] = useState([
    '[+] KIRA Multi-Agent Core V1.0.0 Online',
    '[+] Listening on WebSocket IPC tunnel...',
    '[+] System agent "Vision" initialized (CCTV)',
    '[+] System agent "Automation" listening'
  ]);
  const [agentCmdInput, setAgentCmdInput] = useState('');
  const [settingsPhone, setSettingsPhone] = useState('+919876543210');
  const [settingsGmail, setSettingsGmail] = useState('kira.assistant.io@gmail.com');
  const [settingsAppPassword, setSettingsAppPassword] = useState('•••• •••• •••• ••••');

  const handleSaveSettings = (e) => {
    if (e) e.preventDefault();
    showToast('⚙️ Settings saved successfully!');
  };

  const handleSendAgentCommand = (e) => {
    if (e) e.preventDefault();
    if (!agentCmdInput) return;
    const cmd = agentCmdInput;
    setAgentCmdInput('');
    setAgentLogs(prev => [...prev, `> ${cmd}`]);
    setTimeout(() => {
      let reply = '';
      const lower = cmd.toLowerCase();
      if (lower.includes('status') || lower.includes('runner')) {
        reply = '[+] Runner status: ACTIVE (0 errors, 4 threads)';
      } else if (lower.includes('cctv') || lower.includes('camera')) {
        reply = '[+] Camera agent active. Face scan confidence: 98%';
      } else if (lower.includes('lock')) {
        setLockState('locked');
        reply = '[!] Workstation locked via agent command.';
      } else {
        reply = `[+] Executing task "${cmd}" across active agent threads... Done.`;
      }
      setAgentLogs(prev => [...prev, reply]);
    }, 800);
  };

  const consoleBodyRef = useRef(null);
  const animationIdRef = useRef(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const handleConnectPortal = () => {
    setPortalConnecting(true);
    setTimeout(() => {
      setPortalConnecting(false);
      setPortalConnected(true);
      setPortalAuthenticated(false);
      setEnteredPin('');
      setPinError(false);
      showToast('📱 Device linked. Enter pairing PIN.');
    }, 1800);
  };

  const handleDisconnectPortal = () => {
    setPortalConnected(false);
    setPortalAuthenticated(false);
    setEnteredPin('');
    setPinError(false);
    setGuardActive(false);
    setIntruderDetected(false);
    setLockState('unlocked');
    setPcActiveFile(null);
    showToast('🔌 Connection terminated.');
  };

  const pressPinKey = (key) => {
    setPinError(false);
    if (key === 'clear') {
      setEnteredPin('');
    } else if (key === 'ok') {
      if (enteredPin === '4892') {
        setPortalAuthenticated(true);
        showToast('⚡ Mobile Portal Connected Successfully!');
      } else {
        setPinError(true);
        setEnteredPin('');
      }
    } else {
      if (enteredPin.length < 4) {
        setEnteredPin(prev => prev + key);
      }
    }
  };

  const toggleGuardMode = () => {
    if (guardActive) {
      setGuardActive(false);
      setIntruderDetected(false);
      showToast('🛡️ Guard Mode Disabled.');
    } else {
      setGuardActive(true);
      showToast('🛡️ Guard Mode Active. Monitoring Webcam...');
      // Simulate intruder alert after 4 seconds
      setTimeout(() => {
        setGuardActive(prev => {
          if (prev) {
            setIntruderDetected(true);
            setLockState('locked');
            showToast('⚠️ INTRUDER DETECTED! Workstation locked.');
          }
          return prev;
        });
      }, 4000);
    }
  };

  const triggerRemoteLock = () => {
    setLockState('locking');
    showToast('🔒 Sending Lock Command...');
    setTimeout(() => {
      setLockState('locked');
      showToast('🔒 Workstation locked successfully.');
    }, 1200);
  };

  const refreshMetrics = () => {
    setMetricsData({
      cpu: Math.floor(25 + Math.random() * 45),
      memory: Math.floor(45 + Math.random() * 15),
      disk: 245 - Math.floor(Math.random() * 5),
      battery: Math.max(20, Math.min(100, 88 + Math.floor(Math.random() * 5) - 2))
    });
    showToast('🔄 Metrics diagnostics refreshed.');
  };

  const triggerOpenFileOnPC = (fileName) => {
    setPcActiveFile(fileName);
    showToast(`👁️ Command sent: Launching "${fileName}" on PC Screen.`);
  };

  const triggerDownloadFile = (idx) => {
    showToast(`📥 Downloading "${explorerFiles[idx].name}" to mobile device...`);
  };

  const changeVolume = (direction) => {
    setVolumeLevel(prev => {
      const newVol = direction === 'up' ? Math.min(100, prev + 10) : Math.max(0, prev - 10);
      showToast(`🔊 Volume set to ${newVol}%`);
      return newVol;
    });
    setShowVolumeHud(true);
    if (volumeTimer) clearTimeout(volumeTimer);
    const newTimer = setTimeout(() => {
      setShowVolumeHud(false);
    }, 2000);
    setVolumeTimer(newTimer);
  };

  const triggerScreenshot = () => {
    setScreenshotFlash(true);
    showToast('📸 Capturing Workstation Screenshot...');
    setTimeout(() => setScreenshotFlash(false), 300);
    setTimeout(() => {
      showToast('📸 Screenshot saved to Companion Gallery.');
    }, 800);
  };

  const sendAgentMessage = (textToSend) => {
    const text = textToSend || mobileChatText;
    if (!text) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMobileChatMessages(prev => [...prev, userMsg]);
    setMobileChatText('');
    setIsTypingAgent(true);
    
    // Generate reply
    setTimeout(() => {
      let replyText = "Sir, I didn't understand that command. Please check available functions.";
      const lower = text.toLowerCase();
      if (lower.includes('diagnostic') || lower.includes('status') || lower.includes('metrics')) {
        replyText = `System diagnostic: CPU load is ${metricsData.cpu}%, RAM load is ${metricsData.memory}%. Battery level is at ${metricsData.battery}%.`;
      } else if (lower.includes('lock')) {
        setLockState('locked');
        replyText = "Locking workstation now, sir. Device status set to SECURE.";
      } else if (lower.includes('owner') || lower.includes('who are you') || lower.includes('kira')) {
        replyText = "I am KIRA, your desktop voice assistant, securely paired to this mobile portal.";
      } else if (lower.includes('guard') || lower.includes('cctv')) {
        replyText = guardActive ? "Remote camera guard is active and scanning." : "Remote camera guard is currently offline, sir.";
      }
      
      const kiraMsg = {
        id: Date.now() + 1,
        sender: 'kira',
        text: replyText,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMobileChatMessages(prev => [...prev, kiraMsg]);
      setIsTypingAgent(false);
      speakText(replyText, 'english');
    }, 1200);
  };

  const generateEmail = () => {
    setEmailLoading(true);
    showToast('⚡ Generating email draft with AI...');
    setTimeout(() => {
      setEmailSubject('Weekly Progress Update - KIRA Project');
      setEmailBody(`Hi Team,\n\nHere is a summary of KIRA Assistant integrations completed today:\n- Voice Synthesis engine successfully connected.\n- PyQt5 circular dials diagnostics layout active.\n- WhatsApp mobile pairing tunnel verified.\n\nEverything is up and running.\n\nBest regards,\nDeveloper`);
      setEmailLoading(false);
      showToast('✨ AI Email draft completed.');
    }, 1000);
  };

  const sendEmail = (e) => {
    if (e) e.preventDefault();
    if (!emailSubject || !emailBody) return;
    showToast('✉️ Connecting to SMTP server...');
    setTimeout(() => {
      setEmailSent(true);
      showToast('🚀 Email sent successfully!');
      setTimeout(() => {
        setEmailSent(false);
        setEmailSubject('');
        setEmailBody('');
      }, 3000);
    }, 1500);
  };

  const speakText = (text, presetKey) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (presetKey === 'multilang') {
        utterance.lang = 'gu-IN';
      } else {
        utterance.lang = 'en-US';
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const runAnimation = async (key) => {
    const runId = ++animationIdRef.current;
    
    setRunning(true);
    setVisibleSteps([]);
    setVoiceWave(false);
    setVoiceText('');
    
    try {
      const preset = PRESETS[key];
      if (!preset) return;
      
      for (let i = 0; i < preset.steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));
        if (runId !== animationIdRef.current) return;
        setVisibleSteps(prev => [...prev, preset.steps[i]]);
      }

      await new Promise((resolve) => setTimeout(resolve, 600));
      if (runId !== animationIdRef.current) return;
      
      setVoiceWave(true);
      setVoiceText(preset.voiceReply);
      speakText(preset.voiceReply, key);
      
      await new Promise((resolve) => setTimeout(resolve, 3500));
    } catch (err) {
      console.error('Animation error:', err);
    } finally {
      if (runId === animationIdRef.current) {
        setVoiceWave(false);
        setRunning(false);
      }
    }
  };

  const triggerPreset = (key) => {
    if (running) return;
    setActivePreset(key);
    runAnimation(key);
  };

  const executeCommand = async (queryText) => {
    const query = queryText.trim();
    if (!query || running) return;

    const runId = ++animationIdRef.current;
    setRunning(true);
    setVoiceWave(false);
    setVoiceText('');

    // Add user input step
    setVisibleSteps(prev => [...prev, { type: 'input', text: query }]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (runId !== animationIdRef.current) return;

      // Add thinking process
      setVisibleSteps(prev => [...prev, { type: 'process', text: 'Analyzing command locally...' }]);

      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (runId !== animationIdRef.current) return;

      let replyText = '';

      // Dynamic answers based on user input (spec-aligned)
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('mausam') || lowerQuery.includes('weather') || lowerQuery.includes('havaman')) {
        setVisibleSteps(prev => [
          ...prev,
          { type: 'info', text: '🌐 Resolving weather query...' },
          { type: 'success', text: '✨ "Havaman saaf chhe, tapman 30 degree chhe." (Sunny, 30°C)' }
        ]);
        replyText = 'Mausam saaf chhe, tapman 30 degree chhe. Weather is clear and sunny in Mumbai.';
      } else if (lowerQuery.includes('security') || lowerQuery.includes('face') || lowerQuery.includes('lock')) {
        setVisibleSteps(prev => [
          ...prev,
          { type: 'process', text: 'Initializing face scanner...' },
          { type: 'success', text: '✨ Security active. Safe locks enabled.' }
        ]);
        replyText = 'Face security is enabled. If you leave your PC for 5 seconds, Windows will lock automatically.';
      } else if (lowerQuery.includes('joke') || lowerQuery.includes('funny')) {
        setVisibleSteps(prev => [
          ...prev,
          { type: 'info', text: '🧠 Accessing joke database...' },
          { type: 'success', text: '✨ Why do programmers wear glasses? Because they can\'t C#!' }
        ]);
        replyText = 'Here is a programming joke. Why do programmers wear glasses? Because they cannot C sharp.';
      } else if (lowerQuery.includes('create') || lowerQuery.includes('folder') || lowerQuery.includes('file') || lowerQuery.includes('open') || lowerQuery.includes('kholo')) {
        setVisibleSteps(prev => [
          ...prev,
          { type: 'action', text: '📁 Creating directory: C:\\Users\\User\\Desktop\\NewFolder...' },
          { type: 'success', text: '✨ Success! Directory created successfully on desktop.' }
        ]);
        replyText = 'I have created the folder on your desktop as requested.';
      } else {
        // Default fallback
        setVisibleSteps(prev => [
          ...prev,
          { type: 'action', text: '🛠️ Compiling command actions...' },
          { type: 'success', text: `✨ Custom task complete: Executed local query actions for: "${query}"` }
        ]);
        replyText = `I have completed the task: ${query}. Let me know if you need other file actions.`;
      }

      setVoiceWave(true);
      setVoiceText(replyText);
      const isGu = query.toLowerCase().includes('havaman') || query.toLowerCase().includes('mausam');
      speakText(replyText, isGu ? 'multilang' : 'english');

      await new Promise((resolve) => setTimeout(resolve, 3800));
    } catch (err) {
      console.error('Command execution error:', err);
    } finally {
      if (runId === animationIdRef.current) {
        setVoiceWave(false);
        setRunning(false);
      }
    }
  };

  const handleCustomInputSubmit = (e) => {
    e.preventDefault();
    if (!userInput || running) return;
    const query = userInput;
    setUserInput('');
    executeCommand(query);
  };

  const toggleSpeechRecognition = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser. Please try Google Chrome or Edge.');
      return;
    }
    if (listening) {
      recognition.stop();
    } else {
      setUserInput('');
      try {
        recognition.start();
      } catch (err) {
        console.error('Speech recognition start failed:', err);
      }
    }
  };

  const handleRunPlayground = async () => {
    if (runningPlayground) return;
    setRunningPlayground(true);
    setPlaygroundOutput(['[+] Compiling plugin dependencies...', '[+] Loading environment bindings...']);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlaygroundOutput(prev => [...prev, '[+] Executing execute() method in discord_webhook.py...']);
      
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setPlaygroundOutput(prev => [
        ...prev,
        '[+] Scanning system CPU diagnostics...',
        '[+] CPU Load detected: 94.2% (WARNING: High load!)',
      ]);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPlaygroundOutput(prev => [
        ...prev,
        '[!] Alerting webhook url: https://discord.com/api/webhooks/mock',
        '[+] Discord Webhook response: 204 (No Content) - Success!',
        '✨ Output: Webhook alert sent successfully. CPU usage is high!'
      ]);
    } catch (err) {
      console.error('Playground compilation error:', err);
    } finally {
      setRunningPlayground(false);
    }
  };

  // Set mounted flag on client and initialize SpeechRecognition
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onstart = () => {
          setListening(true);
          setVoiceWave(true);
          setVoiceText('Listening for command...');
        };

        rec.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserInput(transcript);
          
          // Execute command immediately
          setTimeout(() => {
            executeCommand(transcript);
          }, 800);
        };

        rec.onerror = (e) => {
          console.error('Speech recognition error:', e);
          setListening(false);
          setVoiceWave(false);
          setVoiceText('Could not hear or recognize speech. Try again.');
        };

        rec.onend = () => {
          setListening(false);
          setVoiceWave(false);
        };

        setRecognition(rec);
      }
    }
  }, []);

  // Run animation only after mounting is complete to prevent SSR/Hydration mismatches
  useEffect(() => {
    if (isMounted && activeTab === 'console') {
      runAnimation('multilang');
    }
    return () => {
      // Cleanup running animation
      animationIdRef.current++;
    };
  }, [isMounted, activeTab]);

  // Smooth scroll within the console-body container directly to prevent whole-page layout shifting
  useEffect(() => {
    if (consoleBodyRef.current) {
      const container = consoleBodyRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleSteps]);

  // Don't render console contents until client is mounted to avoid hydration errors
  return (
    <section className="simulator-section" id="simulator">
      <div className="container">
        
        {/* Section Title */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="gradient-text">Try Kira Interactive Playground</h2>
          <p className="subtitle">
            Interact with the simulated terminal, play with the mobile companion, or execute developer code to see how Kira functions.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="simulator-tabs-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div className="simulator-tabs">
            <button 
              className={`sim-tab-btn ${activeTab === 'console' ? 'active' : ''}`}
              onClick={() => setActiveTab('console')}
              id="tab-console-btn"
            >
              <Terminal size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              <span>Interactive Console</span>
            </button>
            <button 
              className={`sim-tab-btn ${activeTab === 'portal' ? 'active' : ''}`}
              onClick={() => setActiveTab('portal')}
              id="tab-portal-btn"
            >
              <Smartphone size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              <span>Mobile Companion Portal</span>
            </button>
            <button 
              className={`sim-tab-btn ${activeTab === 'playground' ? 'active' : ''}`}
              onClick={() => setActiveTab('playground')}
              id="tab-playground-btn"
            >
              <Code size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              <span>Plugin SDK Playground</span>
            </button>
          </div>
        </div>

        {activeTab === 'console' && (
          <div className="simulator-grid">
            {/* Preset Buttons Sidebar */}
            <div className="presets-sidebar">
              <h3 className="sidebar-title">Select Preset</h3>
              <div className="preset-buttons">
                {Object.entries(PRESETS).map(([key, value]) => (
                  <button
                    key={key}
                    className={`preset-btn ${activePreset === key ? 'active' : ''} ${running ? 'disabled' : ''}`}
                    onClick={() => triggerPreset(key)}
                    disabled={running}
                    id={`preset-${key}-btn`}
                  >
                    <div className="preset-btn-glow"></div>
                    <div className="preset-btn-content">
                      <span className="preset-title">{value.title}</span>
                      <span className="preset-prompt">"{value.prompt}"</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Simulated Voice Output UI */}
              <div className="voice-card glass-card">
                <div className="voice-header">
                  <span className="pulse-dot mic-active" style={{ width: '6px', height: '6px', opacity: voiceWave ? 1 : 0 }}></span>
                  <span>Audio Feedback</span>
                </div>
                <div className="voice-content">
                  {voiceWave ? (
                    <div className="wave-bars">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  ) : (
                    <div className="voice-idle">Listening...</div>
                  )}
                  {voiceText && <p className="voice-bubble">"{voiceText}"</p>}
                </div>
              </div>
            </div>

            {/* Interactive Console Screen */}
            <div>
              <div className="console-wrapper glass-card">
                <div className="console-header">
                  <div className="console-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="console-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={14} />
                    <span>kira-desktop-console</span>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.5rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: activePreset === 'multilang' ? 'var(--accent-orange, #f97316)' :
                             activePreset === 'memory' ? 'var(--accent-cyan)' :
                             activePreset === 'security' ? 'var(--accent-pink)' : 'var(--accent-purple)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '50px',
                      fontWeight: 600
                    }}>
                      MOOD: {
                        activePreset === 'multilang' ? 'Cheerful 🍊' :
                        activePreset === 'memory' ? 'Focused ⚡' :
                        activePreset === 'security' ? 'Relaxed 💤' : 'Autopilot 🚀'
                      }
                    </span>
                  </div>
                  <div className="console-status">
                    <span className={`status-indicator ${running ? 'running' : 'idle'}`}></span>
                    <span>{running ? 'PROCESSING' : 'READY'}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%' }}>
                  
                  {/* Top Dashboard Gauges Panel */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '1.25rem',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderBottom: '1px solid var(--border-color)',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    {/* CPU Gauge */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                        <svg width="56" height="56" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.3))' }}>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2.5"/>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeDasharray={`${metricsData.cpu}, 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}/>
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                          {metricsData.cpu}%
                        </div>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CPU LOAD</span>
                    </div>

                    {/* RAM Gauge */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                        <svg width="56" height="56" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.3))' }}>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2.5"/>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeDasharray={`${metricsData.memory}, 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}/>
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                          {metricsData.memory}%
                        </div>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>RAM USAGE</span>
                    </div>

                    {/* CORE TEMP Gauge */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                        <svg width="56" height="56" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 4px rgba(236,72,153,0.3))' }}>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2.5"/>
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-pink)" strokeWidth="2.5" strokeDasharray="47, 100" strokeLinecap="round"/>
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                          47°C
                        </div>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CORE TEMP</span>
                    </div>
                  </div>

                  {/* Bottom Panel: Split screen log and voice indicators */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', height: '320px', minHeight: '320px' }} className="console-split-row">
                    
                    {/* Left: Siri Glow wave feedback */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '1.5rem',
                      borderRight: '1px solid var(--border-color)',
                      position: 'relative'
                    }}>
                      <div className="cctv-scanner-mesh" style={{ opacity: 0.1 }}></div>
                      {voiceWave ? (
                        <div className="wave-bars" style={{ height: '50px', gap: '5px' }}>
                          <span className="bar" style={{ background: 'var(--accent-cyan)', animationDuration: '0.6s' }}></span>
                          <span className="bar" style={{ background: 'var(--accent-purple)', animationDuration: '0.8s' }}></span>
                          <span className="bar" style={{ background: 'var(--accent-pink)', animationDuration: '0.5s' }}></span>
                          <span className="bar" style={{ background: 'var(--accent-cyan)', animationDuration: '0.7s' }}></span>
                          <span className="bar" style={{ background: 'var(--accent-purple)', animationDuration: '0.6s' }}></span>
                        </div>
                      ) : (
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-muted)'
                        }}>
                          <Mic size={18} />
                        </div>
                      )}
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 600 }}>
                        {voiceWave ? 'AUDIO TRANSMITTING' : 'MIC STANDBY'}
                      </span>
                    </div>

                    {/* Right: Scrollable Log Stream */}
                    <div className="console-body" ref={consoleBodyRef} style={{ background: 'rgba(0, 0, 0, 0.15)', height: '100%', overflowY: 'auto', padding: '1.25rem', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                      {isMounted && visibleSteps.map((step, idx) => (
                        <div key={idx} className={`console-line ${step.type}`} style={{ fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                          {step.type === 'input' && <span className="prefix" style={{ color: 'var(--accent-cyan)', marginRight: '4px' }}>&gt;</span>}
                          {step.type === 'process' && <span className="spinner-icon" style={{ marginRight: '4px' }}>⚡</span>}
                          <span className="line-content">{step.text}</span>
                        </div>
                      ))}
                      
                      {isMounted && running && visibleSteps.length < (PRESETS[activePreset]?.steps.length || 0) && (
                        <div className="console-line processing" style={{ fontSize: '0.8rem' }}>
                          <span className="spinner-icon pulse" style={{ marginRight: '4px' }}>⚡</span>
                          <span className="line-content text-muted">Kira is executing...</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Console Text Input Box */}
              <form className="console-input-wrapper" onSubmit={handleCustomInputSubmit} id="console-custom-form">
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`console-mic-btn ${listening ? 'listening' : ''} ${running ? 'disabled' : ''}`}
                  disabled={running}
                  aria-label="Toggle voice input"
                  id="console-custom-mic-btn"
                  suppressHydrationWarning={true}
                >
                  <Mic size={14} />
                </button>
                <input
                  type="text"
                  placeholder="Type custom command or click mic... (e.g. 'weather in mumbai', 'tell me a joke')"
                  className="console-user-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={running}
                  id="console-custom-input"
                />
                <button 
                  type="submit" 
                  className={`console-input-submit ${running ? 'disabled' : ''}`}
                  disabled={running}
                  aria-label="Send command"
                  id="console-custom-submit-btn"
                  suppressHydrationWarning={true}
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'portal' && (
          <div style={{ maxWidth: portalConnected ? '1000px' : '480px', margin: '0 auto', width: '100%' }}>
            {!portalConnected && !portalConnecting && (
              <div className="portal-desktop-setup glass-card" style={{ position: 'relative' }}>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>⚡ Fast Remote Coupling</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    Access your PC metrics, files, and CCTV camera remotely. Click the QR code block for secure pairing options, or simulate coupling directly.
                  </p>
                  
                  <div 
                    className="qr-code-box glow-on-hover"
                    onClick={() => setQrModalOpen(true)}
                    style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease', margin: '0 auto 1.5rem auto' }}
                    title="Click for secure pairing details"
                  >
                    <div className="qr-mock-pattern"></div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: '#0c0e17',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <QrCode size={24} style={{ color: 'var(--accent-cyan)' }} />
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                    IP: 192.168.1.104 | PORT: 8000 | PIN: 1234
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button
                      className="phone-action-btn"
                      onClick={handleConnectPortal}
                      id="portal-pair-btn"
                      style={{ width: '100%' }}
                    >
                      Simulate Direct Coupling
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrModalOpen(true)}
                      style={{
                        fontSize: '0.85rem',
                        padding: '0.6rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.02)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.25s ease'
                      }}
                      id="portal-qr-options-btn"
                    >
                      View QR & WhatsApp Options
                    </button>
                  </div>
                </div>

                {/* QR & WhatsApp Overlay Modal */}
                {qrModalOpen && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(5, 6, 9, 0.98)',
                    zIndex: 100,
                    padding: '2rem',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.25s ease'
                  }}>
                    <h4 style={{ color: 'white', fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 800 }}>🔑 Secure Coupling Methods</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                      Kira supports automatic configuration syncing. Scan this authorization token to link devices without entering credentials.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '6px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '100%', height: '100%', border: '4px solid #000', backgroundImage: 'radial-gradient(circle, #000 30%, transparent 30%)', backgroundSize: '8px 8px' }}></div>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 'bold', display: 'block' }}>Zero-Password QR Pair</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Scan via PyQt5 dashboard to auto-authorize.</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'left', background: 'rgba(6, 182, 212, 0.04)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.15)', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold', display: 'block' }}>💬 WhatsApp Auto-Sync</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>On startup, Kira sends connection keys and access PINs directly to your WhatsApp.</span>
                    </div>
                    <button
                      type="button"
                      className="phone-action-btn"
                      onClick={() => setQrModalOpen(false)}
                      style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.05)', color: 'white' }}
                    >
                      Close Panel
                    </button>
                  </div>
                )}
              </div>
            )}

            {portalConnecting && (
              <div className="portal-desktop-setup glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner-icon pulse" style={{ width: '48px', height: '48px', border: '3px solid transparent', borderTopColor: 'var(--accent-cyan)', borderBottomColor: 'var(--accent-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Smartphone size={20} style={{ color: 'white' }} />
                </div>
                <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Establishing Secure Tunnel</h4>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem', textAlign: 'left', width: '100%', maxWidth: '300px', padding: '1rem', background: '#030406', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: '#6be585' }}>[+] Starting local FastAPI host...</div>
                  <div style={{ color: '#6be585' }}>[+] Allocating public endpoint: lhr.life</div>
                  <div style={{ color: '#22d3ee' }}>[+] Syncing pairing keys...</div>
                </div>
              </div>
            )}

            {portalConnected && (
              <div className="portal-simulator-split" style={{
                display: 'flex',
                gap: '2.5rem',
                alignItems: 'start',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%'
              }}>
                
                {/* Left Side: Simulated Workstation PC Screen */}
                <div className="console-wrapper glass-card" style={{ flex: '1 1 500px', position: 'relative', overflow: 'hidden', minHeight: '420px', display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Screenshot Flash Overlay */}
                  {screenshotFlash && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'white',
                      zIndex: 9999,
                      opacity: 0.9,
                      pointerEvents: 'none'
                    }}></div>
                  )}

                  {/* Volume HUD Overlay */}
                  {showVolumeHud && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(5, 6, 9, 0.95)',
                      border: '1px solid var(--accent-cyan)',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      zIndex: 2000,
                      boxShadow: '0 0 15px var(--accent-cyan-glow)'
                    }}>
                      <Volume2 size={16} className="text-cyan" />
                      <div style={{ width: '100px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative' }}>
                        <div style={{ width: `${volumeLevel}%`, height: '100%', background: 'var(--accent-cyan)', borderRadius: '2px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 'bold', fontFamily: 'monospace' }}>{volumeLevel}%</span>
                    </div>
                  )}

                  {/* Windows Lock Screen Overlay */}
                  {lockState === 'locked' && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at center, #0d111c 0%, #050609 100%)',
                      zIndex: 1500,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(236, 72, 153, 0.05)',
                        border: '2px solid var(--accent-pink)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-pink)',
                        boxShadow: '0 0 15px var(--accent-pink-glow)'
                      }}>
                        <Lock size={24} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>WORKSTATION SECURED</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                          Remote lock active (Windows Win+L simulated)
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setLockState('unlocked');
                          showToast('🔓 Workstation unlocked locally.');
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'white',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          padding: '0.4rem 1rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          marginTop: '0.5rem',
                          transition: 'background 0.2s'
                        }}
                      >
                        Unlock Workstation
                      </button>
                    </div>
                  )}

                  {/* Notepad Text Editor Overlay */}
                  {pcActiveFile && (
                    <div style={{
                      position: 'absolute',
                      top: '10%',
                      left: '8%',
                      right: '8%',
                      bottom: '10%',
                      background: '#1e1e1e',
                      border: '1px solid #3c3c3c',
                      borderRadius: '6px',
                      zIndex: 1000,
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                      {/* Notepad Title bar */}
                      <div style={{
                        background: '#323232',
                        padding: '0.35rem 0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #2b2b2b'
                      }}>
                        <span style={{ fontSize: '0.75rem', color: '#cccccc', fontFamily: 'monospace' }}>
                          📝 {pcActiveFile} - Notepad
                        </span>
                        <button 
                          onClick={() => setPcActiveFile(null)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#aaaaaa',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            lineHeight: 1
                          }}
                        >
                          &times;
                        </button>
                      </div>
                      {/* Notepad File Menu bar */}
                      <div style={{
                        background: '#252526',
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.65rem',
                        color: '#858585',
                        display: 'flex',
                        gap: '0.75rem',
                        borderBottom: '1px solid #1e1e1e',
                        fontFamily: 'sans-serif'
                      }}>
                        <span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>
                      </div>
                      {/* Notepad Contents */}
                      <pre style={{
                        flexGrow: 1,
                        padding: '1rem',
                        background: '#1e1e1e',
                        color: '#d4d4d4',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        overflow: 'auto',
                        margin: 0,
                        whiteSpace: 'pre-wrap'
                      }}>
                        {pcActiveFile === 'notes_draft.txt' && `KIRA System integration keys for remote FastAPI ssh tunnels:\n\nActive reverse tunnel endpoint:\nURL: http://lhr.life/auth\nPIN Code: 4892\n\nThis config links your desktop server with the mobile app automatically on startup.`}
                        {pcActiveFile === 'app_settings.json' && `{\n  "wake_word": "kira",\n  "voice_accent": "gu-IN",\n  "security_mode_active": true,\n  "away_lockout_seconds": 5,\n  "whatsapp_alerts": true,\n  "tunnel_port": 8000\n}`}
                        {pcActiveFile === 'kira-installer.exe' && `[BINARY DATA STREAM]\n01001011 01001001 01010010 01000001\n00000111 00011010 11001100 00110011\nSystem installer payload compiled successfully.\nKIRA Version 1.0.0 Setup.`}
                        {pcActiveFile === 'intruder_snapshot.jpg' && `[IMAGE SENSOR ATTACHED]\n\nFile Name: intruder_snapshot.jpg\nResolution: 1080p Web Sensor\nAlert Status: SECURED\n\n[=== CAMERA SENSOR OK ===]`}
                      </pre>
                    </div>
                  )}

                  {/* Main Workstation Screen Header */}
                  <div className="console-header">
                    <div className="console-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <div className="console-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Terminal size={14} />
                      <span>{portalAuthenticated ? 'kira-desktop-workstation' : 'kira-authorization-gateway'}</span>
                      <span style={{
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.5rem',
                        background: portalAuthenticated ? 'rgba(16, 185, 129, 0.1)' : 'rgba(230, 150, 20, 0.1)',
                        color: portalAuthenticated ? '#10b981' : '#f59e0b',
                        border: portalAuthenticated ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(230, 150, 20, 0.2)',
                        borderRadius: '50px',
                        fontWeight: 600
                      }}>
                        {portalAuthenticated ? 'STATUS: SECURE 🛡️' : 'STATUS: PAIRING REQUIRED 🔐'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>IP: 192.168.1.104</span>
                  </div>

                  {/* Desktop Wallpaper view with active dashboard widgets */}
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'rgba(0, 0, 0, 0.3)' }}>
                    
                    {!portalAuthenticated ? (
                      <div style={{ flexGrow: 1, padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ color: 'var(--accent-cyan)' }}>[+] Remote mobile portal pairing initialized.</div>
                        <div style={{ color: '#10b981' }}>[+] WebSocket tunnel handshake: ok.</div>
                        <div style={{ color: '#eab308', marginTop: '0.5rem', fontWeight: 'bold' }}>[!] Awaiting pairing authentication from mobile client...</div>
                        <div style={{ color: 'white', marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px dashed var(--border-color)', width: 'fit-content' }}>
                          <div>[=== KIRA AUTHENTICATION GATEWAY ===]</div>
                          <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginTop: '0.25rem', fontSize: '1rem', textAlign: 'center' }}>
                            Pairing auth PIN: 4892
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Gauges */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          padding: '1.25rem',
                          background: 'rgba(0, 0, 0, 0.2)',
                          borderBottom: '1px solid var(--border-color)',
                          gap: '1rem',
                          flexWrap: 'wrap'
                        }}>
                          {/* CPU Gauge */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                              <svg width="56" height="56" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.3))' }}>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2.5"/>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeDasharray={`${metricsData.cpu}, 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}/>
                              </svg>
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                                {metricsData.cpu}%
                              </div>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CPU LOAD</span>
                          </div>

                          {/* RAM Gauge */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                              <svg width="56" height="56" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.3))' }}>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2.5"/>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeDasharray={`${metricsData.memory}, 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }}/>
                              </svg>
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                                {metricsData.memory}%
                              </div>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>RAM USAGE</span>
                          </div>

                          {/* CORE TEMP Gauge */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                            <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                              <svg width="56" height="56" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 4px rgba(236,72,153,0.3))' }}>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="2.5"/>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-pink)" strokeWidth="2.5" strokeDasharray="47, 100" strokeLinecap="round"/>
                              </svg>
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                                47°C
                              </div>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CORE TEMP</span>
                          </div>
                        </div>

                        {/* Bottom Split panel */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', flexGrow: 1, minHeight: '200px' }} className="console-split-row">
                          {/* Left: Siri Glow feedback */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 0, 0, 0.3)',
                            padding: '1rem',
                            borderRight: '1px solid var(--border-color)',
                            position: 'relative'
                          }}>
                            <div className="cctv-scanner-mesh" style={{ opacity: 0.05 }}></div>
                            {voiceWave ? (
                              <div className="wave-bars" style={{ height: '40px', gap: '4px' }}>
                                <span className="bar" style={{ background: 'var(--accent-cyan)', animationDuration: '0.6s' }}></span>
                                <span className="bar" style={{ background: 'var(--accent-purple)', animationDuration: '0.8s' }}></span>
                                <span className="bar" style={{ background: 'var(--accent-pink)', animationDuration: '0.5s' }}></span>
                              </div>
                            ) : (
                              <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)'
                              }}>
                                <Mic size={14} />
                              </div>
                            )}
                            <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontFamily: 'monospace', fontWeight: 600 }}>
                              {voiceWave ? 'TRANSMITTING' : 'PORTAL ONLINE'}
                            </span>
                          </div>

                          {/* Right: Log stream */}
                          <div style={{ background: 'rgba(0,0,0,0.15)', height: '100%', overflowY: 'auto', padding: '1rem', fontFamily: 'monospace', fontSize: '0.7rem' }}>
                            <div style={{ color: 'var(--accent-cyan)' }}>[+] Remote mobile pairing initialized.</div>
                            <div style={{ color: '#10b981' }}>[+] WebSocket connection: active.</div>
                            {pcActiveFile && <div style={{ color: '#eab308' }}>[+] Launched file editor: {pcActiveFile}</div>}
                            {lockState === 'locked' && <div style={{ color: '#ef4444' }}>[!] Windows screen lock executed.</div>}
                            {guardActive && <div style={{ color: 'var(--accent-pink)' }}>[+] Webcam Guard monitoring active.</div>}
                            {intruderDetected && <div style={{ color: '#ef4444' }}>[!] INTRUDER WARNING POSTED.</div>}
                          </div>
                        </div>
                      </>
                    )}

                  </div>

                </div>

                {/* Right Side: Mock Phone Screen */}
                {!portalAuthenticated ? (
                  <div className="portal-phone-mockup" style={{ margin: '0', flex: '0 0 320px', height: '480px', background: '#03050a', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem', border: '6px solid #202c33', borderRadius: '36px', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                      {/* Logo */}
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00f0ff', letterSpacing: '0.15em', textShadow: '0 0 10px rgba(0, 240, 255, 0.4)', fontFamily: 'var(--font-heading)' }}>
                        K.I.R.A
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b', textAlign: 'center', lineHeight: '1.4', marginBottom: '0.75rem', fontFamily: 'sans-serif' }}>
                        Enter the 4-digit pairing PIN displayed on the PC screen to connect.
                      </div>
                      
                      {/* Pin Input Display */}
                      <div style={{
                        background: 'rgba(6, 10, 20, 0.45)',
                        border: '1px solid rgba(0, 240, 255, 0.15)',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        width: '120px',
                        textAlign: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'white',
                        letterSpacing: '0.5em',
                        fontFamily: 'monospace',
                        marginBottom: '0.75rem'
                      }}>
                        {enteredPin ? enteredPin.padEnd(4, '_') : '____'}
                      </div>

                      {/* Error display */}
                      {pinError && (
                        <div style={{ color: '#ff005b', fontSize: '0.55rem', fontWeight: 'bold', marginBottom: '0.35rem', fontFamily: 'sans-serif' }}>
                          Incorrect PIN. Please try again.
                        </div>
                      )}

                      {/* Keypad Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.5rem',
                        width: '100%',
                        maxWidth: '180px',
                        marginBottom: '0.5rem'
                      }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => pressPinKey(num.toString())}
                            style={{
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid rgba(0, 240, 255, 0.08)',
                              borderRadius: '50%',
                              width: '40px',
                              height: '40px',
                              margin: '0 auto',
                              color: '#e2e8f0',
                              fontSize: '0.9rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              outline: 'none',
                              transition: 'all 0.1s'
                            }}
                          >
                            {num}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => pressPinKey('clear')}
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255, 0, 91, 0.1)',
                            borderRadius: '16px',
                            color: '#ff005b',
                            fontSize: '0.6rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            outline: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '40px'
                          }}
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => pressPinKey('0')}
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(0, 240, 255, 0.08)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            margin: '0 auto',
                            color: '#e2e8f0',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            outline: 'none'
                          }}
                        >
                          0
                        </button>
                        <button
                          type="button"
                          onClick={() => pressPinKey('ok')}
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '16px',
                            color: '#10b981',
                            fontSize: '0.6rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            outline: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '40px'
                          }}
                        >
                          Ok
                        </button>
                      </div>

                      {/* Cancel Pairing button */}
                      <button
                        type="button"
                        onClick={handleDisconnectPortal}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#64748b',
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          marginTop: '0.5rem',
                          textDecoration: 'underline',
                          outline: 'none'
                        }}
                      >
                        Cancel Pairing
                      </button>

                    </div>
                  </div>
                ) : (
                  <div className="portal-phone-mockup" style={{ margin: '0', flex: '0 0 320px', height: '480px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                    {/* Phone Status Bar */}
                    <div className="phone-status-bar">
                      <span>13:43</span>
                      <div className="phone-connection-indicator">
                        <div className="connection-dot-blink"></div>
                        <span>CONNECTED</span>
                      </div>
                    </div>

                    {/* KIRA COMPANION Header with Hamburger menu button */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(12, 19, 26, 0.6)',
                      borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
                      padding: '0.35rem 0.75rem',
                      height: '36px',
                      minHeight: '36px',
                      color: 'white',
                      zIndex: 10
                    }}>
                      <button
                        onClick={() => setPhoneSidebarOpen(!phoneSidebarOpen)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#00f0ff',
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          outline: 'none',
                          padding: 0
                        }}
                      >
                        ☰
                      </button>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '1px' }}>KIRA COMPANION</span>
                      <span style={{ fontSize: '0.55rem', padding: '2px 6px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '4px', color: '#00f0ff', fontWeight: 'bold' }}>SECURE</span>
                    </div>

                    {/* Sidebar Menu Drawer inside the phone */}
                    <div style={{
                      position: 'absolute',
                      top: '60px',
                      left: phoneSidebarOpen ? '0' : '-260px',
                      width: '200px',
                      height: 'calc(100% - 60px)',
                      background: 'rgba(8, 12, 16, 0.98)',
                      backdropFilter: 'blur(10px)',
                      borderRight: '1px solid rgba(0, 240, 255, 0.15)',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem 0.75rem',
                      transition: 'left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      boxShadow: '5px 0 15px rgba(0, 0, 0, 0.5)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 240, 255, 0.15)', paddingBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#00f0ff', fontFamily: 'monospace' }}>KIRA MENU</span>
                        <button onClick={() => setPhoneSidebarOpen(false)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer', outline: 'none' }}>&times;</button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <button
                          onClick={() => { setActivePhoneTab('dashboard'); setPhoneSidebarOpen(false); }}
                          style={{
                            background: activePhoneTab === 'dashboard' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            border: activePhoneTab === 'dashboard' ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
                            color: activePhoneTab === 'dashboard' ? '#00f0ff' : '#64748b',
                            borderRadius: '6px',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>🖥️</span> <span>Dashboard</span>
                        </button>
                        <button
                          onClick={() => { setActivePhoneTab('cctv'); setPhoneSidebarOpen(false); }}
                          style={{
                            background: activePhoneTab === 'cctv' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            border: activePhoneTab === 'cctv' ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
                            color: activePhoneTab === 'cctv' ? '#00f0ff' : '#64748b',
                            borderRadius: '6px',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>📹</span> <span>Camera Feed</span>
                        </button>
                        <button
                          onClick={() => { setActivePhoneTab('explorer'); setPhoneSidebarOpen(false); }}
                          style={{
                            background: activePhoneTab === 'explorer' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            border: activePhoneTab === 'explorer' ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
                            color: activePhoneTab === 'explorer' ? '#00f0ff' : '#64748b',
                            borderRadius: '6px',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>📁</span> <span>File Manager</span>
                        </button>
                        <button
                          onClick={() => { setActivePhoneTab('email'); setPhoneSidebarOpen(false); }}
                          style={{
                            background: activePhoneTab === 'email' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            border: activePhoneTab === 'email' ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
                            color: activePhoneTab === 'email' ? '#00f0ff' : '#64748b',
                            borderRadius: '6px',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>✉️</span> <span>Email Client</span>
                        </button>
                        <button
                          onClick={() => { setActivePhoneTab('agents'); setPhoneSidebarOpen(false); }}
                          style={{
                            background: activePhoneTab === 'agents' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            border: activePhoneTab === 'agents' ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
                            color: activePhoneTab === 'agents' ? '#00f0ff' : '#64748b',
                            borderRadius: '6px',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>🤖</span> <span>KIRA Agents</span>
                        </button>
                        <button
                          onClick={() => { setActivePhoneTab('settings'); setPhoneSidebarOpen(false); }}
                          style={{
                            background: activePhoneTab === 'settings' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                            border: activePhoneTab === 'settings' ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid transparent',
                            color: activePhoneTab === 'settings' ? '#00f0ff' : '#64748b',
                            borderRadius: '6px',
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>⚙️</span> <span>Settings</span>
                        </button>
                      </div>
                    </div>

                    {/* Viewports */}
                    <div className="phone-viewport" style={{ background: '#0b141a', padding: '0.75rem', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Dashboard View */}
                      {activePhoneTab === 'dashboard' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                          
                          {/* Siri ARC Reactor Card */}
                          <div style={{
                            background: 'rgba(6, 10, 20, 0.45)',
                            border: '1px solid rgba(0, 240, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '0.65rem 0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            height: '110px'
                          }}>
                            {/* Waveform graphic overlay */}
                            {voiceWave && (
                              <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: '3px',
                                padding: '0 10px',
                                pointerEvents: 'none',
                                opacity: 0.8
                              }}>
                                <span className="bar" style={{ flexGrow: 1, background: 'var(--accent-cyan)', animationDuration: '0.6s', height: '10px' }}></span>
                                <span className="bar" style={{ flexGrow: 1, background: 'var(--accent-purple)', animationDuration: '0.8s', height: '18px' }}></span>
                                <span className="bar" style={{ flexGrow: 1, background: 'var(--accent-pink)', animationDuration: '0.5s', height: '12px' }}></span>
                                <span className="bar" style={{ flexGrow: 1, background: 'var(--accent-cyan)', animationDuration: '0.7s', height: '15px' }}></span>
                                <span className="bar" style={{ flexGrow: 1, background: 'var(--accent-purple)', animationDuration: '0.6s', height: '22px' }}></span>
                              </div>
                            )}

                            {/* ARC Core */}
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: voiceWave ? 'radial-gradient(circle, #ffffff 15%, #ff005b 75%)' : 'radial-gradient(circle, #ffffff 15%, #00f0ff 75%)',
                              border: voiceWave ? '2px solid #ff005b' : '2px solid #00f0ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              boxShadow: voiceWave ? '0 0 15px rgba(255, 0, 91, 0.6)' : '0 0 15px rgba(0, 240, 255, 0.4)',
                              animation: 'pulse 2s infinite ease-in-out',
                              zIndex: 5
                            }}
                            onClick={() => {
                              showToast('🗣️ KIRA Listening...');
                              speakText('KIRA Mobile companion voice link active. Speak your command, sir.', 'english');
                            }}>
                              <Mic size={16} style={{ color: voiceWave ? '#ff005b' : '#00f0ff' }} />
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.4rem', zIndex: 5 }}>
                              <span style={{ fontSize: '0.55rem', color: voiceWave ? '#ff005b' : '#00f0ff', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                {voiceWave ? 'SPEAKING' : 'STANDBY'}
                              </span>
                              <span style={{ fontSize: '0.45rem', color: '#64748b', fontWeight: 'bold' }}>TAP TO ACTIVATE VOICE COMMAND</span>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                            <div style={{ background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', borderRadius: '8px', padding: '0.35rem 0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                              <span style={{ fontSize: '0.45rem', color: '#64748b', fontWeight: 'bold' }}>CPU</span>
                              <div style={{ position: 'relative', width: '30px', height: '30px' }}>
                                <svg width="30" height="30" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="3.5"/>
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00f0ff" strokeWidth="3.5" strokeDasharray={`${metricsData.cpu}, 100`} />
                                </svg>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 'bold', color: 'white' }}>
                                  {metricsData.cpu}%
                                </div>
                              </div>
                            </div>
                            
                            <div style={{ background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', borderRadius: '8px', padding: '0.35rem 0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                              <span style={{ fontSize: '0.45rem', color: '#64748b', fontWeight: 'bold' }}>RAM</span>
                              <div style={{ position: 'relative', width: '30px', height: '30px' }}>
                                <svg width="30" height="30" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="3.5"/>
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8e2de2" strokeWidth="3.5" strokeDasharray={`${metricsData.memory}, 100`} />
                                </svg>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 'bold', color: 'white' }}>
                                  {metricsData.memory}%
                                </div>
                              </div>
                            </div>

                            <div style={{ background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', borderRadius: '8px', padding: '0.35rem 0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                              <span style={{ fontSize: '0.45rem', color: '#64748b', fontWeight: 'bold' }}>BATTERY</span>
                              <div style={{ position: 'relative', width: '30px', height: '30px' }}>
                                <svg width="30" height="30" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="3.5"/>
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#39ff14" strokeWidth="3.5" strokeDasharray={`${metricsData.battery}, 100`} />
                                </svg>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 'bold', color: 'white' }}>
                                  {metricsData.battery}%
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick PC Controls */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                            <button 
                              className="phone-action-btn"
                              onClick={triggerRemoteLock}
                              style={{ fontSize: '0.6rem', padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', color: 'white' }}
                            >
                              <span>🔒 Lock PC</span>
                            </button>
                            <button 
                              className="phone-action-btn"
                              onClick={triggerScreenshot}
                              style={{ fontSize: '0.6rem', padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', color: 'white' }}
                            >
                              <span>📸 Screenshot</span>
                            </button>
                            <button 
                              onClick={() => changeVolume('up')}
                              className="phone-action-btn"
                              style={{ fontSize: '0.6rem', padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', color: 'white' }}
                            >
                              <span>🔊 Vol Up</span>
                            </button>
                            <button 
                              onClick={() => changeVolume('down')}
                              className="phone-action-btn"
                              style={{ fontSize: '0.6rem', padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', color: 'white' }}
                            >
                              <span>🔉 Vol Down</span>
                            </button>
                          </div>

                          {/* Conversation History */}
                          <div style={{
                            background: 'rgba(6, 10, 20, 0.45)',
                            border: '1px solid rgba(0, 240, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            justifyContent: 'space-between',
                            maxHeight: '140px',
                            overflow: 'hidden'
                          }}>
                            <span style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Conversation History</span>
                            
                            <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.25rem 0', maxHeight: '75px' }}>
                              {mobileChatMessages.map(msg => (
                                <div key={msg.id} style={{
                                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                  background: msg.sender === 'user' ? '#005c4b' : '#202c33',
                                  borderRadius: msg.sender === 'user' ? '6px 6px 0px 6px' : '0px 6px 6px 6px',
                                  padding: '0.3rem',
                                  fontSize: '0.65rem',
                                  maxWidth: '90%',
                                  color: 'white',
                                  fontFamily: 'sans-serif'
                                }}>
                                  <span>{msg.text}</span>
                                </div>
                              ))}
                              {isTypingAgent && (
                                <div style={{ alignSelf: 'flex-start', background: '#202c33', borderRadius: '0px 6px 6px 6px', padding: '0.35rem 0.5rem', display: 'flex', gap: '2px', width: 'fit-content' }}>
                                  <span className="typing-dot" style={{ animationDelay: '0s' }}></span>
                                  <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
                                  <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
                                </div>
                              )}
                            </div>

                            {/* Chat inputs */}
                            <form onSubmit={(e) => { e.preventDefault(); sendAgentMessage(); }} style={{ display: 'flex', gap: '0.2rem' }}>
                              <input 
                                type="text"
                                value={mobileChatText}
                                onChange={(e) => setMobileChatText(e.target.value)}
                                placeholder="Type command..."
                                style={{ flexGrow: 1, background: '#2a3942', border: 'none', borderRadius: '4px', padding: '0.25rem 0.35rem', color: 'white', fontSize: '0.65rem', outline: 'none' }}
                              />
                              <button 
                                type="submit"
                                style={{ background: '#00a884', color: 'white', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                              >
                                Send
                              </button>
                            </form>
                          </div>

                        </div>
                      )}

                      {/* CCTV Tab */}
                      {activePhoneTab === 'cctv' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                          <div className="phone-cctv-container" style={{ marginBottom: '0.5rem', height: '130px' }}>
                            <div className="phone-cctv-radar-line"></div>
                            <div className="cctv-scanner-mesh"></div>
                            
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              backgroundImage: 'radial-gradient(circle, rgba(0, 240, 255, 0.04) 0%, transparent 80%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <div style={{
                                width: '80px',
                                height: '80px',
                                border: '1px dashed rgba(255, 255, 255, 0.08)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                              }}>
                                <div style={{ width: '4px', height: '4px', background: intruderDetected ? '#ef4444' : '#10b981', borderRadius: '50%' }}></div>
                                <div style={{ position: 'absolute', width: '90px', height: '1px', background: 'rgba(255,255,255,0.03)' }}></div>
                                <div style={{ position: 'absolute', width: '1px', height: '90px', background: 'rgba(255,255,255,0.03)' }}></div>
                              </div>
                            </div>
                            
                            <span style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '0.55rem', color: intruderDetected ? '#ef4444' : '#10b981', fontFamily: 'monospace', fontWeight: 'bold' }}>
                              ● {intruderDetected ? 'ALARM ACTIVE' : 'CCTV LIVE'}
                            </span>
                            
                            {!intruderDetected ? (
                              <div className="cctv-face-box">
                                <div className="cctv-face-label">Owner (98%)</div>
                              </div>
                            ) : (
                              <div className="cctv-face-box" style={{ borderColor: '#ef4444', animation: 'none', top: '40px', left: '120px' }}>
                                <div className="cctv-face-label" style={{ background: '#ef4444', color: 'white' }}>INTRUDER (ALERT)</div>
                              </div>
                            )}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button 
                              className={`phone-action-btn ${guardActive ? 'secondary-btn' : ''}`}
                              onClick={toggleGuardMode}
                              style={{ fontSize: '0.7rem', padding: '0.45rem' }}
                            >
                              {guardActive ? '🛡️ Disable Camera Guard' : '🛡️ Enable Camera Guard'}
                            </button>
                          </div>

                          {intruderDetected && (
                            <div className="phone-alert-card" style={{ padding: '0.5rem', marginTop: '0.5rem', display: 'flex', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}>
                              <AlertTriangle size={12} style={{ color: '#ef4444', flexShrink: 0 }} />
                              <div className="phone-alert-text" style={{ fontSize: '0.6rem', color: 'white' }}>
                                <strong>⚠️ INTRUDER WARNING</strong>
                                <div style={{ opacity: 0.8 }}>Intruder face detected. Workstation locked.</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Files Tab */}
                      {activePhoneTab === 'explorer' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>PC Files Explorer</span>
                          <div className="phone-explorer-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', maxHeight: '280px' }}>
                            {explorerFiles.map((file, idx) => (
                              <div className="phone-file-item" key={idx} style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="phone-file-info" style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span className="phone-file-name" style={{ fontSize: '0.65rem', color: 'white', fontWeight: 600 }}>{file.name}</span>
                                  <span className="phone-file-size" style={{ fontSize: '0.5rem', color: '#64748b' }}>{file.size}</span>
                                </div>
                                <div className="phone-file-actions" style={{ display: 'flex', gap: '4px' }}>
                                  <button 
                                    className="phone-file-icon-btn" 
                                    title="Open on PC Screen"
                                    onClick={() => triggerOpenFileOnPC(file.name)}
                                    style={{ padding: '3px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
                                  >
                                    <Eye size={10} />
                                  </button>
                                  <button 
                                    className="phone-file-icon-btn" 
                                    title="AI Summary"
                                    onClick={() => {
                                      showToast(`📄 Summarizing "${file.name}"...`);
                                      const summary = file.name === 'notes_draft.txt' ? 'This text file contains setup pins and reverse tunnel configuration links.' :
                                                      file.name === 'app_settings.json' ? 'This json file configures Kira system parameters like wake words and webcam ports.' :
                                                      file.name === 'kira-installer.exe' ? 'This is the windows installation bundle executable for Kira Desktop.' :
                                                      'This is the security snapshot of the face scanner sensor.';
                                      speakText(summary, 'english');
                                  }}
                                    style={{ padding: '3px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', cursor: 'pointer', color: 'var(--accent-cyan)' }}
                                  >
                                    <FileText size={10} />
                                  </button>
                                  <button 
                                    className="phone-file-icon-btn" 
                                    title="Download"
                                    onClick={() => triggerDownloadFile(idx)}
                                    style={{ padding: '3px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
                                  >
                                    <Download size={10} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Email Tab */}
                      {activePhoneTab === 'email' && (
                        <form onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1 }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>AI Voice Email Dispatcher</span>
                          
                          <input 
                            type="text"
                            placeholder="Subject"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            required
                            style={{ background: '#202c33', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.5rem', color: 'white', fontSize: '0.65rem', outline: 'none' }}
                          />
                          <textarea 
                            placeholder="Email body content..."
                            rows={4}
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            required
                            style={{ background: '#202c33', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.5rem', color: 'white', fontSize: '0.65rem', outline: 'none', resize: 'none', fontFamily: 'sans-serif' }}
                          />
                          
                          <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                            <button 
                              type="button"
                              onClick={generateEmail}
                              disabled={emailLoading}
                              style={{ flex: 1, background: '#7c3aed', color: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', opacity: emailLoading ? 0.6 : 1 }}
                            >
                              {emailLoading ? 'Drafting...' : '⚡ AI Draft'}
                            </button>
                            <button 
                              type="submit"
                              disabled={emailLoading || emailSent}
                              style={{ flex: 1, background: '#00a884', color: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', opacity: (emailLoading || emailSent) ? 0.6 : 1 }}
                            >
                              {emailSent ? 'Sent! ✓' : 'Send Email'}
                            </button>
                          </div>
                        </form>
                      )}

                      {/* KIRA Agents Tab */}
                      {activePhoneTab === 'agents' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: '100%', flexGrow: 1 }}>
                          <div style={{ background: 'rgba(6, 10, 20, 0.45)', border: '1px solid rgba(0, 240, 255, 0.08)', borderRadius: '8px', padding: '0.4rem', fontSize: '0.65rem' }}>
                            <span style={{ color: '#00f0ff', fontWeight: 'bold', display: 'block', marginBottom: '0.2rem' }}>🤖 Agent Framework Status</span>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', color: '#e2e8f0' }}>
                              <div>Vision: <strong style={{ color: '#10b981' }}>ACTIVE</strong></div>
                              <div>Speech: <strong style={{ color: '#10b981' }}>ACTIVE</strong></div>
                              <div>Automation: <strong style={{ color: '#10b981' }}>STANDBY</strong></div>
                              <div>CCTV Lock: <strong style={{ color: '#10b981' }}>ACTIVE</strong></div>
                            </div>
                          </div>

                          <div style={{
                            flexGrow: 1,
                            background: '#020305',
                            border: '1px solid rgba(57, 255, 20, 0.15)',
                            borderRadius: '8px',
                            padding: '0.4rem',
                            fontFamily: 'monospace',
                            fontSize: '0.6rem',
                            color: '#39ff14',
                            maxHeight: '140px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            textShadow: '0 0 2px rgba(57, 255, 20, 0.5)'
                          }}>
                            {agentLogs.map((log, idx) => (
                              <div key={idx} style={{ wordBreak: 'break-all' }}>{log}</div>
                            ))}
                          </div>

                          <form onSubmit={handleSendAgentCommand} style={{ display: 'flex', gap: '0.2rem', height: '26px' }}>
                            <input 
                              type="text"
                              value={agentCmdInput}
                              onChange={(e) => setAgentCmdInput(e.target.value)}
                              placeholder="Type agent command..."
                              style={{ flexGrow: 1, background: '#202c33', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0 0.35rem', color: 'white', fontSize: '0.6rem', outline: 'none' }}
                            />
                            <button 
                              type="submit"
                              style={{ background: '#00f0ff', color: 'black', border: 'none', borderRadius: '4px', padding: '0 0.5rem', fontSize: '0.6rem', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Settings Tab */}
                      {activePhoneTab === 'settings' && (
                        <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1 }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>⚙️ Settings</span>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <label style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 'bold' }}>WhatsApp Phone Number</label>
                            <input 
                              type="text"
                              value={settingsPhone}
                              onChange={(e) => setSettingsPhone(e.target.value)}
                              style={{ background: '#202c33', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.5rem', color: 'white', fontSize: '0.65rem', outline: 'none' }}
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <label style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 'bold' }}>Sender Gmail Address</label>
                            <input 
                              type="email"
                              value={settingsGmail}
                              onChange={(e) => setSettingsGmail(e.target.value)}
                              style={{ background: '#202c33', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.5rem', color: 'white', fontSize: '0.65rem', outline: 'none' }}
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <label style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 'bold' }}>Gmail App Password</label>
                            <input 
                              type="password"
                              value={settingsAppPassword}
                              onChange={(e) => setSettingsAppPassword(e.target.value)}
                              style={{ background: '#202c33', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.5rem', color: 'white', fontSize: '0.65rem', outline: 'none' }}
                            />
                          </div>

                          <button 
                            type="submit"
                            style={{ background: '#00f0ff', color: 'black', border: 'none', borderRadius: '4px', padding: '0.4rem', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.25rem' }}
                          >
                            Save Settings
                          </button>
                        </form>
                      )}

                    </div>

                    {/* Phone Footer Action */}
                    <button 
                      className="phone-action-btn secondary-btn"
                      onClick={handleDisconnectPortal}
                      style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderBottom: 'none', fontSize: '0.7rem', padding: '0.5rem 0' }}
                    >
                      Uncouple Connection
                    </button>

                    {/* Toast overlays inside Phone UI */}
                    {toastMessage && (
                      <div style={{
                        position: 'absolute',
                        bottom: '50px',
                        left: '10px',
                        right: '10px',
                        background: 'rgba(6, 182, 212, 0.95)',
                        color: 'black',
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        padding: '0.35rem',
                        borderRadius: '6px',
                        textAlign: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        zIndex: 2000,
                      }}>
                        {toastMessage}
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {activeTab === 'playground' && (
          <div className="playground-wrapper glass-card">
            <div className="playground-header">
              <div className="playground-file-title">
                <Code size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                <span>plugins/cpu_monitor.py</span>
              </div>
              <div className="playground-actions">
                <button 
                  className="playground-btn run"
                  onClick={handleRunPlayground}
                  disabled={runningPlayground}
                  id="playground-run-btn"
                >
                  <Play size={12} fill="white" style={{ display: 'inline', verticalAlign: 'middle' }} />
                  <span>{runningPlayground ? 'Running...' : 'Run Plugin'}</span>
                </button>
              </div>
            </div>

            <div className="playground-body">
              {/* Code Editor */}
              <div className="code-editor">
                <textarea
                  className="code-textarea"
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  disabled={runningPlayground}
                  spellCheck="false"
                  id="playground-code-editor"
                />
              </div>

              {/* Output Console Log */}
              <div className="output-console">
                <span className="output-title">Console Output</span>
                {isMounted && playgroundOutput.map((log, idx) => (
                  <div key={idx} style={{ color: log.startsWith('[-]') ? '#f87171' : log.startsWith('[!]') ? '#fbbf24' : log.startsWith('✨') ? '#34d399' : '#a7f3d0', marginBottom: '0.25rem' }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

