import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const TWO_PI = 2 * Math.PI;
const SAMPLES = 2400;

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

// ── Landing ──────────────────────────────────────────────────────────────────
function LandingScreen({ onSelect }) {
  const modes = [
    {
      id:"am", abbr:"AM", label:"Amplitude Modulation",
      desc:["DSB-FC","DSB-SC","SSB","VSB"],
      sub:"Vary carrier amplitude with message signal",
      color:"#22d3ee", glow:"#22d3ee33",
      svgPath:"M10,20 Q17,4 24,20 Q31,36 38,20 Q45,4 52,20 Q59,36 66,20 Q73,4 80,20",
    },
    {
      id:"fm", abbr:"FM", label:"Frequency Modulation",
      desc:["Wideband","Narrowband","β sweep","Carson's Rule"],
      sub:"Vary carrier frequency with message signal",
      color:"#a78bfa", glow:"#a78bfa33",
      svgPath:"M10,20 Q13,18 16,20 Q19,22 22,20 Q24,12 27,20 Q30,28 33,20 Q36,8 40,20 Q44,32 48,20 Q51,14 54,20 Q57,22 60,20 Q63,18 66,20 Q69,22 72,20 Q75,18 78,20 Q81,22 84,20",
    },
    {
      id:"pm", abbr:"PM", label:"Phase Modulation",
      desc:["Phase deviation","kp sweep"],
      sub:"Vary carrier phase with message signal",
      color:"#f472b6", glow:"#f472b633",
      svgPath:"M10,20 Q20,20 28,8 Q32,2 36,20 Q40,38 44,20 Q48,2 52,20 Q56,38 60,20 Q64,8 68,20 Q76,20 86,20",
    },
  ];
  return (
    <div style={{ minHeight:"100vh", background:"#070c18",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      fontFamily:"'Segoe UI',system-ui,sans-serif", padding:"32px 20px",
      backgroundImage:"radial-gradient(ellipse 80% 50% at 50% -10%, #0d1f3c, transparent)" }}>
      <div style={{ textAlign:"center", marginBottom:56 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10,
          background:"rgba(34,211,238,0.06)", border:"1px solid rgba(34,211,238,0.15)",
          borderRadius:24, padding:"7px 20px", marginBottom:24 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
            <path d="M2,12 Q5,4 8,12 Q11,20 14,12 Q17,4 20,12 Q23,20 26,12"/>
          </svg>
          <span style={{ color:"#22d3ee", fontSize:12, fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>
            Signal Modulation Lab
          </span>
        </div>
        <h1 style={{ margin:"0 0 14px", fontSize:"clamp(32px,5vw,56px)", fontWeight:900,
          color:"#e2e8f0", letterSpacing:-1.5, lineHeight:1.1, padding:"4px 0" }}>
          Analog Communications
        </h1>
        <p style={{ color:"#4a5a70", fontSize:15, margin:0 }}>Select a modulation type to begin exploring</p>
      </div>
      <div style={{ display:"flex", gap:24, flexWrap:"wrap", justifyContent:"center", maxWidth:960, width:"100%" }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => onSelect(m.id)} style={{
            flex:"1 1 240px", maxWidth:288, background:"linear-gradient(160deg,#0f1828,#0a1020)",
            border:"1px solid #1a2535", borderRadius:20, padding:0, cursor:"pointer",
            textAlign:"left", outline:"none", overflow:"hidden",
            transition:"transform 0.18s, border-color 0.18s, box-shadow 0.18s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=m.color+"88"; e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow=`0 20px 60px ${m.glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="#1a2535"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
            <div style={{ background:`linear-gradient(180deg,${m.color}12,transparent)`, borderBottom:`1px solid ${m.color}18`, padding:"18px 20px 14px" }}>
              <svg viewBox="0 0 96 40" width="100%" height="44" style={{ display:"block", overflow:"visible" }}>
                <path d={m.svgPath} stroke={m.color} strokeWidth="2.2" fill="none" style={{ filter:`drop-shadow(0 0 4px ${m.color}88)` }}/>
              </svg>
            </div>
            <div style={{ padding:"20px 22px 22px" }}>
              <div style={{ display:"inline-block", background:`${m.color}18`, color:m.color,
                fontSize:10, fontWeight:800, letterSpacing:3, padding:"4px 12px", borderRadius:6,
                marginBottom:14, textTransform:"uppercase", border:`1px solid ${m.color}30` }}>{m.abbr}</div>
              <div style={{ color:"#dde4ee", fontSize:17, fontWeight:700, marginBottom:8 }}>{m.label}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
                {m.desc.map(tag => (
                  <span key={tag} style={{ background:"#0d1624", color:m.color+"cc",
                    fontSize:10, fontFamily:"monospace", fontWeight:600,
                    padding:"3px 9px", borderRadius:5, border:`1px solid ${m.color}22` }}>{tag}</span>
                ))}
              </div>
              <div style={{ color:"#3d5070", fontSize:12 }}>{m.sub}</div>
              <div style={{ marginTop:16, display:"flex", alignItems:"center", gap:6,
                color:m.color, fontSize:12, fontWeight:600, opacity:0.7 }}>
                <span>Explore</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ marginTop:52, color:"#1a2535", fontSize:11, letterSpacing:1 }}>
        Apurba Maity · v8.0 · AM + FM + PM
      </div>
    </div>
  );
}

// ── Signal generators ────────────────────────────────────────────────────────
function generateSignalSample(type, phase, dutyCycle=0.5) {
  const norm = ((phase % TWO_PI) + TWO_PI) % TWO_PI;
  switch (type) {
    case "sine":     return Math.sin(phase);
    case "square":   return norm < TWO_PI * dutyCycle ? 1 : -1;
    case "triangle": return norm < Math.PI ? -1+(2/Math.PI)*norm : 3-(2/Math.PI)*norm;
    case "sawtooth": return -1 + norm / Math.PI;
    case "pulse":    return norm < TWO_PI * dutyCycle ? 1 : -1;
    default:         return Math.sin(phase);
  }
}

function generateNoise(signal, snrDb) {
  const signalPower=signal.reduce((sum,v)=>sum+v*v,0)/signal.length;
  const targetNoisePower=signalPower/Math.pow(10,snrDb/10);
  const noise=[];
  while(noise.length<signal.length){
    const u1=Math.max(Math.random(),Number.EPSILON),u2=Math.random();
    const mag=Math.sqrt(-2*Math.log(u1));
    noise.push(mag*Math.cos(TWO_PI*u2));
    if(noise.length<signal.length)noise.push(mag*Math.sin(TWO_PI*u2));
  }
  const mean=noise.reduce((sum,v)=>sum+v,0)/noise.length;
  const centered=noise.map(v=>v-mean);
  const measuredPower=centered.reduce((sum,v)=>sum+v*v,0)/centered.length;
  const scale=Math.sqrt(targetNoisePower/Math.max(measuredPower,Number.EPSILON));
  return centered.map(v=>v*scale);
}

function movingAverage(values,windowSize) {
  const half=Math.floor(windowSize/2),prefix=new Array(values.length+1).fill(0);
  for(let i=0;i<values.length;i++)prefix[i+1]=prefix[i]+values[i];
  return values.map((_,i)=>{
    const start=Math.max(0,i-half),end=Math.min(values.length,i+half+1);
    return (prefix[end]-prefix[start])/(end-start);
  });
}

function recoverBasebandPhase(received,t,fc,dt) {
  const sampleRate=1/dt;
  const nominalWindow=Math.round(sampleRate/(2*fc));
  const windowSize=Math.max(3,Math.min(101,nominalWindow+(nominalWindow%2===0?1:0)));
  const iMixed=received.map((v,i)=>2*v*Math.cos(TWO_PI*fc*t[i]));
  const qMixed=received.map((v,i)=>-2*v*Math.sin(TWO_PI*fc*t[i]));
  const iBase=movingAverage(movingAverage(iMixed,windowSize),windowSize);
  const qBase=movingAverage(movingAverage(qMixed,windowSize),windowSize);
  const wrapped=iBase.map((v,i)=>Math.atan2(qBase[i],v));
  const unwrapped=new Array(wrapped.length);
  unwrapped[0]=wrapped[0];
  for(let i=1;i<wrapped.length;i++){
    let step=wrapped[i]-wrapped[i-1];
    while(step>Math.PI)step-=TWO_PI;
    while(step<-Math.PI)step+=TWO_PI;
    unwrapped[i]=unwrapped[i-1]+step;
  }
  return unwrapped;
}

// ── AM signal builder ────────────────────────────────────────────────────────
function buildAMSignals(p, timeOffset=0) {
  const {mode,sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,mu1,mu2,phi1,phi2,cycles,dutyCycle,snrDb,noiseOn} = p;
  const T = cycles/fm1;
  const t = Array.from({length:SAMPLES},(_,i)=>timeOffset+(i/(SAMPLES-1))*T);
  const r1=phi1*Math.PI/180, r2=phi2*Math.PI/180;
  const msg = t.map(ti =>
    Am1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle)+
    (tone==="double"?Am2*generateSignalSample(sigType,TWO_PI*fm2*ti+r2,dutyCycle):0)
  );
  const carrier = t.map(ti => Ac*Math.cos(TWO_PI*fc*ti));
  let modulated, envelope;
  if (mode==="dsbfc") {
    envelope = t.map(ti =>
      tone==="single"
        ? Ac*(1+mu1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle))
        : Ac*(1+mu1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle)+mu2*generateSignalSample(sigType,TWO_PI*fm2*ti+r2,dutyCycle))
    );
    modulated = envelope.map((env,i)=>env*Math.cos(TWO_PI*fc*t[i]));
  } else if (mode==="dsbsc") {
    modulated = msg.map((m,i)=>m*Math.cos(TWO_PI*fc*t[i]));
    envelope  = msg.map(v=>Math.abs(v));
  } else if (mode==="ssb") {
    modulated = t.map((ti,i)=>{
      const ip = msg[i]*Math.cos(TWO_PI*fc*ti);
      const qp = Am1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1+Math.PI/2,dutyCycle)*Math.sin(TWO_PI*fc*ti);
      return (ip-qp)/2;
    });
    envelope = modulated.map(v=>Math.abs(v));
  } else {
    modulated = t.map((ti)=>{
      const usb=(Am1/2)*Math.cos(TWO_PI*(fc+fm1)*ti+r1);
      const vsb=(Am1/8)*Math.cos(TWO_PI*(fc-fm1)*ti-r1);
      return usb+vsb;
    });
    envelope = modulated.map(v=>Math.abs(v));
  }
  if (noiseOn) {
    const noise = generateNoise(modulated,snrDb);
    const noisyMod = modulated.map((v,i)=>v+noise[i]);
    let noisyEnv;
    if (mode==="dsbfc") {
      const rect = noisyMod.map(Math.abs);
      noisyEnv = rect.map((v,i)=>{
        const w=[rect[Math.max(0,i-2)],rect[Math.max(0,i-1)],v,rect[Math.min(rect.length-1,i+1)],rect[Math.min(rect.length-1,i+2)]];
        return w.reduce((a,b)=>a+b,0)/w.length;
      });
    } else {
      noisyEnv = noisyMod.map((v,i)=>Math.abs(v*Math.cos(TWO_PI*fc*t[i])));
    }
    const noisyDemod = noisyEnv.map(v=>mode==="dsbfc"?v-Ac:v);
    return {t,msg,carrier,modulated:noisyMod,envelope,demodulated:noisyDemod};
  }
  const demodulated = envelope.map(v=>mode==="dsbfc"?v-Ac:v);
  return {t,msg,carrier,modulated,envelope,demodulated};
}

// ── FM signal builder ────────────────────────────────────────────────────────
function buildFMSignals(p, timeOffset=0) {
  const {sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,beta1,beta2,phi1,phi2,cycles,dutyCycle,snrDb,noiseOn} = p;
  const T = cycles/fm1;
  const t = Array.from({length:SAMPLES},(_,i)=>timeOffset+(i/(SAMPLES-1))*T);
  const r1=phi1*Math.PI/180, r2=phi2*Math.PI/180;
  const dt = T/(SAMPLES-1);

  // message
  const msg = t.map(ti =>
    Am1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle)+
    (tone==="double"?Am2*generateSignalSample(sigType,TWO_PI*fm2*ti+r2,dutyCycle):0)
  );

  // kf = beta * fm  (frequency deviation = kf * Am)
  const kf1 = beta1*fm1;
  const kf2 = tone==="double"?beta2*fm2:0;

  // FM: s(t) = Ac*cos(2π*fc*t + 2π*kf*∫m(τ)dτ)
  // Numerical integration of message
  let phase = 0;
  const modulated = t.map((ti)=>{
    phase += TWO_PI*(fc + kf1*Am1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle)
                       +(tone==="double"?kf2*Am2*generateSignalSample(sigType,TWO_PI*fm2*ti+r2,dutyCycle):0))*dt;
    return Ac*Math.cos(phase);
  });

  const carrier = t.map(ti=>Ac*Math.cos(TWO_PI*fc*ti));
  const envelope = new Array(SAMPLES).fill(Ac); // FM has constant envelope

  let finalMod = modulated;
  if (noiseOn) {
    const noise = generateNoise(modulated,snrDb);
    finalMod = modulated.map((v,i)=>v+noise[i]);
  }

  const recoveredPhase=recoverBasebandPhase(finalMod,t,fc,dt);
  const rawDeviation=recoveredPhase.map((phase,i)=>{
    const prev=recoveredPhase[Math.max(0,i-1)];
    const next=recoveredPhase[Math.min(SAMPLES-1,i+1)];
    const span=i===0||i===SAMPLES-1?dt:2*dt;
    return (next-prev)/(TWO_PI*span);
  });
  const discriminatorWindow=Math.max(3,Math.min(101,Math.round((1/dt)/(2*fc))|1));
  const recoveredDeviation=movingAverage(rawDeviation,discriminatorWindow);
  const recoveredInstFreq=recoveredDeviation.map(v=>fc+v);

  return {t,msg,carrier,modulated:finalMod,envelope,demodulated:recoveredDeviation,instFreq:recoveredInstFreq};
}

// ── PM signal builder ────────────────────────────────────────────────────────
function buildPMSignals(p, timeOffset=0) {
  const {sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,kp,phi1,phi2,cycles,dutyCycle,snrDb,noiseOn} = p;
  const T = cycles/fm1;
  const t = Array.from({length:SAMPLES},(_,i)=>timeOffset+(i/(SAMPLES-1))*T);
  const r1=phi1*Math.PI/180, r2=phi2*Math.PI/180;
  const dt=T/(SAMPLES-1);
  const msg=t.map(ti=>
    Am1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle)+
    (tone==="double"?Am2*generateSignalSample(sigType,TWO_PI*fm2*ti+r2,dutyCycle):0)
  );
  const phaseDeviation=msg.map(m=>kp*m);
  const carrier=t.map(ti=>Ac*Math.cos(TWO_PI*fc*ti));
  const modulated=t.map((ti,i)=>Ac*Math.cos(TWO_PI*fc*ti+phaseDeviation[i]));
  const instFreq=phaseDeviation.map((phase,i)=>{
    const prev=phaseDeviation[Math.max(0,i-1)];
    const next=phaseDeviation[Math.min(SAMPLES-1,i+1)];
    const span=i===0||i===SAMPLES-1?dt:2*dt;
    return fc+(next-prev)/(TWO_PI*span);
  });
  const envelope=new Array(SAMPLES).fill(Ac);
  let finalMod=modulated;
  if(noiseOn){
    const noise=generateNoise(modulated,snrDb);
    finalMod=modulated.map((v,i)=>v+noise[i]);
  }
  const recoveredPhase=recoverBasebandPhase(finalMod,t,fc,dt);
  const demodulated=recoveredPhase.map(phase=>kp===0?0:phase/kp);
  return {t,msg,carrier,modulated:finalMod,envelope,demodulated,instFreq,phaseDeviation:recoveredPhase};
}

// ── AM Spectrum ──────────────────────────────────────────────────────────────
function buildAMSpectrum(p) {
  const {mode,tone,Am1,Am2,Ac,fm1,fm2,fc,mu1,mu2} = p;
  const lines=[];
  if (mode==="dsbfc") {
    lines.push({f:fc,      amp:Ac/2,        label:"Carrier", color:"#22d3ee"});
    lines.push({f:fc+fm1,  amp:(mu1*Ac)/4,  label:tone==="double"?"USB₁":"USB", color:"#f47266"});
    lines.push({f:fc-fm1,  amp:(mu1*Ac)/4,  label:tone==="double"?"LSB₁":"LSB", color:"#22d3ee"});
    if (tone==="double") {
      lines.push({f:fc+fm2,amp:(mu2*Ac)/4,  label:"USB₂",color:"#fbbf24"});
      lines.push({f:fc-fm2,amp:(mu2*Ac)/4,  label:"LSB₂",color:"#a78bfa"});
    }
  } else if (mode==="dsbsc") {
    lines.push({f:fc+fm1,amp:Am1/4,label:tone==="double"?"USB₁":"USB",color:"#f47266"});
    lines.push({f:fc-fm1,amp:Am1/4,label:tone==="double"?"LSB₁":"LSB",color:"#22d3ee"});
    if (tone==="double") {
      lines.push({f:fc+fm2,amp:Am2/4,label:"USB₂",color:"#fbbf24"});
      lines.push({f:fc-fm2,amp:Am2/4,label:"LSB₂",color:"#a78bfa"});
    }
  } else if (mode==="ssb") {
    lines.push({f:fc+fm1,amp:Am1/4,label:"USB",color:"#f47266"});
  } else {
    lines.push({f:fc+fm1,amp:Am1/2,label:"USB",color:"#f47266"});
    lines.push({f:fc-fm1,amp:Am1/8,label:"Vestige",color:"#22d3ee"});
  }
  return lines;
}

// ── FM Spectrum (Carson's Rule + Bessel approximation) ───────────────────────
function buildFMSpectrum(p) {
  const {Am1,Ac,fm1,fc,beta1} = p;
  // Significant Bessel components up to J0..J(ceil(beta+2))
  // Approximate Bessel J_n(beta) via lookup/formula for small n
  const beta = beta1;
  // Use simple Bessel approximation: Jn(x) ≈ (x/2)^n / n!  for small x
  // For larger beta, include up to N = ceil(beta)+3 components
  const N = Math.min(Math.ceil(beta)+3, 8);
  function bessel(n, x) {
    // Numerical approximation via series
    let s=0;
    for(let k=0;k<=10;k++){
      const fk=Array.from({length:k+1},(_,i)=>i+1).reduce((a,b)=>a*b,1);
      const fnk=Array.from({length:n+k+1},(_,i)=>i+1).reduce((a,b)=>a*b,1);
      s+=Math.pow(-1,k)*Math.pow(x/2,2*k+n)/(fk*fnk);
    }
    return s;
  }
  const lines=[];
  // carrier component J0(β)
  lines.push({f:fc, amp:Math.abs(bessel(0,beta))*Ac/2, label:"J₀ (carrier)", color:"#a78bfa"});
  for(let n=1;n<=N;n++){
    const Jn=bessel(n,beta);
    const amp=Math.abs(Jn)*Ac/2;
    if(amp<0.005) continue;
    lines.push({f:fc+n*fm1, amp, label:`J${n} USB`, color:"#f47266"});
    lines.push({f:fc-n*fm1, amp, label:`J${n} LSB`, color:"#22d3ee"});
  }
  return lines;
}

// ── PM Spectrum (numerical complex-envelope Fourier series) ──────────────────
function buildPMSpectrum(p) {
  const {sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,kp,phi1,phi2,cycles,dutyCycle} = p;
  const N=512;
  const T=cycles/fm1;
  const r1=phi1*Math.PI/180,r2=phi2*Math.PI/180;
  const envelope=Array.from({length:N},(_,i)=>{
    const ti=(i/N)*T;
    const m=
      Am1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle)+
      (tone==="double"?Am2*generateSignalSample(sigType,TWO_PI*fm2*ti+r2,dutyCycle):0);
    const phase=kp*m;
    return {re:Math.cos(phase),im:Math.sin(phase)};
  });
  const candidates=[];
  const maxBin=Math.min(80,Math.floor(N/2)-1);
  for(let k=-maxBin;k<=maxBin;k++){
    let re=0,im=0;
    for(let n=0;n<N;n++){
      const a=-TWO_PI*k*n/N;
      re+=envelope[n].re*Math.cos(a)-envelope[n].im*Math.sin(a);
      im+=envelope[n].re*Math.sin(a)+envelope[n].im*Math.cos(a);
    }
    const amp=(Ac/2)*Math.hypot(re,im)/N;
    const offset=k/T;
    if(amp>=0.003&&fc+offset>=0) candidates.push({k,offset,amp});
  }
  const selected=candidates.sort((a,b)=>b.amp-a.amp).slice(0,21).sort((a,b)=>a.offset-b.offset);
  return selected.map(({k,offset,amp})=>({
    f:fc+offset,
    amp,
    label:k===0?"Carrier":`${offset>0?"+":"−"}${Math.abs(offset/1000).toFixed(2)}k`,
    color:k===0?"#f472b6":offset>0?"#f47266":"#22d3ee",
  }));
}

function buildAMMetrics(p) {
  const {mode,tone,Am1,Am2,Ac,fm1,fm2,mu1,mu2} = p;
  let Pt,Pc,eff,bw,muTot;
  if (mode==="dsbfc") {
    Pc=(Ac*Ac)/2; muTot=tone==="single"?mu1:Math.sqrt(mu1**2+mu2**2);
    const Psb=(muTot**2*Pc)/2; Pt=Pc+Psb; eff=(Psb/Pt)*100;
    bw=tone==="single"?2*fm1:2*Math.max(fm1,fm2);
  } else if (mode==="dsbsc") {
    Pc=0; muTot=null; const As=tone==="single"?Am1:Math.sqrt(Am1**2+Am2**2);
    Pt=(As**2)/4; eff=100; bw=tone==="single"?2*fm1:2*Math.max(fm1,fm2);
  } else if (mode==="ssb") {
    Pc=0; muTot=null; Pt=(Am1**2)/8; eff=100; bw=fm1;
  } else {
    Pc=0; muTot=null; Pt=((Am1/2)**2+(Am1/8)**2)/2; eff=100; bw=fm1*1.25;
  }
  return { Pt:Pt.toFixed(4), Pc:Pc.toFixed(4), eff:eff.toFixed(2),
    bw:(bw/1000).toFixed(2)+" kHz", muTot:muTot!==null?muTot.toFixed(3):"—",
    overmod:muTot!==null&&muTot>1 };
}

function buildFMMetrics(p) {
  const {Am1,Ac,fm1,fc,beta1,tone,beta2,fm2} = p;
  const Pc=(Ac**2)/2;
  const Pt=Pc; // FM constant envelope — total power = Ac²/2
  const deltaF1=beta1*fm1;
  const bwCarson=2*(deltaF1+fm1);
  const bwDbl=tone==="double"?2*(Math.max(beta1*fm1,beta2*fm2)+Math.max(fm1,fm2)):null;
  const type=beta1<0.3?"Narrowband (NBFM)":beta1<5?"Wideband (WBFM)":"Wideband (WBFM)";
  return {
    Pt:Pt.toFixed(4), Pc:Pc.toFixed(4), eff:"100.00",
    deltaF:(deltaF1/1000).toFixed(2)+" kHz",
    bw:(bwCarson/1000).toFixed(2)+" kHz",
    bwDbl:bwDbl?(bwDbl/1000).toFixed(2)+" kHz":null,
    beta:beta1.toFixed(2), type,
    snrGain:(3*beta1**2*(beta1+1)).toFixed(2)+" dB",
  };
}

function buildPMMetrics(p) {
  const {sigType,tone,Am1,Am2,Ac,fm1,fm2,kp,phi1,phi2,cycles,dutyCycle} = p;
  const N=1200,T=cycles/fm1,dt=T/(N-1);
  const r1=phi1*Math.PI/180,r2=phi2*Math.PI/180;
  const msg=Array.from({length:N},(_,i)=>{
    const ti=(i/(N-1))*T;
    return Am1*generateSignalSample(sigType,TWO_PI*fm1*ti+r1,dutyCycle)+
      (tone==="double"?Am2*generateSignalSample(sigType,TWO_PI*fm2*ti+r2,dutyCycle):0);
  });
  const peakMessage=Math.max(...msg.map(Math.abs));
  const phaseDeviation=kp*peakMessage;
  const discontinuous=sigType==="square"||sigType==="pulse"||sigType==="sawtooth";
  let deltaF=0;
  if(!discontinuous){
    for(let i=1;i<N-1;i++){
      deltaF=Math.max(deltaF,Math.abs(kp*(msg[i+1]-msg[i-1])/(TWO_PI*2*dt)));
    }
  }
  const maxFm=tone==="double"?Math.max(fm1,fm2):fm1;
  const bw=2*(deltaF+maxFm);
  return {
    Pt:((Ac**2)/2).toFixed(4),
    phaseDeviation:phaseDeviation.toFixed(2)+" rad",
    phaseDegrees:(phaseDeviation*180/Math.PI).toFixed(1)+"°",
    deltaF:discontinuous?"Unbounded":(deltaF/1000).toFixed(2)+" kHz",
    bw:discontinuous?"Unbounded":(bw/1000).toFixed(2)+" kHz",
    kp:kp.toFixed(2)+" rad/V",
    type:phaseDeviation<0.3?"Narrow phase deviation":"Wide phase deviation",
    edgeLimited:discontinuous,
  };
}

// ── Canvas helpers ───────────────────────────────────────────────────────────
function drawPill(ctx,x,y,text,textColor,bgColor,borderColor,font){
  ctx.font=font;
  const tw=ctx.measureText(text).width, pw=tw+18, ph=24;
  ctx.shadowColor=borderColor; ctx.shadowBlur=8;
  ctx.fillStyle=bgColor; ctx.beginPath(); ctx.roundRect(x,y-ph/2,pw,ph,5); ctx.fill();
  ctx.strokeStyle=borderColor; ctx.lineWidth=1.5; ctx.stroke();
  ctx.shadowBlur=0; ctx.fillStyle=textColor; ctx.textAlign="left";
  ctx.fillText(text,x+9,y-ph/2+ph-6);
}

// ── Animated waveform renderer (shared AM+FM+PM) ─────────────────────────────
function AnimatedWaves({params,speed,showEnv,waveConfigs,zoomLevel,panOffset,modType}) {
  const timeRef=useRef(0), rafRef=useRef(null), canvasRefs=useRef([]);
  const paramsRef=useRef(params), speedRef=useRef(speed);
  const zoomRef=useRef(zoomLevel), panRef=useRef(panOffset);
  useEffect(()=>{paramsRef.current=params;},[params]);
  useEffect(()=>{speedRef.current=speed;},[speed]);
  useEffect(()=>{zoomRef.current=zoomLevel;},[zoomLevel]);
  useEffect(()=>{panRef.current=panOffset;},[panOffset]);

  const stablePeaks = useMemo(()=>{
    const s = modType==="fm"
      ? buildFMSignals(params,0)
      : modType==="pm"
        ? buildPMSignals(params,0)
        : buildAMSignals(params,0);
    return {
      msg:         Math.max(...s.msg.map(Math.abs),0.001),
      carrier:     Math.max(...s.carrier.map(Math.abs),0.001),
      modulated:   Math.max(...s.modulated.map(Math.abs),0.001),
      envelope:    Math.max(...s.envelope.map(Math.abs),0.001),
      demodulated: Math.max(...s.demodulated.map(Math.abs),0.001),
      instFreq:    s.instFreq ? Math.max(...s.instFreq.map(Math.abs),0.001) : 0.001,
      phaseDeviation:s.phaseDeviation ? Math.max(...s.phaseDeviation.map(Math.abs),0.001) : 0.001,
    };
  },[
    params.mode,params.tone,params.Am1,params.Am2,params.Ac,
    params.fm1,params.fm2,params.fc,params.mu1,params.mu2,
    params.beta1,params.beta2,
    params.kp,
    params.phi1,params.phi2,params.sigType,params.dutyCycle,
    params.noiseOn,params.snrDb, modType,
  ]);

  useEffect(()=>{
    const drawAll=()=>{
      const s = modType==="fm"
        ? buildFMSignals(paramsRef.current,timeRef.current)
        : modType==="pm"
          ? buildPMSignals(paramsRef.current,timeRef.current)
          : buildAMSignals(paramsRef.current,timeRef.current);
      const sp=speedRef.current, zoom=zoomRef.current, pan=panRef.current;
      canvasRefs.current.forEach((canvas,idx)=>{
        if(!canvas)return;
        const cfg=waveConfigs[idx];
        const ctx=canvas.getContext("2d");
        const W=canvas.width,H=canvas.height;
        ctx.clearRect(0,0,W,H); ctx.fillStyle="#080f1a"; ctx.fillRect(0,0,W,H);
        ctx.strokeStyle="#0f1e2e"; ctx.lineWidth=1;
        for(let i=1;i<5;i++){const y=(i/5)*H;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
        const gridCols=Math.max(10,Math.round(10*zoom));
        for(let i=1;i<gridCols;i++){const x=(i/gridCols)*W;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
        ctx.strokeStyle="#162636"; ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.stroke();
        const data=s[cfg.key];
        const peak=stablePeaks[cfg.key]||Math.max(...data.map(Math.abs),0.001);
        const visFrac=1/zoom, startFr=Math.max(0,Math.min(pan,1-visFrac));
        const startI=Math.floor(startFr*data.length);
        const endI=Math.min(data.length-1,Math.floor(startI+visFrac*data.length));
        const visData=data.slice(startI,endI+1);
        const LABEL_ZONE=34;
        const toX=i=>(i/(visData.length-1))*W;
        const toY=v=>H/2-(v/peak)*(H/2-LABEL_ZONE);
        if(zoom>1){ctx.fillStyle="rgba(0,255,204,0.025)";ctx.fillRect(0,0,W,H);}
        // envelope (AM only)
        if(cfg.showEnv&&s.envelope&&modType==="am"){
          const visEnv=s.envelope.slice(startI,endI+1);
          ctx.strokeStyle="rgba(255,200,40,0.55)";ctx.lineWidth=1.5;ctx.setLineDash([6,5]);
          ctx.beginPath();visEnv.forEach((v,i)=>i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v)));ctx.stroke();
          ctx.beginPath();visEnv.forEach((v,i)=>i===0?ctx.moveTo(toX(i),toY(-Math.abs(v))):ctx.lineTo(toX(i),toY(-Math.abs(v))));ctx.stroke();
          ctx.setLineDash([]);
        }
        ctx.strokeStyle=cfg.color;ctx.lineWidth=zoom>2?2.4:2;
        ctx.shadowColor=cfg.color;ctx.shadowBlur=6;
        ctx.beginPath();visData.forEach((v,i)=>i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v)));
        ctx.stroke();ctx.shadowBlur=0;
        const PFONT="bold 14px 'Courier New',monospace";
        const unit=cfg.unit||"V";
        drawPill(ctx,8,LABEL_ZONE/2,`+${peak.toFixed(4)} ${unit}`,cfg.color,"rgba(2,14,14,0.92)",cfg.color+"99",PFONT);
        drawPill(ctx,8,H-LABEL_ZONE/2,`−${peak.toFixed(4)} ${unit}`,cfg.color,"rgba(2,14,14,0.92)",cfg.color+"99",PFONT);
        // label pill
        const NFONT="bold 13px 'Courier New',monospace";
        ctx.font=NFONT;const nw=ctx.measureText(cfg.label).width+20,nh=26,nx=W-nw-8,ny=6;
        ctx.shadowColor=cfg.color;ctx.shadowBlur=8;
        ctx.fillStyle="rgba(2,14,14,0.92)";ctx.beginPath();ctx.roundRect(nx,ny,nw,nh,5);ctx.fill();
        ctx.strokeStyle=cfg.color+"99";ctx.lineWidth=1.5;ctx.stroke();ctx.shadowBlur=0;
        ctx.fillStyle=cfg.color;ctx.textAlign="left";ctx.fillText(cfg.label,nx+10,ny+nh-7);
        if(zoom>1){
          const zt=zoom.toFixed(1)+"×",ZFONT="bold 13px 'Courier New',monospace";
          ctx.font=ZFONT;const zw=ctx.measureText(zt).width+16,zh=22,zx=W-zw-8,zy=ny+nh+4;
          ctx.fillStyle="rgba(0,255,204,0.12)";ctx.beginPath();ctx.roundRect(zx,zy,zw,zh,4);ctx.fill();
          ctx.strokeStyle="#00ffcc55";ctx.lineWidth=1;ctx.stroke();
          ctx.fillStyle="#22d3ee";ctx.textAlign="left";ctx.fillText(zt,zx+8,zy+zh-5);
        }
        if(sp>0){
          const lt="● LIVE",LFONT="bold 11px monospace";ctx.font=LFONT;
          const lw2=ctx.measureText(lt).width+14,lh=20,lx=W-lw2-8,ly=H-lh-6;
          ctx.fillStyle="rgba(0,255,100,0.12)";ctx.beginPath();ctx.roundRect(lx,ly,lw2,lh,4);ctx.fill();
          ctx.strokeStyle="#00ff8855";ctx.lineWidth=1;ctx.stroke();
          ctx.fillStyle="#4ade80";ctx.textAlign="left";ctx.fillText(lt,lx+7,ly+lh-4);
        }
      });
      if(sp>0) timeRef.current+=sp*0.00003;
      rafRef.current=requestAnimationFrame(drawAll);
    };
    rafRef.current=requestAnimationFrame(drawAll);
    return()=>cancelAnimationFrame(rafRef.current);
  },[waveConfigs,stablePeaks,modType]);

  return(
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {waveConfigs.map((cfg,idx)=>(
        <canvas key={cfg.key+cfg.label} ref={el=>canvasRefs.current[idx]=el}
          width={2400} height={cfg.height||120}
          style={{width:"100%",height:cfg.height||120,display:"block",borderRadius:5,border:"1px solid #0d2828"}}/>
      ))}
    </div>
  );
}

// ── Spectrum Canvas ──────────────────────────────────────────────────────────
function SpecCanvas({lines,accentColor="#22d3ee"}) {
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas||!lines.length)return;
    const ctx=canvas.getContext("2d");
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H); ctx.fillStyle="#080f1a"; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle="#0f1e2e";ctx.lineWidth=1;
    for(let i=1;i<6;i++){const y=(i/6)*H;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    const freqs=lines.map(l=>l.f),maxA=Math.max(...lines.map(l=>l.amp),0.001);
    const fMin=Math.min(...freqs),fMax=Math.max(...freqs);
    const pad=(fMax-fMin)*0.4||2500;
    const fLo=fMin-pad,fHi=fMax+pad;
    const toX=f=>40+((f-fLo)/(fHi-fLo))*(W-80);
    const toY=a=>H-40-(a/maxA)*(H-80);
    ctx.strokeStyle="#162636";ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(0,H-40);ctx.lineTo(W,H-40);ctx.stroke();
    ctx.fillStyle="#2a5555";ctx.font="11px monospace";ctx.textAlign="center";
    for(let i=0;i<=10;i++){
      const f=fLo+i*(fHi-fLo)/10;
      ctx.fillText((f/1000).toFixed(1)+"k",toX(f),H-14);
    }
    lines.forEach(line=>{
      const x=toX(line.f),y=toY(line.amp);
      ctx.strokeStyle=line.color;ctx.lineWidth=4;
      ctx.shadowColor=line.color;ctx.shadowBlur=14;
      ctx.beginPath();ctx.moveTo(x,H-40);ctx.lineTo(x,y);ctx.stroke();
      ctx.shadowBlur=0;
      ctx.fillStyle=line.color;ctx.beginPath();ctx.arc(x,y,6,0,TWO_PI);ctx.fill();
      ctx.font="bold 12px 'Courier New',monospace";ctx.textAlign="center";
      ctx.fillStyle="rgba(0,0,0,0.85)";ctx.fillRect(x-34,y-32,68,20);
      ctx.fillStyle=line.color;ctx.fillText(line.label,x,y-16);
      ctx.fillStyle="#3a8080";ctx.font="11px monospace";
      ctx.fillText("A="+line.amp.toFixed(3),x,y+18);
    });
    ctx.textAlign="left";
  },[lines]);
  return <canvas ref={ref} width={2400} height={260}
    style={{width:"100%",height:260,display:"block",borderRadius:5,border:"1px solid #0d2828"}}/>;
}

// ── Phasor (AM) ──────────────────────────────────────────────────────────────
function PhasorCanvas({params}) {
  const ref=useRef(null),raf=useRef(null),angle=useRef(0);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    const W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-24;
    const {mode,sigType,tone,Am1,Am2,Ac,fm1,fm2,mu1,mu2,phi1,phi2,dutyCycle}=params;
    const r1=phi1*Math.PI/180,r2=phi2*Math.PI/180;
    const drawVector=(length,phase,color,width=3,dashed=false)=>{
      const ex=cx+length*Math.cos(phase),ey=cy-length*Math.sin(phase);
      ctx.strokeStyle=color;ctx.lineWidth=width;ctx.shadowColor=color;ctx.shadowBlur=dashed?0:8;
      if(dashed)ctx.setLineDash([5,5]);
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.setLineDash([]);ctx.shadowBlur=0;
      ctx.fillStyle=color;ctx.beginPath();ctx.arc(ex,ey,4,0,TWO_PI);ctx.fill();
    };
    const draw=()=>{
      angle.current+=0.018;
      const a=angle.current,messagePhase=a/5;
      const q1=generateSignalSample(sigType,messagePhase+r1,dutyCycle);
      const q2=generateSignalSample(sigType,messagePhase*(fm2/fm1)+r2,dutyCycle);
      const msg=Am1*q1+(tone==="double"?Am2*q2:0);
      let iEnv,qEnv=0;
      if(mode==="dsbfc"){
        iEnv=Ac*(1+mu1*q1+(tone==="double"?mu2*q2:0));
      }else if(mode==="dsbsc"){
        iEnv=msg;
      }else if(mode==="ssb"){
        iEnv=msg/2;
        qEnv=Am1*generateSignalSample(sigType,messagePhase+r1+Math.PI/2,dutyCycle)/2;
      }else{
        iEnv=(Am1/2)*Math.cos(messagePhase+r1)+(Am1/8)*Math.cos(messagePhase+r1);
        qEnv=(Am1/2)*Math.sin(messagePhase+r1)-(Am1/8)*Math.sin(messagePhase+r1);
      }
      const maxEnvelope=Math.max(Ac*(1+mu1+(tone==="double"?mu2:0)),Am1+(tone==="double"?Am2:0),0.001);
      const resultantLength=R*0.72*Math.hypot(iEnv,qEnv)/maxEnvelope;
      const resultantPhase=a+Math.atan2(qEnv,iEnv);
      ctx.clearRect(0,0,W,H);ctx.fillStyle="#080f1a";ctx.fillRect(0,0,W,H);
      ctx.strokeStyle="#0d2828";ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(cx,cy,R,0,TWO_PI);ctx.stroke();
      ctx.strokeStyle="#163030";
      ctx.beginPath();ctx.moveTo(cx-R-6,cy);ctx.lineTo(cx+R+6,cy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-R-6);ctx.lineTo(cx,cy+R+6);ctx.stroke();
      if(mode==="dsbfc")drawVector(R*0.72*Ac/maxEnvelope,a,"#475569",1.5,true);
      drawVector(resultantLength,resultantPhase,mode==="vsb"?"#fbbf24":"#22d3ee");
      ctx.font="bold 12px monospace";ctx.fillStyle="#22d3ee";ctx.textAlign="left";
      ctx.fillText(mode==="dsbfc"?"● Carrier + resultant":"● Suppressed-carrier resultant",8,18);
      ctx.fillStyle="#64748b";ctx.font="11px monospace";
      ctx.fillText(`${sigType}${tone==="double"?" · double tone":""}`,8,34);
      raf.current=requestAnimationFrame(draw);
    };
    raf.current=requestAnimationFrame(draw);
    return()=>cancelAnimationFrame(raf.current);
  },[params]);
  return <canvas ref={ref} width={320} height={320}
    style={{width:320,height:320,flexShrink:0,borderRadius:5,border:"1px solid #0d2828"}}/>;
}

// ── FM Phasor ────────────────────────────────────────────────────────────────
function FMPhasorCanvas({params}) {
  const ref=useRef(null),raf=useRef(null),t=useRef(0),phase=useRef(0);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    const W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-28;
    const {sigType,tone,Am1,Am2,fm1,fm2,beta1,beta2,phi1,phi2,dutyCycle}=params;
    const r1=phi1*Math.PI/180,r2=phi2*Math.PI/180;
    const draw=()=>{
      t.current+=0.018;
      const messagePhase=t.current/5;
      const q1=generateSignalSample(sigType,messagePhase+r1,dutyCycle);
      const q2=generateSignalSample(sigType,messagePhase*(fm2/fm1)+r2,dutyCycle);
      phase.current+=0.018+beta1*Am1*q1*0.0036+
        (tone==="double"?beta2*Am2*q2*(fm2/fm1)*0.0036:0);
      const inst_phase=phase.current;
      ctx.clearRect(0,0,W,H);ctx.fillStyle="#080f1a";ctx.fillRect(0,0,W,H);
      // circle
      ctx.strokeStyle="#0d2828";ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(cx,cy,R,0,TWO_PI);ctx.stroke();
      // axes
      ctx.strokeStyle="#163030";ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(cx-R-6,cy);ctx.lineTo(cx+R+6,cy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-R-6);ctx.lineTo(cx,cy+R+6);ctx.stroke();
      // constant-amplitude phasor
      const ex=cx+R*0.75*Math.cos(inst_phase),ey=cy-R*0.75*Math.sin(inst_phase);
      ctx.strokeStyle="#a78bfa";ctx.lineWidth=3;ctx.shadowColor="#a78bfa";ctx.shadowBlur=12;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.fillStyle="#a78bfa";ctx.beginPath();ctx.arc(ex,ey,6,0,TWO_PI);ctx.fill();
      ctx.shadowBlur=0;
      // tip trace
      const traceLen=60;
      if(!draw._trace) draw._trace=[];
      draw._trace.push({x:ex,y:ey});
      if(draw._trace.length>traceLen) draw._trace.shift();
      ctx.strokeStyle="rgba(167,139,250,0.35)";ctx.lineWidth=1.5;ctx.beginPath();
      draw._trace.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
      ctx.stroke();
      // labels
      ctx.font="bold 12px monospace";ctx.fillStyle="#a78bfa";ctx.textAlign="left";
      ctx.fillText("● FM Phasor",8,18);
      ctx.fillStyle="#475569";ctx.font="11px monospace";
      ctx.fillText(`${sigType}${tone==="double"?" · double tone":""}`,8,34);
      ctx.fillText("|A| = const",8,48);
      raf.current=requestAnimationFrame(draw);
    };
    raf.current=requestAnimationFrame(draw);
    return()=>cancelAnimationFrame(raf.current);
  },[params]);
  return <canvas ref={ref} width={320} height={320}
    style={{width:320,height:320,flexShrink:0,borderRadius:5,border:"1px solid #1a0d3a"}}/>;
}

// ── PM Phasor ────────────────────────────────────────────────────────────────
function PMPhasorCanvas({params}) {
  const ref=useRef(null),raf=useRef(null),t=useRef(0);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    const W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,R=Math.min(W,H)/2-28;
    const {sigType,tone,Am1,Am2,fm1,fm2,kp,phi1,phi2,dutyCycle}=params;
    const r1=phi1*Math.PI/180,r2=phi2*Math.PI/180;
    const draw=()=>{
      t.current+=0.018;
      const carrierPhase=t.current;
      const messagePhase=t.current/5;
      const message=
        Am1*generateSignalSample(sigType,messagePhase+r1,dutyCycle)+
        (tone==="double"?Am2*generateSignalSample(sigType,messagePhase*(fm2/fm1)+r2,dutyCycle):0);
      const phaseShift=kp*message;
      const modulatedPhase=carrierPhase+phaseShift;
      ctx.clearRect(0,0,W,H);ctx.fillStyle="#080f1a";ctx.fillRect(0,0,W,H);
      ctx.strokeStyle="#281020";ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(cx,cy,R,0,TWO_PI);ctx.stroke();
      ctx.strokeStyle="#301628";
      ctx.beginPath();ctx.moveTo(cx-R-6,cy);ctx.lineTo(cx+R+6,cy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-R-6);ctx.lineTo(cx,cy+R+6);ctx.stroke();
      const refX=cx+R*0.62*Math.cos(carrierPhase),refY=cy-R*0.62*Math.sin(carrierPhase);
      ctx.strokeStyle="#475569";ctx.lineWidth=1.5;ctx.setLineDash([5,5]);
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(refX,refY);ctx.stroke();ctx.setLineDash([]);
      const ex=cx+R*0.75*Math.cos(modulatedPhase),ey=cy-R*0.75*Math.sin(modulatedPhase);
      ctx.strokeStyle="#f472b6";ctx.lineWidth=3;ctx.shadowColor="#f472b6";ctx.shadowBlur=12;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.fillStyle="#f472b6";ctx.beginPath();ctx.arc(ex,ey,6,0,TWO_PI);ctx.fill();
      ctx.shadowBlur=0;
      if(!draw._trace)draw._trace=[];
      draw._trace.push({x:ex,y:ey});
      if(draw._trace.length>60)draw._trace.shift();
      ctx.strokeStyle="rgba(244,114,182,0.35)";ctx.lineWidth=1.5;ctx.beginPath();
      draw._trace.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));ctx.stroke();
      ctx.font="bold 12px monospace";ctx.fillStyle="#f472b6";ctx.textAlign="left";
      ctx.fillText("● PM Phasor",8,18);
      ctx.fillStyle="#64748b";ctx.font="11px monospace";
      ctx.fillText(`${sigType}${tone==="double"?" · double tone":""}`,8,34);
      ctx.fillText(`Δφ = ${phaseShift.toFixed(2)} rad`,8,48);
      ctx.fillText("|A| = const",8,62);
      raf.current=requestAnimationFrame(draw);
    };
    raf.current=requestAnimationFrame(draw);
    return()=>cancelAnimationFrame(raf.current);
  },[params]);
  return <canvas ref={ref} width={320} height={320}
    style={{width:320,height:320,flexShrink:0,borderRadius:5,border:"1px solid #3a1028"}}/>;
}

// ── Demod theory panels ───────────────────────────────────────────────────────
function AMDemodTheory({mode}) {
  const info={
    dsbfc:{title:"DSB-FC — Envelope Detection",color:"#22d3ee",steps:["Rectify the signal (half or full-wave rectifier)","RC low-pass filter smooths the rectified output envelope","DC block capacitor removes the Ac offset","Output ≈ Ac · μ · m(t)  ✓ No phase reference needed"]},
    dsbsc:{title:"DSB-SC — Synchronous (Coherent) Detection",color:"#22d3ee",steps:["Multiply received s(t) by locally generated cos(2πfc·t)","Low-pass filter removes the 2fc term","Output = m(t)/2 — requires a phase-locked local oscillator","⚠ Envelope detection FAILS due to phase ambiguity"]},
    ssb:  {title:"SSB-USB — Coherent Detection",color:"#f47266",steps:["Multiply by cos(2πfc·t) from a phase-locked oscillator","Low-pass filter extracts the baseband signal","Sensitive to frequency offset / phase errors","Half-power output vs original — but half the bandwidth"]},
    vsb:  {title:"VSB — Coherent + Equalizer Filter",color:"#fbbf24",steps:["Coherent demodulation same as SSB","Vestigial equalizer filter corrects edge rolloff","Used in broadcast TV (NTSC/PAL/ATSC/DVB)","Best compromise: near-SSB bandwidth + DSB robustness"]},
  };
  const d=info[mode];
  return(
    <div style={{background:"#040e0e",border:`1px solid ${d.color}35`,borderRadius:7,padding:16,marginTop:12}}>
      <div style={{color:d.color,fontSize:13,fontWeight:"bold",marginBottom:12,letterSpacing:1}}>{d.title}</div>
      {d.steps.map((s,i)=>(
        <div key={i} style={{display:"flex",gap:12,marginBottom:9,fontSize:12,color:"#6aadad",lineHeight:1.6}}>
          <span style={{color:d.color,flexShrink:0,fontWeight:"bold",minWidth:52}}>Step {i+1}.</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

function FMDemodTheory() {
  const steps=[
    "Limiter — clips amplitude variations (noise), preserving frequency info only",
    "FM Discriminator (Foster-Seeley / ratio detector / PLL) — converts inst. freq deviation → voltage",
    "Low-pass filter — removes high-freq noise components above fm",
    "De-emphasis filter — counteracts pre-emphasis applied at transmitter (τ = 75 µs for broadcast FM)",
    "Output = kd · Δf(t) = kd · kf · m(t) ≈ m(t)  ✓",
  ];
  return(
    <div style={{background:"#08050e",border:"1px solid #a78bfa35",borderRadius:7,padding:16,marginTop:12}}>
      <div style={{color:"#a78bfa",fontSize:13,fontWeight:"bold",marginBottom:12,letterSpacing:1}}>FM Demodulation — Frequency Discriminator</div>
      {steps.map((s,i)=>(
        <div key={i} style={{display:"flex",gap:12,marginBottom:9,fontSize:12,color:"#9a8acd",lineHeight:1.6}}>
          <span style={{color:"#a78bfa",flexShrink:0,fontWeight:"bold",minWidth:52}}>Step {i+1}.</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

function PMDemodTheory() {
  const steps=[
    "Limiter — suppresses amplitude variations before phase recovery",
    "Carrier recovery / PLL — establishes the unmodulated carrier phase reference",
    "Phase detector — produces voltage proportional to Δφ(t) = kp · m(t)",
    "Low-pass filter — removes detector ripple and out-of-band noise",
    "Scale by 1/kp — recovered output m′(t) = Δφ(t)/kp ≈ m(t)",
  ];
  return(
    <div style={{background:"#10050b",border:"1px solid #f472b635",borderRadius:7,padding:16,marginTop:12}}>
      <div style={{color:"#f472b6",fontSize:13,fontWeight:"bold",marginBottom:12,letterSpacing:1}}>PM Demodulation — Coherent Phase Detector / PLL</div>
      {steps.map((s,i)=>(
        <div key={i} style={{display:"flex",gap:12,marginBottom:9,fontSize:12,color:"#bd789e",lineHeight:1.6}}>
          <span style={{color:"#f472b6",flexShrink:0,fontWeight:"bold",minWidth:52}}>Step {i+1}.</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

// ── Signal shape preview ──────────────────────────────────────────────────────
function SignalPreview({type,color,dutyCycle=0.5}) {
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);ctx.fillStyle="#020b0b";ctx.fillRect(0,0,W,H);
    ctx.strokeStyle="#0b2020";ctx.lineWidth=0.5;
    ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.stroke();
    ctx.strokeStyle=color;ctx.lineWidth=2;ctx.shadowColor=color;ctx.shadowBlur=5;
    ctx.beginPath();
    for(let i=0;i<300;i++){
      const phase=(i/300)*TWO_PI*2.5;
      const v=generateSignalSample(type,phase,dutyCycle);
      const x=(i/300)*W,y=H/2-v*(H/2-4);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();ctx.shadowBlur=0;
  },[type,color,dutyCycle]);
  return <canvas ref={ref} width={140} height={44}
    style={{width:140,height:44,borderRadius:4,border:"1px solid #0c2222",display:"block"}}/>;
}

// ── Reusable UI ───────────────────────────────────────────────────────────────
function Slider({label,val,min,max,step,unit,onChange,color="#22d3ee"}) {
  return(
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
        <span style={{color:"#94a3b8",fontSize:11,fontFamily:"monospace"}}>{label}</span>
        <span style={{color,fontSize:12,fontFamily:"monospace",fontWeight:"bold"}}>
          {typeof val==="number"?(val<10?val.toFixed(2):Math.round(val)):val}{unit}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={e=>onChange(parseFloat(e.target.value))}
        style={{width:"100%",accentColor:color,cursor:"pointer",height:4}}/>
    </div>
  );
}

function MCard({label,val,color="#22d3ee",sub}) {
  return(
    <div style={{flex:"1 1 110px",background:"#040e0e",borderRadius:7,border:`1px solid ${color}30`,padding:"11px 14px"}}>
      <div style={{color:"#334155",fontSize:10,fontFamily:"monospace",marginBottom:3}}>{label}</div>
      <div style={{color,fontSize:16,fontFamily:"monospace",fontWeight:"bold"}}>{val}</div>
      {sub&&<div style={{color:"#2a6060",fontSize:10,marginTop:3}}>{sub}</div>}
    </div>
  );
}

const btnStyle=(active,color="#22d3ee")=>({
  padding:"6px 15px",cursor:"pointer",fontSize:11,fontFamily:"monospace",fontWeight:"bold",
  background:active?`${color}20`:"transparent",color:active?color:"#334155",
  border:`1px solid ${active?color+"66":"#0d2828"}`,borderRadius:4,
  transition:"all 0.15s",letterSpacing:0.5,whiteSpace:"nowrap",
});

const SIG_TYPES=[
  {id:"sine",label:"Sine",color:"#22d3ee"},
  {id:"square",label:"Square",color:"#f47266"},
  {id:"triangle",label:"Triangle",color:"#fbbf24"},
  {id:"sawtooth",label:"Sawtooth",color:"#a78bfa"},
  {id:"pulse",label:"Pulse",color:"#22d3ee"},
];

// ══════════════════════════════════════════════════════════════════════════════
// AM TOOLBOX
// ══════════════════════════════════════════════════════════════════════════════
function AMToolbox({onBack}) {
  const isMobile=useIsMobile();
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [mode,setMode]=useState("dsbfc");
  const [tone,setTone]=useState("single");
  const [tab,setTab]=useState("time");
  const [showEnv,setShowEnv]=useState(true);
  const [cycles,setCycles]=useState(4);
  const [animSpeed,setAnimSpeed]=useState(1);
  const [sigType,setSigType]=useState("sine");
  const [dutyCycle,setDutyCycle]=useState(0.5);
  const [zoomLevel,setZoomLevel]=useState(1);
  const [panOffset,setPanOffset]=useState(0);
  const [noiseOn,setNoiseOn]=useState(false);
  const [snrDb,setSnrDb]=useState(20);
  const [Am1,setAm1]=useState(1.0);const [Am2,setAm2]=useState(0.5);
  const [Ac,setAc]=useState(2.0);
  const [fm1,setFm1]=useState(1000);const [fm2,setFm2]=useState(1500);
  const [fc,setFc]=useState(10000);
  const [mu1,setMu1]=useState(0.5);const [mu2,setMu2]=useState(0.3);
  const [phi1,setPhi1]=useState(0);const [phi2,setPhi2]=useState(0);

  const params={mode,sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,mu1,mu2,phi1,phi2,cycles,dutyCycle,snrDb,noiseOn};
  const specLines=useMemo(()=>buildAMSpectrum(params),[mode,tone,Am1,Am2,Ac,fm1,fm2,fc,mu1,mu2]);
  const metrics=useMemo(()=>buildAMMetrics(params),[mode,tone,Am1,Am2,Ac,fm1,fm2,mu1,mu2]);
  const muDisp=mode==="dsbfc"?(tone==="single"?mu1:Math.sqrt(mu1**2+mu2**2)):0;
  const sigColor=SIG_TYPES.find(s=>s.id===sigType)?.color||"#22d3ee";

  const handleZoomIn=useCallback(()=>setZoomLevel(z=>Math.min(z*2,32)),[]);
  const handleZoomOut=useCallback(()=>setZoomLevel(z=>{const n=Math.max(z/2,1);if(n===1)setPanOffset(0);return n;}),[]);
  const handleZoomReset=useCallback(()=>{setZoomLevel(1);setPanOffset(0);},[]);
  const handlePanLeft=useCallback(()=>setPanOffset(p=>Math.max(0,p-0.08/zoomLevel)),[zoomLevel]);
  const handlePanRight=useCallback(()=>setPanOffset(p=>Math.min(1-1/zoomLevel,p+0.08/zoomLevel)),[zoomLevel]);
  const zoomContainerRef=useRef(null);
  useEffect(()=>{
    const el=zoomContainerRef.current;if(!el)return;
    const fn=e=>{e.preventDefault();
      if(e.deltaY<0)setZoomLevel(z=>Math.min(z*1.25,32));
      else setZoomLevel(z=>{const n=Math.max(z/1.25,1);if(n<=1.01)setPanOffset(0);return n;});};
    el.addEventListener("wheel",fn,{passive:false});return()=>el.removeEventListener("wheel",fn);
  },[]);

  const timeWaves=useMemo(()=>[
    {key:"msg",      label:`m(t) — Message [${SIG_TYPES.find(s=>s.id===sigType)?.label}]`,color:sigColor,height:140},
    {key:"carrier",  label:"c(t) — Carrier Wave",color:"#3ab0b0",height:120},
    {key:"modulated",label:"s(t) — Modulated Signal",color:"#22d3ee",height:170,showEnv},
  ],[showEnv,sigType,sigColor]);

  const demodWaves=useMemo(()=>[
    {key:"modulated",  label:"s(t) — Received (Modulated Input)",color:"#22d3ee",height:150,showEnv},
    {key:"envelope",   label:"env(t) — Detected Envelope",color:"#fbbf24",height:120},
    {key:"demodulated",label:"m′(t) — Recovered Message",color:sigColor,height:140},
    {key:"msg",        label:"m(t) — Original Reference",color:sigColor+"55",height:120},
  ],[showEnv,sigColor]);

  const sidebarJSX=(
    <>
      <div style={{marginBottom:14}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>MODULATION MODE</div>
        {[["dsbfc","DSB-FC","full carrier"],["dsbsc","DSB-SC","suppressed"],
          ["ssb","SSB-USB","single side"],["vsb","VSB","vestigial"]].map(([v,abbr,desc])=>(
          <button key={v} onClick={()=>setMode(v)} style={{
            display:"block",width:"100%",marginBottom:5,textAlign:"left",padding:"9px 12px",
            cursor:"pointer",borderRadius:8,background:mode===v?"rgba(34,211,238,0.1)":"transparent",
            border:`1px solid ${mode===v?"#22d3ee55":"#1e2a3a"}`,color:mode===v?"#22d3ee":"#64748b",
            fontSize:12,fontFamily:"monospace",fontWeight:600,transition:"all 0.15s"}}>
            <span style={{fontWeight:800}}>{abbr}</span>
            <span style={{opacity:0.6,marginLeft:8,fontSize:11}}>{desc}</span>
          </button>
        ))}
      </div>
      <div style={{marginBottom:14}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>TONE TYPE</div>
        <div style={{display:"flex",gap:6}}>
          {[["single","Single"],["double","Double"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTone(v)} style={{
              flex:1,padding:"8px 4px",cursor:"pointer",borderRadius:8,
              background:tone===v?"rgba(167,139,250,0.12)":"transparent",
              border:`1px solid ${tone===v?"#a78bfa55":"#1e2a3a"}`,
              color:tone===v?"#a78bfa":"#64748b",fontSize:12,fontWeight:700,fontFamily:"monospace"}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom:14,background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:8,padding:"10px 12px 8px"}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>ANIMATION</div>
        <Slider label="Scroll Speed" val={animSpeed} min={0} max={10} step={0.5} unit="×" onChange={setAnimSpeed} color={animSpeed===0?"#fbbf24":"#4ade80"}/>
        <div style={{fontSize:11,color:animSpeed===0?"#fbbf24":"#4ade80",marginTop:-2,marginBottom:4}}>
          {animSpeed===0?"⏸ Frozen":`▶ Live  ${animSpeed}×`}
        </div>
      </div>
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>CARRIER</div>
        <Slider label="Ac — Amplitude" val={Ac} min={0.5} max={5} step={0.1} unit=" V" onChange={setAc} color="#22d3ee"/>
        <Slider label="fc — Frequency"  val={fc} min={2000} max={50000} step={500} unit=" Hz" onChange={setFc} color="#22d3ee"/>
      </div>
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>MESSAGE 1</div>
        <Slider label="Am₁ — Amplitude" val={Am1} min={0.1} max={5} step={0.1} unit=" V" onChange={setAm1} color="#f47266"/>
        <Slider label="fm₁ — Frequency"  val={fm1} min={100} max={5000} step={50} unit=" Hz" onChange={setFm1} color="#f47266"/>
        {mode==="dsbfc"&&<Slider label="μ₁ — Mod. Index" val={mu1} min={0.01} max={2} step={0.01} unit="" onChange={setMu1} color="#f47266"/>}
        <Slider label="φ₁ — Phase" val={phi1} min={-180} max={180} step={5} unit="°" onChange={setPhi1} color="#f47266"/>
      </div>
      {tone==="double"&&(
        <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
          <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>MESSAGE 2</div>
          <Slider label="Am₂ — Amplitude" val={Am2} min={0.1} max={5} step={0.1} unit=" V" onChange={setAm2} color="#fbbf24"/>
          <Slider label="fm₂ — Frequency"  val={fm2} min={100} max={5000} step={50} unit=" Hz" onChange={setFm2} color="#fbbf24"/>
          {mode==="dsbfc"&&<Slider label="μ₂ — Mod. Index" val={mu2} min={0.01} max={2} step={0.01} unit="" onChange={setMu2} color="#fbbf24"/>}
          <Slider label="φ₂ — Phase" val={phi2} min={-180} max={180} step={5} unit="°" onChange={setPhi2} color="#fbbf24"/>
        </div>
      )}
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>DISPLAY</div>
        <Slider label="Cycles Shown" val={cycles} min={1} max={10} step={1} unit="" onChange={setCycles} color="#a78bfa"/>
        <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",marginTop:8}}>
          <input type="checkbox" checked={showEnv} onChange={e=>setShowEnv(e.target.checked)} style={{accentColor:"#fbbf24"}}/>
          <span style={{color:"#94a3b8",fontSize:12}}>Show envelope trace</span>
        </label>
      </div>
    </>
  );

  return(
    <div style={{minHeight:"100vh",width:"100%",background:"#0b0f1a",color:"#c0dada",
      fontFamily:"'Courier New',monospace",boxSizing:"border-box",overflowX:"hidden"}}>
      <div style={{padding:isMobile?"10px 12px 24px":"16px 28px 40px",width:"100%",boxSizing:"border-box"}}>
        <div style={{marginBottom:20,paddingBottom:12,borderBottom:"1px solid #1e2a3a",
          display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <button onClick={onBack} style={{background:"#131929",border:"1px solid #1e2a3a",borderRadius:8,
              padding:"7px 16px",cursor:"pointer",color:"#64748b",fontSize:13}}>← Back</button>
            <div>
              <h1 style={{margin:0,fontSize:isMobile?16:22,fontWeight:900,
                background:"linear-gradient(135deg,#22d3ee,#a78bfa)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:2}}>
                ◈ AM SIGNAL TOOLBOX
              </h1>
              <div style={{color:"#22d3ee",fontSize:13,fontWeight:"bold",letterSpacing:3,marginTop:2}}>APURBA MAITY</div>
            </div>
          </div>
          {isMobile&&(
            <button onClick={()=>setSidebarOpen(o=>!o)} style={{
              background:sidebarOpen?"rgba(34,211,238,0.12)":"#131929",
              border:`1px solid ${sidebarOpen?"#22d3ee66":"#1e2a3a"}`,
              borderRadius:8,padding:"8px 18px",cursor:"pointer",
              color:sidebarOpen?"#22d3ee":"#64748b",fontSize:13,fontWeight:700}}>
              {sidebarOpen?"✕ Close":"⚙ Controls"}
            </button>
          )}
        </div>
        {isMobile&&sidebarOpen&&(
          <div style={{background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:12,padding:16,marginBottom:16}}>
            {sidebarJSX}
          </div>
        )}
        <div style={{display:"flex",gap:20,alignItems:"flex-start",flexDirection:isMobile?"column":"row"}}>
          {!isMobile&&(
            <div style={{width:264,flexShrink:0,background:"#0f1623",borderRadius:12,border:"1px solid #1e2a3a",
              padding:16,overflowY:"auto",maxHeight:"calc(100vh - 100px)",position:"sticky",top:16,boxSizing:"border-box"}}>
              {sidebarJSX}
            </div>
          )}
          <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:16}}>
            {/* Signal type + Noise */}
            <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"stretch"}}>
              <div style={{background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:12,padding:"14px 18px",flex:"2 1 400px"}}>
                <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:12,fontWeight:"bold"}}>MESSAGE SIGNAL SHAPE</div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
                  {SIG_TYPES.map(({id,label,color})=>(
                    <div key={id} onClick={()=>setSigType(id)} style={{
                      cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                      background:sigType===id?`${color}15`:"transparent",
                      border:`1px solid ${sigType===id?color+"66":"#1e2a3a"}`,
                      borderRadius:10,padding:"10px 12px",transition:"all 0.15s",minWidth:100}}>
                      <SignalPreview type={id} color={color} dutyCycle={dutyCycle}/>
                      <span style={{color:sigType===id?color:"#475569",fontSize:12,fontWeight:"bold",fontFamily:"monospace"}}>{label}</span>
                    </div>
                  ))}
                </div>
                {sigType==="pulse"&&(
                  <div style={{marginTop:12,maxWidth:360}}>
                    <Slider label="Duty Cycle" val={dutyCycle} min={0.05} max={0.95} step={0.05} unit="" onChange={setDutyCycle} color="#22d3ee"/>
                  </div>
                )}
              </div>
              <div style={{background:"#0f1623",border:`1px solid ${noiseOn?"#f4726644":"#1e2a3a"}`,
                borderRadius:12,padding:"14px 18px",flex:"1 1 220px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{color:"#64748b",fontSize:10,letterSpacing:2,fontWeight:"bold"}}>AWGN NOISE</div>
                  <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
                    <input type="checkbox" checked={noiseOn} onChange={e=>setNoiseOn(e.target.checked)} style={{accentColor:"#f47266"}}/>
                    <span style={{color:noiseOn?"#f47266":"#475569",fontSize:11,fontWeight:"bold"}}>{noiseOn?"ENABLED":"OFF"}</span>
                  </label>
                </div>
                {noiseOn&&<>
                  <Slider label="SNR (dB)" val={snrDb} min={0} max={40} step={1} unit=" dB" onChange={setSnrDb} color="#f47266"/>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                    {[0,5,10,20,30,40].map(v=>(
                      <button key={v} onClick={()=>setSnrDb(v)} style={{...btnStyle(snrDb===v,"#f47266"),fontSize:10,padding:"3px 9px"}}>{v}dB</button>
                    ))}
                  </div>
                  <div style={{fontSize:11,fontWeight:"bold",color:snrDb<5?"#f47266":snrDb<15?"#fbbf24":"#4ade80"}}>
                    {snrDb<5?"⚠ Severe":snrDb<10?"⚠ Very noisy":snrDb<20?"△ Moderate":snrDb<30?"◎ Acceptable":"✓ Clean"}
                  </div>
                </>}
                {!noiseOn&&<div style={{color:"#334155",fontSize:12,lineHeight:1.7}}>Enable to inject<br/>Additive White Gaussian Noise</div>}
              </div>
            </div>
            {/* Metrics */}
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <MCard label="Total Power"   val={metrics.Pt+" W"} sub="Pt = Pc + Psb"/>
              <MCard label="Carrier Power" val={metrics.Pc+" W"} color="#22d3ee" sub="Pc = Ac²/2"/>
              <MCard label="Efficiency"    val={metrics.eff+"%"} color={parseFloat(metrics.eff)<50?"#f47266":"#4ade80"} sub="η = Psb / Pt"/>
              <MCard label="Bandwidth"     val={metrics.bw}      color="#fbbf24" sub={mode==="ssb"?"BW = fm":mode==="vsb"?"BW ≈ 1.25·fm":"BW = 2·fm"}/>
              {mode==="dsbfc"&&<MCard label="Mod. Index μ" val={metrics.muTot} color={metrics.overmod?"#f47266":"#a78bfa"} sub={metrics.overmod?"⚠ OVERMOD!":"μ < 1  ✓"}/>}
              <MCard label="Signal Shape"  val={SIG_TYPES.find(s=>s.id===sigType)?.label} color={sigColor} sub={noiseOn?`SNR = ${snrDb} dB`:"No noise"}/>
            </div>
            {mode==="dsbfc"&&metrics.overmod&&(
              <div style={{background:"#1f0a0a",border:"1px solid #f4726655",borderRadius:10,padding:"10px 18px",fontSize:13,color:"#f47266",lineHeight:1.7}}>
                ⚠ <strong>OVERMODULATION</strong> — μ = {metrics.muTot} &gt; 1 &nbsp;
                <span style={{fontSize:11,opacity:0.7}}>Envelope crosses zero → clipped demodulated output</span>
              </div>
            )}
            {/* Tabs */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[["time","⟟ TIME DOMAIN"],["spectrum","⟝ SPECTRUM"],["phasor","⊙ PHASOR"],["demod","⟒ DEMOD LAB"]].map(([v,l])=>(
                <button key={v} onClick={()=>setTab(v)} style={btnStyle(tab===v)}>{l}</button>
              ))}
            </div>
            {tab==="time"&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,flexWrap:"wrap",
                  background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:10,padding:"10px 16px"}}>
                  <span style={{color:"#64748b",fontSize:10,letterSpacing:1,fontWeight:"bold"}}>TIME DOMAIN · THREE SIGNAL VIEW</span>
                  <div style={{flex:1,height:1,background:"#1e2a3a",minWidth:20}}/>
                  <span style={{fontSize:10,color:"#475569"}}>🖱 scroll to zoom</span>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <button onClick={handleZoomOut}  style={{...btnStyle(false),padding:"4px 12px",fontSize:16,lineHeight:1}}>−</button>
                    <div style={{background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:6,padding:"4px 14px",minWidth:60,textAlign:"center",color:"#22d3ee",fontSize:13,fontFamily:"monospace",fontWeight:"bold"}}>{zoomLevel.toFixed(1)}×</div>
                    <button onClick={handleZoomIn}   style={{...btnStyle(false),padding:"4px 12px",fontSize:16,lineHeight:1}}>+</button>
                    <button onClick={handleZoomReset} style={{...btnStyle(zoomLevel===1),padding:"4px 12px",fontSize:10}}>RESET</button>
                  </div>
                  {zoomLevel>1&&(
                    <div style={{display:"flex",gap:4,alignItems:"center"}}>
                      <span style={{color:"#475569",fontSize:10}}>PAN</span>
                      <button onClick={handlePanLeft}  style={{...btnStyle(false),padding:"4px 12px",fontSize:14}}>◀</button>
                      <div style={{background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:4,padding:"4px 10px",minWidth:50,textAlign:"center",color:"#94a3b8",fontSize:10,fontFamily:"monospace"}}>{(panOffset*100).toFixed(0)}%</div>
                      <button onClick={handlePanRight} style={{...btnStyle(false),padding:"4px 12px",fontSize:14}}>▶</button>
                    </div>
                  )}
                  <span style={{fontSize:10,color:animSpeed===0?"#fbbf24":"#4ade80",marginLeft:"auto"}}>{animSpeed===0?"⏸ FROZEN":`▶ ${animSpeed}×`}</span>
                </div>
                <div ref={zoomContainerRef}>
                  <AnimatedWaves params={params} speed={animSpeed} showEnv={showEnv} waveConfigs={timeWaves} zoomLevel={zoomLevel} panOffset={panOffset} modType="am"/>
                </div>
              </div>
            )}
            {tab==="spectrum"&&(
              <div>
                <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:12,fontWeight:"bold"}}>FREQUENCY DOMAIN · SPECTRAL LINE DIAGRAM</div>
                <SpecCanvas lines={specLines}/>
                <div style={{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}}>
                  {specLines.map((l,i)=>(
                    <div key={i} style={{background:"#0f1623",border:`1px solid ${l.color}30`,borderRadius:8,padding:"9px 16px",fontSize:12}}>
                      <span style={{color:l.color,fontWeight:"bold"}}>{l.label}</span>
                      <span style={{color:"#64748b",marginLeft:10}}>{(l.f/1000).toFixed(2)} kHz</span>
                      <span style={{color:"#475569",marginLeft:10}}>A = {l.amp.toFixed(3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab==="phasor"&&(
              <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
                <PhasorCanvas params={params}/>
                <div style={{flex:1,minWidth:260}}>
                  <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:14,fontWeight:"bold"}}>PHASOR REPRESENTATION</div>
                  <div style={{fontSize:13,color:"#94a3b8",lineHeight:2.1}}>
                    {mode==="dsbfc"&&<><div style={{color:"#22d3ee",fontWeight:"bold",marginBottom:6}}>DSB-FC = Carrier + USB + LSB</div><div>s(t) = Ac·cos(2πfc·t)</div><div style={{paddingLeft:20,color:"#f47266"}}>+ (μ·Ac/2)·cos(2π(fc+fm)·t) ← USB</div><div style={{paddingLeft:20,color:"#22d3ee"}}>+ (μ·Ac/2)·cos(2π(fc−fm)·t) ← LSB</div><div style={{marginTop:10,color:muDisp>1?"#f47266":"#a78bfa",fontWeight:"bold"}}>μ = {muDisp.toFixed(3)} {muDisp>1?"⚠ OVERMODULATION":"✓ Normal"}</div></>}
                    {mode==="dsbsc"&&<><div style={{color:"#22d3ee",fontWeight:"bold",marginBottom:6}}>DSB-SC = USB + LSB (no carrier)</div><div>s(t) = m(t)·cos(2πfc·t)</div><div style={{paddingLeft:20,color:"#f47266"}}>(Am/2)·cos(2π(fc+fm)·t) ← USB</div><div style={{paddingLeft:20,color:"#22d3ee"}}>+ (Am/2)·cos(2π(fc−fm)·t) ← LSB</div></>}
                    {mode==="ssb"&&<><div style={{color:"#f47266",fontWeight:"bold",marginBottom:6}}>SSB-USB = Upper Sideband Only</div><div>s(t) = (Am/2)·cos(2π(fc+fm)·t)</div></>}
                    {mode==="vsb"&&<><div style={{color:"#fbbf24",fontWeight:"bold",marginBottom:6}}>VSB = USB + Vestigial LSB</div><div>s(t) = (Am/2)·cos(2π(fc+fm)·t)</div><div style={{paddingLeft:20,color:"#22d3ee"}}>+ (Am/8)·cos(2π(fc−fm)·t) ← Vestige</div></>}
                  </div>
                </div>
              </div>
            )}
            {tab==="demod"&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:10,padding:"10px 16px",flexWrap:"wrap"}}>
                  <span style={{color:"#64748b",fontSize:10,letterSpacing:1,fontWeight:"bold"}}>DEMODULATION LAB · {mode==="dsbfc"?"ENVELOPE DETECTION":mode==="dsbsc"?"SYNCHRONOUS DETECTION":mode==="ssb"?"COHERENT DETECTION":"COHERENT + VSB FILTER"}</span>
                  <div style={{flex:1,height:1,background:"#1e2a3a",minWidth:20}}/>
                </div>
                <AnimatedWaves params={params} speed={animSpeed} showEnv={showEnv} waveConfigs={demodWaves} zoomLevel={1} panOffset={0} modType="am"/>
                <AMDemodTheory mode={mode}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FM TOOLBOX
// ══════════════════════════════════════════════════════════════════════════════
function FMToolbox({onBack}) {
  const isMobile=useIsMobile();
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [tone,setTone]=useState("single");
  const [tab,setTab]=useState("time");
  const [cycles,setCycles]=useState(4);
  const [animSpeed,setAnimSpeed]=useState(1);
  const [sigType,setSigType]=useState("sine");
  const [dutyCycle,setDutyCycle]=useState(0.5);
  const [zoomLevel,setZoomLevel]=useState(1);
  const [panOffset,setPanOffset]=useState(0);
  const [noiseOn,setNoiseOn]=useState(false);
  const [snrDb,setSnrDb]=useState(20);
  const [Am1,setAm1]=useState(1.0);const [Am2,setAm2]=useState(0.5);
  const [Ac,setAc]=useState(2.0);
  const [fm1,setFm1]=useState(1000);const [fm2,setFm2]=useState(1500);
  const [fc,setFc]=useState(10000);
  const [beta1,setBeta1]=useState(2.0);const [beta2,setBeta2]=useState(1.5);
  const [phi1,setPhi1]=useState(0);const [phi2,setPhi2]=useState(0);

  const params={sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,beta1,beta2,phi1,phi2,cycles,dutyCycle,snrDb,noiseOn};
  const specLines=useMemo(()=>buildFMSpectrum(params),[Am1,Ac,fm1,fc,beta1]);
  const metrics=useMemo(()=>buildFMMetrics(params),[Am1,Am2,Ac,fm1,fm2,fc,beta1,beta2,tone]);
  const sigColor=SIG_TYPES.find(s=>s.id===sigType)?.color||"#a78bfa";
  const ACCENT="#a78bfa";

  const handleZoomIn=useCallback(()=>setZoomLevel(z=>Math.min(z*2,32)),[]);
  const handleZoomOut=useCallback(()=>setZoomLevel(z=>{const n=Math.max(z/2,1);if(n===1)setPanOffset(0);return n;}),[]);
  const handleZoomReset=useCallback(()=>{setZoomLevel(1);setPanOffset(0);},[]);
  const handlePanLeft=useCallback(()=>setPanOffset(p=>Math.max(0,p-0.08/zoomLevel)),[zoomLevel]);
  const handlePanRight=useCallback(()=>setPanOffset(p=>Math.min(1-1/zoomLevel,p+0.08/zoomLevel)),[zoomLevel]);
  const zoomContainerRef=useRef(null);
  useEffect(()=>{
    const el=zoomContainerRef.current;if(!el)return;
    const fn=e=>{e.preventDefault();
      if(e.deltaY<0)setZoomLevel(z=>Math.min(z*1.25,32));
      else setZoomLevel(z=>{const n=Math.max(z/1.25,1);if(n<=1.01)setPanOffset(0);return n;});};
    el.addEventListener("wheel",fn,{passive:false});return()=>el.removeEventListener("wheel",fn);
  },[]);

  const timeWaves=useMemo(()=>[
    {key:"msg",      label:`m(t) — Message [${SIG_TYPES.find(s=>s.id===sigType)?.label}]`,color:sigColor,height:140},
    {key:"carrier",  label:"c(t) — Unmodulated Carrier",color:"#5560aa",height:120},
    {key:"modulated",label:"s(t) — FM Modulated Signal",color:ACCENT,height:170},
    {key:"instFreq", label:"fi(t) — Instantaneous Frequency Deviation",color:"#4ade80",height:130},
  ],[sigType,sigColor]);

  const demodWaves=useMemo(()=>[
    {key:"modulated",  label:"s(t) — Received FM Signal",color:ACCENT,height:150},
    {key:"instFreq",   label:"fi(t) — Discriminator Output",color:"#4ade80",height:130},
    {key:"demodulated",label:"m′(t) — Recovered Message",color:sigColor,height:140},
    {key:"msg",        label:"m(t) — Original Reference",color:sigColor+"55",height:120},
  ],[sigColor]);

  const sidebarJSX=(
    <>
      <div style={{marginBottom:14}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>TYPE</div>
        <div style={{background:"#0a0514",border:`1px solid ${ACCENT}30`,borderRadius:8,padding:"10px 12px"}}>
          <div style={{color:ACCENT,fontSize:12,fontWeight:"bold",marginBottom:4}}>
            {beta1<0.3?"Narrowband FM (NBFM)":"Wideband FM (WBFM)"}
          </div>
          <div style={{color:"#64748b",fontSize:11}}>
            {beta1<0.3?"β < 0.3 — used in mobile comms":"β ≥ 0.3 — broadcast, hi-fi audio"}
          </div>
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>TONE TYPE</div>
        <div style={{display:"flex",gap:6}}>
          {[["single","Single"],["double","Double"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTone(v)} style={{
              flex:1,padding:"8px 4px",cursor:"pointer",borderRadius:8,
              background:tone===v?`${ACCENT}18`:"transparent",
              border:`1px solid ${tone===v?ACCENT+"55":"#1e2a3a"}`,
              color:tone===v?ACCENT:"#64748b",fontSize:12,fontWeight:700,fontFamily:"monospace"}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom:14,background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:8,padding:"10px 12px 8px"}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>ANIMATION</div>
        <Slider label="Scroll Speed" val={animSpeed} min={0} max={10} step={0.5} unit="×" onChange={setAnimSpeed} color={animSpeed===0?"#fbbf24":"#4ade80"}/>
        <div style={{fontSize:11,color:animSpeed===0?"#fbbf24":"#4ade80",marginTop:-2,marginBottom:4}}>{animSpeed===0?"⏸ Frozen":`▶ Live  ${animSpeed}×`}</div>
      </div>
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>CARRIER</div>
        <Slider label="Ac — Amplitude" val={Ac} min={0.5} max={5} step={0.1} unit=" V" onChange={setAc} color={ACCENT}/>
        <Slider label="fc — Frequency"  val={fc} min={2000} max={50000} step={500} unit=" Hz" onChange={setFc} color={ACCENT}/>
      </div>
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>MESSAGE 1</div>
        <Slider label="Am₁ — Amplitude" val={Am1} min={0.1} max={5} step={0.1} unit=" V" onChange={setAm1} color="#f47266"/>
        <Slider label="fm₁ — Frequency"  val={fm1} min={100} max={5000} step={50} unit=" Hz" onChange={setFm1} color="#f47266"/>
        <Slider label="β₁ — Mod. Index" val={beta1} min={0.1} max={10} step={0.1} unit="" onChange={setBeta1} color="#f47266"/>
        <Slider label="φ₁ — Phase" val={phi1} min={-180} max={180} step={5} unit="°" onChange={setPhi1} color="#f47266"/>
        <div style={{fontSize:10,color:"#f47266",marginTop:-4,marginBottom:6}}>
          Δf = β·fm = {(beta1*fm1/1000).toFixed(2)} kHz
        </div>
      </div>
      {tone==="double"&&(
        <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
          <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>MESSAGE 2</div>
          <Slider label="Am₂ — Amplitude" val={Am2} min={0.1} max={5} step={0.1} unit=" V" onChange={setAm2} color="#fbbf24"/>
          <Slider label="fm₂ — Frequency"  val={fm2} min={100} max={5000} step={50} unit=" Hz" onChange={setFm2} color="#fbbf24"/>
          <Slider label="β₂ — Mod. Index" val={beta2} min={0.1} max={10} step={0.1} unit="" onChange={setBeta2} color="#fbbf24"/>
          <Slider label="φ₂ — Phase" val={phi2} min={-180} max={180} step={5} unit="°" onChange={setPhi2} color="#fbbf24"/>
          <div style={{fontSize:10,color:"#fbbf24",marginTop:-4,marginBottom:6}}>Δf₂ = {(beta2*fm2/1000).toFixed(2)} kHz</div>
        </div>
      )}
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>DISPLAY</div>
        <Slider label="Cycles Shown" val={cycles} min={1} max={10} step={1} unit="" onChange={setCycles} color={ACCENT}/>
      </div>
    </>
  );

  return(
    <div style={{minHeight:"100vh",width:"100%",background:"#0b0f1a",color:"#c0c0da",
      fontFamily:"'Courier New',monospace",boxSizing:"border-box",overflowX:"hidden"}}>
      <div style={{padding:isMobile?"10px 12px 24px":"16px 28px 40px",width:"100%",boxSizing:"border-box"}}>
        {/* Header */}
        <div style={{marginBottom:20,paddingBottom:12,borderBottom:"1px solid #1e2a3a",
          display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <button onClick={onBack} style={{background:"#131929",border:"1px solid #1e2a3a",borderRadius:8,
              padding:"7px 16px",cursor:"pointer",color:"#64748b",fontSize:13}}>← Back</button>
            <div>
              <h1 style={{margin:0,fontSize:isMobile?16:22,fontWeight:900,
                background:"linear-gradient(135deg,#a78bfa,#f472b6)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:2}}>
                ≋ FM SIGNAL TOOLBOX
              </h1>
              <div style={{color:ACCENT,fontSize:13,fontWeight:"bold",letterSpacing:3,marginTop:2}}>APURBA MAITY</div>
            </div>
          </div>
          {isMobile&&(
            <button onClick={()=>setSidebarOpen(o=>!o)} style={{
              background:sidebarOpen?`${ACCENT}18`:"#131929",
              border:`1px solid ${sidebarOpen?ACCENT+"66":"#1e2a3a"}`,
              borderRadius:8,padding:"8px 18px",cursor:"pointer",
              color:sidebarOpen?ACCENT:"#64748b",fontSize:13,fontWeight:700}}>
              {sidebarOpen?"✕ Close":"⚙ Controls"}
            </button>
          )}
        </div>
        {isMobile&&sidebarOpen&&(
          <div style={{background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:12,padding:16,marginBottom:16}}>
            {sidebarJSX}
          </div>
        )}
        <div style={{display:"flex",gap:20,alignItems:"flex-start",flexDirection:isMobile?"column":"row"}}>
          {!isMobile&&(
            <div style={{width:264,flexShrink:0,background:"#0f1623",borderRadius:12,border:`1px solid #1e2a3a`,
              padding:16,overflowY:"auto",maxHeight:"calc(100vh - 100px)",position:"sticky",top:16,boxSizing:"border-box"}}>
              {sidebarJSX}
            </div>
          )}
          <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:16}}>
            {/* Signal type + noise */}
            <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"stretch"}}>
              <div style={{background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:12,padding:"14px 18px",flex:"2 1 400px"}}>
                <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:12,fontWeight:"bold"}}>MESSAGE SIGNAL SHAPE</div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
                  {SIG_TYPES.map(({id,label,color})=>(
                    <div key={id} onClick={()=>setSigType(id)} style={{
                      cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                      background:sigType===id?`${color}15`:"transparent",
                      border:`1px solid ${sigType===id?color+"66":"#1e2a3a"}`,
                      borderRadius:10,padding:"10px 12px",transition:"all 0.15s",minWidth:100}}>
                      <SignalPreview type={id} color={color} dutyCycle={dutyCycle}/>
                      <span style={{color:sigType===id?color:"#475569",fontSize:12,fontWeight:"bold",fontFamily:"monospace"}}>{label}</span>
                    </div>
                  ))}
                </div>
                {sigType==="pulse"&&(
                  <div style={{marginTop:12,maxWidth:360}}>
                    <Slider label="Duty Cycle" val={dutyCycle} min={0.05} max={0.95} step={0.05} unit="" onChange={setDutyCycle} color={ACCENT}/>
                  </div>
                )}
              </div>
              <div style={{background:"#0f1623",border:`1px solid ${noiseOn?"#f4726644":"#1e2a3a"}`,
                borderRadius:12,padding:"14px 18px",flex:"1 1 220px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{color:"#64748b",fontSize:10,letterSpacing:2,fontWeight:"bold"}}>AWGN NOISE</div>
                  <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
                    <input type="checkbox" checked={noiseOn} onChange={e=>setNoiseOn(e.target.checked)} style={{accentColor:"#f47266"}}/>
                    <span style={{color:noiseOn?"#f47266":"#475569",fontSize:11,fontWeight:"bold"}}>{noiseOn?"ENABLED":"OFF"}</span>
                  </label>
                </div>
                {noiseOn&&<>
                  <Slider label="SNR (dB)" val={snrDb} min={0} max={40} step={1} unit=" dB" onChange={setSnrDb} color="#f47266"/>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                    {[0,5,10,20,30,40].map(v=>(
                      <button key={v} onClick={()=>setSnrDb(v)} style={{...btnStyle(snrDb===v,"#f47266"),fontSize:10,padding:"3px 9px"}}>{v}dB</button>
                    ))}
                  </div>
                  <div style={{fontSize:11,fontWeight:"bold",color:snrDb<5?"#f47266":snrDb<15?"#fbbf24":"#4ade80"}}>
                    {snrDb<5?"⚠ Severe":snrDb<10?"⚠ Very noisy":snrDb<20?"△ Moderate":snrDb<30?"◎ Acceptable":"✓ Clean"}
                  </div>
                  <div style={{marginTop:8,fontSize:11,color:"#a78bfa"}}>FM captures SNR improvement: FM gain ≈ 3β²(β+1) dB</div>
                </>}
                {!noiseOn&&<div style={{color:"#334155",fontSize:12,lineHeight:1.7}}>FM has natural noise immunity via<br/>the capture effect</div>}
              </div>
            </div>

            {/* FM Metrics */}
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <MCard label="Total Power"   val={metrics.Pt+" W"}   color={ACCENT} sub="Pt = Ac²/2 (constant)"/>
              <MCard label="Freq Deviation" val={metrics.deltaF}   color="#f47266" sub="Δf = β × fm"/>
              <MCard label="Carson BW"     val={metrics.bw}        color="#fbbf24" sub="BW = 2(Δf + fm)"/>
              <MCard label="Mod. Index β"  val={metrics.beta}      color={ACCENT}  sub={metrics.type}/>
              <MCard label="SNR Gain"      val={metrics.snrGain}   color="#4ade80" sub="3β²(β+1) over AM"/>
              <MCard label="Efficiency"    val="100%"              color="#4ade80" sub="Constant envelope"/>
            </div>

            {/* FM theory inline box */}
            <div style={{background:"#0b0514",border:`1px solid ${ACCENT}25`,borderRadius:10,padding:"12px 18px",fontSize:12,color:"#8875bb",lineHeight:1.9}}>
              <strong style={{color:ACCENT}}>FM Signal: </strong>
              s(t) = Ac · cos(2πfc·t + β·sin(2πfm·t))
              &nbsp;&nbsp;&nbsp;
              <strong style={{color:ACCENT}}>inst. freq: </strong>
              fi(t) = fc + Δf·cos(2πfm·t)
              &nbsp;&nbsp;&nbsp;
              <strong style={{color:beta1<0.3?"#fbbf24":"#4ade80"}}>
                {beta1<0.3?"NBFM — BW ≈ 2·fm":"WBFM — Carson's rule applies"}
              </strong>
            </div>

            {/* Tabs */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[["time","⟟ TIME DOMAIN"],["spectrum","⟝ SPECTRUM"],["phasor","⊙ PHASOR"],["demod","⟒ DEMOD LAB"]].map(([v,l])=>(
                <button key={v} onClick={()=>setTab(v)} style={btnStyle(tab===v,ACCENT)}>{l}</button>
              ))}
            </div>

            {tab==="time"&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,flexWrap:"wrap",
                  background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:10,padding:"10px 16px"}}>
                  <span style={{color:"#64748b",fontSize:10,letterSpacing:1,fontWeight:"bold"}}>TIME DOMAIN · FOUR SIGNAL VIEW (msg, carrier, FM, fi)</span>
                  <div style={{flex:1,height:1,background:"#1e2a3a",minWidth:20}}/>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <button onClick={handleZoomOut}  style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:16,lineHeight:1}}>−</button>
                    <div style={{background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:6,padding:"4px 14px",minWidth:60,textAlign:"center",color:ACCENT,fontSize:13,fontFamily:"monospace",fontWeight:"bold"}}>{zoomLevel.toFixed(1)}×</div>
                    <button onClick={handleZoomIn}   style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:16,lineHeight:1}}>+</button>
                    <button onClick={handleZoomReset} style={{...btnStyle(zoomLevel===1,ACCENT),padding:"4px 12px",fontSize:10}}>RESET</button>
                  </div>
                  {zoomLevel>1&&(
                    <div style={{display:"flex",gap:4,alignItems:"center"}}>
                      <span style={{color:"#475569",fontSize:10}}>PAN</span>
                      <button onClick={handlePanLeft}  style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:14}}>◀</button>
                      <div style={{background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:4,padding:"4px 10px",minWidth:50,textAlign:"center",color:"#94a3b8",fontSize:10,fontFamily:"monospace"}}>{(panOffset*100).toFixed(0)}%</div>
                      <button onClick={handlePanRight} style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:14}}>▶</button>
                    </div>
                  )}
                </div>
                <div ref={zoomContainerRef}>
                  <AnimatedWaves params={params} speed={animSpeed} showEnv={false} waveConfigs={timeWaves} zoomLevel={zoomLevel} panOffset={panOffset} modType="fm"/>
                </div>
              </div>
            )}

            {tab==="spectrum"&&(
              <div>
                <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:12,fontWeight:"bold"}}>FREQUENCY DOMAIN · BESSEL FUNCTION SPECTRUM</div>
                <SpecCanvas lines={specLines} accentColor={ACCENT}/>
                <div style={{marginTop:12,background:"#0b0514",border:`1px solid ${ACCENT}25`,borderRadius:10,padding:"12px 18px",fontSize:12,color:"#7a6aaa",lineHeight:1.9}}>
                  <div><strong style={{color:ACCENT}}>Bessel spectrum: </strong>S(f) = Ac/2 · Σ Jₙ(β) · δ(f − fc − n·fm)</div>
                  <div style={{marginTop:6}}><strong style={{color:"#fbbf24"}}>Carson's rule: </strong>BW = 2(Δf + fm) = 2(β+1)·fm = <strong>{metrics.bw}</strong></div>
                  <div style={{marginTop:6}}>Δf = β·fm = {(beta1*fm1/1000).toFixed(2)} kHz &nbsp;|&nbsp; β = {beta1.toFixed(2)} &nbsp;|&nbsp; {metrics.type}</div>
                </div>
                <div style={{marginTop:10,display:"flex",gap:8,flexWrap:"wrap"}}>
                  {specLines.slice(0,8).map((l,i)=>(
                    <div key={i} style={{background:"#0f1623",border:`1px solid ${l.color}30`,borderRadius:8,padding:"7px 12px",fontSize:11}}>
                      <span style={{color:l.color,fontWeight:"bold"}}>{l.label}</span>
                      <span style={{color:"#64748b",marginLeft:8}}>{(l.f/1000).toFixed(2)} kHz</span>
                      <span style={{color:"#475569",marginLeft:8}}>A={l.amp.toFixed(3)}</span>
                    </div>
                  ))}
                  {specLines.length>8&&<div style={{color:"#475569",fontSize:11,padding:"7px 12px"}}>+{specLines.length-8} more lines</div>}
                </div>
              </div>
            )}

            {tab==="phasor"&&(
              <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
                <FMPhasorCanvas params={params}/>
                <div style={{flex:1,minWidth:260}}>
                  <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:14,fontWeight:"bold"}}>FM PHASOR — KEY PROPERTY</div>
                  <div style={{fontSize:13,color:"#9a8acd",lineHeight:2.1}}>
                    <div style={{color:ACCENT,fontWeight:"bold",marginBottom:8}}>FM has CONSTANT amplitude — only phase/frequency varies</div>
                    <div>s(t) = Ac · cos(φ(t))</div>
                    <div style={{paddingLeft:20,color:"#f47266"}}>φ(t) = 2πfc·t + β·sin(2πfm·t)</div>
                    <div style={{marginTop:10,color:"#fbbf24"}}>|s(t)| = Ac (constant)  ← unlike AM</div>
                    <div style={{marginTop:10,color:"#4ade80"}}>This enables limiter circuits to remove amplitude noise before demodulation</div>
                  </div>
                  <div style={{marginTop:16,background:"#0b0514",border:`1px solid ${ACCENT}25`,borderRadius:10,padding:14}}>
                    <div style={{color:"#64748b",fontSize:10,letterSpacing:1,marginBottom:8,fontWeight:"bold"}}>BANDWIDTH TRADE-OFF</div>
                    <div style={{fontSize:12,color:"#7a6aaa",lineHeight:1.8}}>
                      <div>β = {beta1.toFixed(2)} → {metrics.type}</div>
                      <div>Carson BW = {metrics.bw}</div>
                      <div style={{color:"#4ade80"}}>Theoretical SNR gain = {metrics.snrGain}</div>
                      <div style={{color:"#fbbf24",marginTop:4}}>Trade-off: larger β → better SNR but wider BW</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab==="demod"&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,
                  background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:10,padding:"10px 16px",flexWrap:"wrap"}}>
                  <span style={{color:"#64748b",fontSize:10,letterSpacing:1,fontWeight:"bold"}}>FM DEMODULATION LAB · FREQUENCY DISCRIMINATOR</span>
                  <div style={{flex:1,height:1,background:"#1e2a3a",minWidth:20}}/>
                </div>
                <AnimatedWaves params={params} speed={animSpeed} showEnv={false} waveConfigs={demodWaves} zoomLevel={1} panOffset={0} modType="fm"/>
                <FMDemodTheory/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PM TOOLBOX
// ══════════════════════════════════════════════════════════════════════════════
function PMToolbox({onBack}) {
  const isMobile=useIsMobile();
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [tone,setTone]=useState("single");
  const [tab,setTab]=useState("time");
  const [cycles,setCycles]=useState(4);
  const [animSpeed,setAnimSpeed]=useState(1);
  const [sigType,setSigType]=useState("sine");
  const [dutyCycle,setDutyCycle]=useState(0.5);
  const [zoomLevel,setZoomLevel]=useState(1);
  const [panOffset,setPanOffset]=useState(0);
  const [noiseOn,setNoiseOn]=useState(false);
  const [snrDb,setSnrDb]=useState(20);
  const [Am1,setAm1]=useState(1.0);const [Am2,setAm2]=useState(0.5);
  const [Ac,setAc]=useState(2.0);
  const [fm1,setFm1]=useState(1000);const [fm2,setFm2]=useState(1500);
  const [fc,setFc]=useState(10000);
  const [kp,setKp]=useState(2.0);
  const [phi1,setPhi1]=useState(0);const [phi2,setPhi2]=useState(0);

  const params={sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,kp,phi1,phi2,cycles,dutyCycle,snrDb,noiseOn};
  const specLines=useMemo(()=>buildPMSpectrum(params),[sigType,tone,Am1,Am2,Ac,fm1,fm2,fc,kp,phi1,phi2,cycles,dutyCycle]);
  const metrics=useMemo(()=>buildPMMetrics(params),[sigType,tone,Am1,Am2,Ac,fm1,fm2,kp,phi1,phi2,cycles,dutyCycle]);
  const sigColor=SIG_TYPES.find(s=>s.id===sigType)?.color||"#f472b6";
  const ACCENT="#f472b6";

  const handleZoomIn=useCallback(()=>setZoomLevel(z=>Math.min(z*2,32)),[]);
  const handleZoomOut=useCallback(()=>setZoomLevel(z=>{const n=Math.max(z/2,1);if(n===1)setPanOffset(0);return n;}),[]);
  const handleZoomReset=useCallback(()=>{setZoomLevel(1);setPanOffset(0);},[]);
  const handlePanLeft=useCallback(()=>setPanOffset(p=>Math.max(0,p-0.08/zoomLevel)),[zoomLevel]);
  const handlePanRight=useCallback(()=>setPanOffset(p=>Math.min(1-1/zoomLevel,p+0.08/zoomLevel)),[zoomLevel]);
  const zoomContainerRef=useRef(null);
  useEffect(()=>{
    const el=zoomContainerRef.current;if(!el)return;
    const fn=e=>{e.preventDefault();
      if(e.deltaY<0)setZoomLevel(z=>Math.min(z*1.25,32));
      else setZoomLevel(z=>{const n=Math.max(z/1.25,1);if(n<=1.01)setPanOffset(0);return n;});};
    el.addEventListener("wheel",fn,{passive:false});return()=>el.removeEventListener("wheel",fn);
  },[]);

  const timeWaves=useMemo(()=>[
    {key:"msg",label:`m(t) — Message [${SIG_TYPES.find(s=>s.id===sigType)?.label}]`,color:sigColor,height:140},
    {key:"carrier",label:"c(t) — Unmodulated Carrier",color:"#8a456c",height:120},
    {key:"modulated",label:"s(t) — PM Modulated Signal",color:ACCENT,height:170},
    {key:"phaseDeviation",label:"Δφ(t) — Phase Deviation (rad)",color:"#fbbf24",height:130,unit:"rad"},
    {key:"instFreq",label:"fi(t) — Instantaneous Frequency",color:"#4ade80",height:130,unit:"Hz"},
  ],[sigType,sigColor]);
  const demodWaves=useMemo(()=>[
    {key:"modulated",label:"s(t) — Received PM Signal",color:ACCENT,height:150},
    {key:"phaseDeviation",label:"Δφ(t) — Phase Detector Output",color:"#fbbf24",height:130,unit:"rad"},
    {key:"demodulated",label:"m′(t) — Recovered Message",color:sigColor,height:140},
    {key:"msg",label:"m(t) — Original Reference",color:sigColor+"55",height:120},
  ],[sigColor]);

  const sidebarJSX=(
    <>
      <div style={{marginBottom:14}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>TYPE</div>
        <div style={{background:"#14050d",border:`1px solid ${ACCENT}30`,borderRadius:8,padding:"10px 12px"}}>
          <div style={{color:ACCENT,fontSize:12,fontWeight:"bold",marginBottom:4}}>{metrics.type}</div>
          <div style={{color:"#64748b",fontSize:11}}>Peak Δφ = {metrics.phaseDeviation}</div>
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>TONE TYPE</div>
        <div style={{display:"flex",gap:6}}>
          {[["single","Single"],["double","Double"]].map(([v,l])=>(
            <button key={v} onClick={()=>setTone(v)} style={{
              flex:1,padding:"8px 4px",cursor:"pointer",borderRadius:8,
              background:tone===v?`${ACCENT}18`:"transparent",
              border:`1px solid ${tone===v?ACCENT+"55":"#1e2a3a"}`,
              color:tone===v?ACCENT:"#64748b",fontSize:12,fontWeight:700,fontFamily:"monospace"}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom:14,background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:8,padding:"10px 12px 8px"}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>ANIMATION</div>
        <Slider label="Scroll Speed" val={animSpeed} min={0} max={10} step={0.5} unit="×" onChange={setAnimSpeed} color={animSpeed===0?"#fbbf24":"#4ade80"}/>
        <div style={{fontSize:11,color:animSpeed===0?"#fbbf24":"#4ade80",marginTop:-2,marginBottom:4}}>{animSpeed===0?"⏸ Frozen":`▶ Live  ${animSpeed}×`}</div>
      </div>
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>CARRIER</div>
        <Slider label="Ac — Amplitude" val={Ac} min={0.5} max={5} step={0.1} unit=" V" onChange={setAc} color={ACCENT}/>
        <Slider label="fc — Frequency" val={fc} min={2000} max={50000} step={500} unit=" Hz" onChange={setFc} color={ACCENT}/>
        <Slider label="kp — Phase Sensitivity" val={kp} min={0.1} max={10} step={0.1} unit=" rad/V" onChange={setKp} color={ACCENT}/>
      </div>
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>MESSAGE 1</div>
        <Slider label="Am₁ — Amplitude" val={Am1} min={0.1} max={5} step={0.1} unit=" V" onChange={setAm1} color="#f47266"/>
        <Slider label="fm₁ — Frequency" val={fm1} min={100} max={5000} step={50} unit=" Hz" onChange={setFm1} color="#f47266"/>
        <Slider label="φ₁ — Phase" val={phi1} min={-180} max={180} step={5} unit="°" onChange={setPhi1} color="#f47266"/>
        <div style={{fontSize:10,color:"#f47266",marginTop:-4,marginBottom:6}}>Peak Δφ₁ = {(kp*Am1).toFixed(2)} rad</div>
      </div>
      {tone==="double"&&(
        <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12,marginBottom:8}}>
          <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>MESSAGE 2</div>
          <Slider label="Am₂ — Amplitude" val={Am2} min={0.1} max={5} step={0.1} unit=" V" onChange={setAm2} color="#fbbf24"/>
          <Slider label="fm₂ — Frequency" val={fm2} min={100} max={5000} step={50} unit=" Hz" onChange={setFm2} color="#fbbf24"/>
          <Slider label="φ₂ — Phase" val={phi2} min={-180} max={180} step={5} unit="°" onChange={setPhi2} color="#fbbf24"/>
          <div style={{fontSize:10,color:"#fbbf24",marginTop:-4,marginBottom:6}}>Peak Δφ₂ = {(kp*Am2).toFixed(2)} rad</div>
        </div>
      )}
      <div style={{borderTop:"1px solid #1e2a3a",paddingTop:12}}>
        <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:8,fontWeight:"bold"}}>DISPLAY</div>
        <Slider label="Cycles Shown" val={cycles} min={1} max={10} step={1} unit="" onChange={setCycles} color={ACCENT}/>
      </div>
    </>
  );

  return(
    <div style={{minHeight:"100vh",width:"100%",background:"#0b0f1a",color:"#dac0d0",
      fontFamily:"'Courier New',monospace",boxSizing:"border-box",overflowX:"hidden"}}>
      <div style={{padding:isMobile?"10px 12px 24px":"16px 28px 40px",width:"100%",boxSizing:"border-box"}}>
        <div style={{marginBottom:20,paddingBottom:12,borderBottom:"1px solid #1e2a3a",
          display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <button onClick={onBack} style={{background:"#131929",border:"1px solid #1e2a3a",borderRadius:8,
              padding:"7px 16px",cursor:"pointer",color:"#64748b",fontSize:13}}>← Back</button>
            <div>
              <h1 style={{margin:0,fontSize:isMobile?16:22,fontWeight:900,
                background:"linear-gradient(135deg,#f472b6,#fbbf24)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:2}}>∿ PM SIGNAL TOOLBOX</h1>
              <div style={{color:ACCENT,fontSize:13,fontWeight:"bold",letterSpacing:3,marginTop:2}}>APURBA MAITY</div>
            </div>
          </div>
          {isMobile&&(
            <button onClick={()=>setSidebarOpen(o=>!o)} style={{
              background:sidebarOpen?`${ACCENT}18`:"#131929",border:`1px solid ${sidebarOpen?ACCENT+"66":"#1e2a3a"}`,
              borderRadius:8,padding:"8px 18px",cursor:"pointer",color:sidebarOpen?ACCENT:"#64748b",fontSize:13,fontWeight:700}}>
              {sidebarOpen?"✕ Close":"⚙ Controls"}
            </button>
          )}
        </div>
        {isMobile&&sidebarOpen&&(
          <div style={{background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:12,padding:16,marginBottom:16}}>{sidebarJSX}</div>
        )}
        <div style={{display:"flex",gap:20,alignItems:"flex-start",flexDirection:isMobile?"column":"row"}}>
          {!isMobile&&(
            <div style={{width:264,flexShrink:0,background:"#0f1623",borderRadius:12,border:"1px solid #1e2a3a",
              padding:16,overflowY:"auto",maxHeight:"calc(100vh - 100px)",position:"sticky",top:16,boxSizing:"border-box"}}>{sidebarJSX}</div>
          )}
          <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:16}}>
            <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"stretch"}}>
              <div style={{background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:12,padding:"14px 18px",flex:"2 1 400px"}}>
                <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:12,fontWeight:"bold"}}>MESSAGE SIGNAL SHAPE</div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
                  {SIG_TYPES.map(({id,label,color})=>(
                    <div key={id} onClick={()=>setSigType(id)} style={{
                      cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                      background:sigType===id?`${color}15`:"transparent",border:`1px solid ${sigType===id?color+"66":"#1e2a3a"}`,
                      borderRadius:10,padding:"10px 12px",transition:"all 0.15s",minWidth:100}}>
                      <SignalPreview type={id} color={color} dutyCycle={dutyCycle}/>
                      <span style={{color:sigType===id?color:"#475569",fontSize:12,fontWeight:"bold",fontFamily:"monospace"}}>{label}</span>
                    </div>
                  ))}
                </div>
                {sigType==="pulse"&&<div style={{marginTop:12,maxWidth:360}}>
                  <Slider label="Duty Cycle" val={dutyCycle} min={0.05} max={0.95} step={0.05} unit="" onChange={setDutyCycle} color={ACCENT}/>
                </div>}
              </div>
              <div style={{background:"#0f1623",border:`1px solid ${noiseOn?"#f4726644":"#1e2a3a"}`,borderRadius:12,padding:"14px 18px",flex:"1 1 220px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{color:"#64748b",fontSize:10,letterSpacing:2,fontWeight:"bold"}}>AWGN NOISE</div>
                  <label style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
                    <input type="checkbox" checked={noiseOn} onChange={e=>setNoiseOn(e.target.checked)} style={{accentColor:"#f47266"}}/>
                    <span style={{color:noiseOn?"#f47266":"#475569",fontSize:11,fontWeight:"bold"}}>{noiseOn?"ENABLED":"OFF"}</span>
                  </label>
                </div>
                {noiseOn&&<>
                  <Slider label="SNR (dB)" val={snrDb} min={0} max={40} step={1} unit=" dB" onChange={setSnrDb} color="#f47266"/>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>{[0,5,10,20,30,40].map(v=>(
                    <button key={v} onClick={()=>setSnrDb(v)} style={{...btnStyle(snrDb===v,"#f47266"),fontSize:10,padding:"3px 9px"}}>{v}dB</button>
                  ))}</div>
                  <div style={{fontSize:11,fontWeight:"bold",color:snrDb<5?"#f47266":snrDb<15?"#fbbf24":"#4ade80"}}>
                    {snrDb<5?"⚠ Severe":snrDb<10?"⚠ Very noisy":snrDb<20?"△ Moderate":snrDb<30?"◎ Acceptable":"✓ Clean"}
                  </div>
                </>}
                {!noiseOn&&<div style={{color:"#334155",fontSize:12,lineHeight:1.7}}>Enable to inject<br/>Additive White Gaussian Noise</div>}
              </div>
            </div>

            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <MCard label="Total Power" val={metrics.Pt+" W"} color={ACCENT} sub="Pt = Ac²/2 (constant)"/>
              <MCard label="Peak Phase Dev." val={metrics.phaseDeviation} color={ACCENT} sub={metrics.phaseDegrees}/>
              <MCard label="Peak Freq Dev." val={metrics.deltaF} color="#4ade80" sub={metrics.edgeLimited?"Ideal discontinuity: unbounded":"Δf = (kp/2π)·max|dm/dt|"}/>
              <MCard label="Approx. Carson BW" val={metrics.bw} color="#fbbf24" sub={metrics.edgeLimited?"Requires finite rise-time model":"BW ≈ 2(Δf + fm,max)"}/>
              <MCard label="Sensitivity kp" val={metrics.kp} color="#f47266" sub="Δφ(t) = kp·m(t)"/>
              <MCard label="Efficiency" val="100%" color="#4ade80" sub="Constant envelope"/>
            </div>

            <div style={{background:"#14050d",border:`1px solid ${ACCENT}25`,borderRadius:10,padding:"12px 18px",fontSize:12,color:"#b8759a",lineHeight:1.9}}>
              <strong style={{color:ACCENT}}>PM Signal: </strong>s(t) = Ac · cos(2πfc·t + kp·m(t))
              &nbsp;&nbsp;&nbsp;<strong style={{color:"#4ade80"}}>inst. freq: </strong>fi(t) = fc + (kp/2π)·dm(t)/dt
              &nbsp;&nbsp;&nbsp;<strong style={{color:"#fbbf24"}}>peak Δφ: </strong>{metrics.phaseDeviation}
            </div>

            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[["time","⟟ TIME DOMAIN"],["spectrum","⟝ SPECTRUM"],["phasor","⊙ PHASOR"],["demod","⟒ DEMOD LAB"]].map(([v,l])=>(
                <button key={v} onClick={()=>setTab(v)} style={btnStyle(tab===v,ACCENT)}>{l}</button>
              ))}
            </div>

            {tab==="time"&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,flexWrap:"wrap",
                  background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:10,padding:"10px 16px"}}>
                  <span style={{color:"#64748b",fontSize:10,letterSpacing:1,fontWeight:"bold"}}>TIME DOMAIN · PM SIGNAL, PHASE, AND INSTANTANEOUS FREQUENCY</span>
                  <div style={{flex:1,height:1,background:"#1e2a3a",minWidth:20}}/>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <button onClick={handleZoomOut} style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:16,lineHeight:1}}>−</button>
                    <div style={{background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:6,padding:"4px 14px",minWidth:60,textAlign:"center",color:ACCENT,fontSize:13,fontWeight:"bold"}}>{zoomLevel.toFixed(1)}×</div>
                    <button onClick={handleZoomIn} style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:16,lineHeight:1}}>+</button>
                    <button onClick={handleZoomReset} style={{...btnStyle(zoomLevel===1,ACCENT),padding:"4px 12px",fontSize:10}}>RESET</button>
                  </div>
                  {zoomLevel>1&&<div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <span style={{color:"#475569",fontSize:10}}>PAN</span>
                    <button onClick={handlePanLeft} style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:14}}>◀</button>
                    <div style={{background:"#0b0f1a",border:"1px solid #1e2a3a",borderRadius:4,padding:"4px 10px",minWidth:50,textAlign:"center",color:"#94a3b8",fontSize:10}}>{(panOffset*100).toFixed(0)}%</div>
                    <button onClick={handlePanRight} style={{...btnStyle(false,ACCENT),padding:"4px 12px",fontSize:14}}>▶</button>
                  </div>}
                </div>
                <div ref={zoomContainerRef}>
                  <AnimatedWaves params={params} speed={animSpeed} showEnv={false} waveConfigs={timeWaves} zoomLevel={zoomLevel} panOffset={panOffset} modType="pm"/>
                </div>
              </div>
            )}

            {tab==="spectrum"&&(
              <div>
                <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:12,fontWeight:"bold"}}>FREQUENCY DOMAIN · NUMERICAL PM COMPLEX-ENVELOPE SPECTRUM</div>
                <SpecCanvas lines={specLines} accentColor={ACCENT}/>
                <div style={{marginTop:12,background:"#14050d",border:`1px solid ${ACCENT}25`,borderRadius:10,padding:"12px 18px",fontSize:12,color:"#a8688c",lineHeight:1.9}}>
                  <div><strong style={{color:ACCENT}}>PM spectrum: </strong>Fourier coefficients of exp(j·kp·m(t)), shifted to fc</div>
                  <div><strong style={{color:"#fbbf24"}}>Supports: </strong>single/double tone, phase offsets, and all available message waveforms</div>
                  <div><strong style={{color:"#4ade80"}}>Approx. bandwidth: </strong>{metrics.bw}</div>
                </div>
                <div style={{marginTop:10,display:"flex",gap:8,flexWrap:"wrap"}}>
                  {specLines.slice(0,10).map((l,i)=>(
                    <div key={i} style={{background:"#0f1623",border:`1px solid ${l.color}30`,borderRadius:8,padding:"7px 12px",fontSize:11}}>
                      <span style={{color:l.color,fontWeight:"bold"}}>{l.label}</span>
                      <span style={{color:"#64748b",marginLeft:8}}>{(l.f/1000).toFixed(2)} kHz</span>
                      <span style={{color:"#475569",marginLeft:8}}>A={l.amp.toFixed(3)}</span>
                    </div>
                  ))}
                  {specLines.length>10&&<div style={{color:"#475569",fontSize:11,padding:"7px 12px"}}>+{specLines.length-10} more lines</div>}
                </div>
              </div>
            )}

            {tab==="phasor"&&(
              <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
                <PMPhasorCanvas params={params}/>
                <div style={{flex:1,minWidth:260}}>
                  <div style={{color:"#64748b",fontSize:10,letterSpacing:2,marginBottom:14,fontWeight:"bold"}}>PM PHASOR — DIRECT PHASE DEVIATION</div>
                  <div style={{fontSize:13,color:"#bd789e",lineHeight:2.1}}>
                    <div style={{color:ACCENT,fontWeight:"bold",marginBottom:8}}>PM has constant amplitude; message amplitude directly rotates the carrier phase</div>
                    <div>s(t) = Ac · cos(φ(t))</div>
                    <div style={{paddingLeft:20,color:"#f47266"}}>φ(t) = 2πfc·t + kp·m(t)</div>
                    <div style={{marginTop:10,color:"#fbbf24"}}>Δφ(t) = kp·m(t), peak = {metrics.phaseDeviation}</div>
                    <div style={{color:"#4ade80"}}>fi(t) − fc = (kp/2π)·dm(t)/dt</div>
                    <div style={{marginTop:10,color:"#94a3b8"}}>Unlike FM, phase follows m(t) directly; frequency follows its slope.</div>
                  </div>
                </div>
              </div>
            )}

            {tab==="demod"&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,
                  background:"#0f1623",border:"1px solid #1e2a3a",borderRadius:10,padding:"10px 16px",flexWrap:"wrap"}}>
                  <span style={{color:"#64748b",fontSize:10,letterSpacing:1,fontWeight:"bold"}}>PM DEMODULATION LAB · COHERENT PHASE DETECTOR / PLL</span>
                  <div style={{flex:1,height:1,background:"#1e2a3a",minWidth:20}}/>
                </div>
                <AnimatedWaves params={params} speed={animSpeed} showEnv={false} waveConfigs={demodWaves} zoomLevel={1} panOffset={0} modType="pm"/>
                <PMDemodTheory/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [domain,setDomain]=useState(null);
  if (!domain) return <LandingScreen onSelect={setDomain}/>;
  if (domain==="am") return <AMToolbox onBack={()=>setDomain(null)}/>;
  if (domain==="fm") return <FMToolbox onBack={()=>setDomain(null)}/>;
  if (domain==="pm") return <PMToolbox onBack={()=>setDomain(null)}/>;
  return null;
}
