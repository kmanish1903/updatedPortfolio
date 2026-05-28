import { useState, useEffect, useRef } from 'react';
import { Play, Terminal, Cpu, Database, Server, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { playClick, playHover, playSuccess, playProcessPulse } from '@/lib/audio';

interface PipelineStep {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  icon: string;
}

const initialSteps: PipelineStep[] = [
  { id: 'git', name: 'Code Commit', status: 'idle', icon: '📝' },
  { id: 'build', name: 'Docker Build', status: 'idle', icon: '🐳' },
  { id: 'test', name: 'SonarQube Scan', status: 'idle', icon: '🧪' },
  { id: 'push', name: 'AWS ECR Registry', status: 'idle', icon: '📦' },
  { id: 'deploy', name: 'K8s Deployment', status: 'idle', icon: '🚀' },
];

const mockLogs: Record<string, string[]> = {
  git: [
    'Initializing git tracking...',
    'Fetching commit #b97f02 from branch: main',
    'Verified signature for author: K. Manish <kmanish1903@gmail.com>',
    'Diff analysis completed: 24 files updated, 148 insertions(+), 12 deletions(-)',
    '✔ Git checkout completed successfully!'
  ],
  build: [
    'Spinning up Docker Build engine on node-042...',
    'Step 1/8 : FROM node:18-alpine AS builder',
    ' ---> Pulling Alpine JS base image (100%)',
    'Step 2/8 : WORKDIR /usr/app',
    'Step 3/8 : COPY package*.json ./',
    ' ---> npm ci --only=production (installing dependencies)',
    ' ---> Added 482 packages in 4.38s',
    'Step 4/8 : COPY . .',
    'Step 5/8 : RUN npm run build (Vite compilation)',
    ' ---> Compiled chunks: index-B5W1UZSG.js (1.2MB), index-DVahDccE.css (240KB)',
    ' ---> Docker image tag created: kmanish/portfolio:latest',
    '✔ Container image built successfully!'
  ],
  test: [
    'Launching Jest test runner...',
    'PASS  src/tests/App.test.tsx (8.21s)',
    'PASS  src/tests/DevOpsDashboard.test.tsx (5.14s)',
    'Test Suites: 2 passed, 2 total',
    'Tests:       18 passed, 18 total',
    'Snapshots:   0 total',
    'Time:        13.82s',
    'Initiating SonarQube quality gate analysis...',
    ' ---> Security Vulnerabilities: 0 (A Grade)',
    ' ---> Code Coverage: 92.4%',
    '✔ Test coverage and quality scan PASSED!'
  ],
  push: [
    'Authenticating with AWS ECR CLI...',
    'ECR registry endpoint: 93274acc6bb4.dkr.ecr.ap-south-1.amazonaws.com',
    'Preparing upload chunks...',
    'Pushing layer [b972e276] - Size 42.4 MB (Uploaded 100%)',
    'Pushing layer [f68b31a8] - Size 12.1 MB (Uploaded 100%)',
    'Pushed image: portfolio:latest to ECR AP-SOUTH-1',
    '✔ SHA256 signature verified on registry.'
  ],
  deploy: [
    'Triggering Rolling Update on AWS EKS Kubernetes Cluster...',
    'Deploying resource: deployment/manish-portfolio-deploy',
    'Creating replica pods (3/3 initialized)...',
    'pod/manish-portfolio-67b84db-fx201 - Running (100% healthy)',
    'pod/manish-portfolio-67b84db-v8a19 - Running (100% healthy)',
    'pod/manish-portfolio-67b84db-z0a98 - Running (100% healthy)',
    'Switching Ingress routing to new deployment replica set...',
    'Purging old replica set pods...',
    'Deployment success! App is LIVE at https://kmanish1903.vercel.app/',
    '✔ DevOps Pipeline successfully completed!'
  ]
};

export const DevOpsDashboard = () => {
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>(['$ systemctl status portfolio-pipeline', 'Ready to trigger CI/CD pipeline build.', 'Click the "RUN PIPELINE PIPELINE" button to simulate a live build.']);
  const [cpuUsage, setCpuUsage] = useState<number>(14);
  const [ramUsage, setRamUsage] = useState<string>('1.8 GB / 8.0 GB');
  const [buildDuration, setBuildDuration] = useState<number>(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Dynamic server metrics ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setCpuUsage(Math.floor(Math.random() * 55) + 35); // 35-90% during build
      } else {
        setCpuUsage(Math.floor(Math.random() * 12) + 8); // 8-20% idle
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Scroll to bottom of terminal when logs update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Pipeline simulation controller
  const startPipeline = async () => {
    if (isRunning) return;
    playClick();
    setIsRunning(true);
    setBuildDuration(0);
    setLogs(['$ npm run deploy:pipeline --verbose', 'Initializing CI/CD Pipeline Simulator...']);
    
    // Set all steps to idle
    setSteps(initialSteps.map(step => ({ ...step, status: 'idle' })));
    
    const stepIds = ['git', 'build', 'test', 'push', 'deploy'];
    
    // Animate a timer
    const timerInterval = setInterval(() => {
      setBuildDuration(prev => prev + 1);
    }, 1000);

    for (const stepId of stepIds) {
      setActiveStepId(stepId);
      setSteps(prev => prev.map(step => step.id === stepId ? { ...step, status: 'running' } : step));
      
      // Dynamic process pulse audio
      playProcessPulse(1.5);
      
      // Stream logs line by line
      const currentLogs = mockLogs[stepId];
      for (const line of currentLogs) {
        setLogs(prev => [...prev, `[${stepId.toUpperCase()}] ${line}`]);
        // Simulate printing speed
        await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 150));
      }
      
      setSteps(prev => prev.map(step => step.id === stepId ? { ...step, status: 'success' } : step));
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    clearInterval(timerInterval);
    setIsRunning(false);
    setActiveStepId(null);
    playSuccess();
    setLogs(prev => [...prev, '✔ PIPELINE SUCCEEDED! All pods are active and serving traffic.', 'Website deployed at 200 OK.']);
  };

  return (
    <Card className="glass-card border border-primary/20 shadow-custom relative overflow-hidden w-full max-w-4xl mx-auto backdrop-blur-md">
      {/* HUD scanner laser lines overlay */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent top-0 animate-pulse pointer-events-none" />
      
      <CardContent className="p-6 space-y-6">
        {/* Header with Title & Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2 justify-center sm:justify-start">
              <span className="relative flex h-3.5 w-3.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunning ? 'bg-primary' : 'bg-green-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isRunning ? 'bg-primary' : 'bg-green-500'}`}></span>
              </span>
              DevOps Command Center
            </h3>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">CI/CD Production Deployment Simulator</p>
          </div>
          
          <Button 
            onClick={startPipeline}
            disabled={isRunning}
            onMouseEnter={playHover}
            className="gradient-hero text-white shadow-glow hover:shadow-lg font-semibold flex items-center gap-2 px-6 py-2 border border-primary/30 transition-all duration-300 disabled:opacity-50"
          >
            <Play className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'RUNNING BUILD...' : 'RUN PIPELINE'}
          </Button>
        </div>

        {/* Server System Metrics Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-xl border border-primary/10 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary border border-primary/20">
              <Cpu className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">CPU Utilization</div>
              <div className="text-lg font-mono font-bold text-foreground">{cpuUsage}%</div>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-xl border border-primary/10 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Memory Allocation</div>
              <div className="text-lg font-mono font-bold text-foreground">
                {isRunning ? '4.8 GB / 8.0 GB' : '1.8 GB / 8.0 GB'}
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-primary/10 flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-400 border border-green-500/20">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Build Duration</div>
              <div className="text-lg font-mono font-bold text-foreground">{buildDuration}s</div>
            </div>
          </div>
        </div>

        {/* CI/CD Horizontal Pipeline Progress Track */}
        <div className="glass-card p-5 rounded-xl border border-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
            {/* Connecting neon track line for desktops */}
            <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-border/40 -z-10" />
            
            {steps.map((step, index) => {
              const isStepActive = step.status === 'running';
              const isStepSuccess = step.status === 'success';
              return (
                <div key={step.id} className="flex-1 flex flex-col items-center gap-2 relative w-full text-center group">
                  {/* Pipeline Step Icon Orb with neon drop shadow */}
                  <div 
                    className={`
                      w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all duration-500 z-10
                      ${isStepActive ? 'border-primary bg-primary/20 scale-110 shadow-glow' : ''}
                      ${isStepSuccess ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : ''}
                      ${step.status === 'idle' ? 'border-border/60 bg-card/60' : ''}
                    `}
                  >
                    {isStepSuccess ? '✔' : step.icon}
                  </div>
                  
                  {/* Step Text details */}
                  <div className="space-y-1">
                    <div className={`text-sm font-semibold transition-colors duration-300 ${isStepActive ? 'text-primary' : ''} ${isStepSuccess ? 'text-green-400' : ''}`}>
                      {step.name}
                    </div>
                    <div className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
                      {step.status === 'running' && <span className="text-primary animate-pulse">Processing...</span>}
                      {step.status === 'success' && <span className="text-green-400">PASSED</span>}
                      {step.status === 'idle' && <span className="text-muted-foreground/60">Queued</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Code Terminal Compiler Logger */}
        <div className="rounded-xl overflow-hidden border border-border bg-[#07070a] shadow-inner font-mono text-xs flex flex-col h-[280px]">
          {/* Terminal Title Bar */}
          <div className="bg-[#12121a] px-4 py-2 border-b border-border/40 flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              console.log - kmanish@ops-pipeline
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
          </div>
          
          {/* Terminal log panel stream */}
          <div className="p-4 overflow-y-auto flex-1 space-y-1.5 scrollbar-thin text-left">
            {logs.map((log, index) => {
              let logColor = 'text-muted-foreground';
              if (log.startsWith('$')) logColor = 'text-primary font-bold';
              else if (log.includes('✔')) logColor = 'text-green-400 font-bold';
              else if (log.includes('Failed') || log.includes('error')) logColor = 'text-red-400';
              
              return (
                <div key={index} className={`leading-relaxed border-l border-transparent hover:border-primary/20 pl-2 transition-colors ${logColor}`}>
                  {log}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default DevOpsDashboard;
