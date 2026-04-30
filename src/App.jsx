import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════
   INJECT FONTS
══════════════════════════════════════════════════════════ */
if (!document.getElementById("gp-fonts")) {
  const l = document.createElement("link");
  l.id = "gp-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;600;700;900&display=swap";
  document.head.appendChild(l);
}

/* ══════════════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════════════ */
const G = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;overflow-x:hidden}
  body{cursor:none!important;background:#04070d;color:#e8f0fe;overflow-x:hidden;font-family:'Outfit',sans-serif}
  *{cursor:none!important}
  ::-webkit-scrollbar{width:2px}
  ::-webkit-scrollbar-thumb{background:#00ffb4;border-radius:2px}

  @keyframes pulse-ring{0%,100%{box-shadow:0 0 0 0 rgba(0,255,180,.5)}50%{box-shadow:0 0 0 10px rgba(0,255,180,0)}}
  @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
  @keyframes orbit{to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes marquee-f{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes marquee-b{from{transform:translateX(-50%)}to{transform:translateX(0)}}
  @keyframes wave{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
  @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
  @keyframes glitch-r{0%,89%,100%{opacity:0;transform:none}90%{opacity:.7;transform:translate(-3px,-2px) skewX(-3deg)}95%{opacity:.5;transform:translate(3px,1px)}}
  @keyframes glitch-b{0%,84%,100%{opacity:0;transform:none}85%{opacity:.6;transform:translate(3px,2px) skewX(2deg)}90%{opacity:.4;transform:translate(-2px,-1px)}}
  @keyframes scan{0%{background-position:0 0}100%{background-position:0 4px}}
  @keyframes loader-in{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes spin-slow{to{transform:rotate(360deg)}}
  @keyframes counter-pop{from{opacity:0;transform:translateY(8px) scale(.9)}to{opacity:1;transform:none}}
  @keyframes reveal-bar{from{width:0}to{width:var(--w)}}
  @keyframes draw{from{stroke-dashoffset:800}to{stroke-dashoffset:0}}
  @keyframes scale-in{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
  @keyframes pop-in{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:none}}

  @media(max-width:768px){
    .nav-links,.nav-cta{display:none!important}
    .hamburger{display:flex!important}
    .hero-grid{grid-template-columns:1fr!important}
    .orbit-wrap{display:none!important}
    .about-grid{grid-template-columns:1fr!important}
    .skills-grid{grid-template-columns:repeat(2,1fr)!important}
    .projects-feat{grid-template-columns:1fr!important}
    .feat-border{border-right:none!important;border-bottom:1px solid rgba(255,255,255,.07)!important}
    .projects-grid{grid-template-columns:1fr!important}
    .contact-cards{gap:10px!important}
    .contact-card{min-width:unset!important;flex:1 1 140px!important}
    .section-pad{padding-left:24px!important;padding-right:24px!important}
    .h1-size{font-size:clamp(68px,18vw,100px)!important}
    .footer-inner{flex-direction:column!important;text-align:center!important}
  }
  @media(max-width:480px){
    .skills-grid{grid-template-columns:1fr 1fr!important}
    .contact-cards{flex-direction:column!important;align-items:stretch!important}
  }
`;

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const NAV = [
  { label:"Sobre",    href:"#about",    n:"01" },
  { label:"Skills",   href:"#skills",   n:"02" },
  { label:"Projetos", href:"#projects", n:"03" },
  { label:"Contato",  href:"#contact",  n:"04" },
];

const SKILLS = [
  { icon:"🐍", name:"Python",     cat:"Backend",   lv:90 },
  { icon:"🎸", name:"Django",     cat:"Framework", lv:88 },
  { icon:"⚡", name:"JavaScript", cat:"Frontend",  lv:82 },
  { icon:"🟢", name:"Node.js",    cat:"Backend",   lv:75 },
  { icon:"⚛️", name:"React",      cat:"Frontend",  lv:70 },
  { icon:"🌐", name:"HTML5",      cat:"Frontend",  lv:93 },
  { icon:"🎨", name:"CSS3",       cat:"Frontend",  lv:89 },
  { icon:"🐘", name:"PostgreSQL", cat:"Database",  lv:80 },
  { icon:"🏗️", name:"SQL Server", cat:"Database",  lv:72 },
  { icon:"📦", name:"Git",        cat:"DevOps",    lv:85 },
  { icon:"🔌", name:"API REST",   cat:"Backend",   lv:86 },
  { icon:"🎮", name:"Pygame",     cat:"Game Dev",  lv:78 },
];

const TECHS = ["Python","Django","JavaScript","Node.js","PostgreSQL","SQL Server","HTML5","CSS3","Git","API REST","Pygame","Figma","React","Vite","TypeScript"];

const PROJECTS = [
  {
    id:"mysphere", feat:true,
    cat:"Social Platform", name:"MySphere",
    desc:"Rede social profissional multi-tenant em Django. Feed em tempo real, chat, gamificação e gestão de eventos — cada empresa em ambiente isolado.",
    tags:["Python","Django","PostgreSQL","JavaScript","HTML/CSS","Multi-tenant"],
    features:["Feed com postagens em tempo real","Chat com comunicação instantânea","Sistema de gamificação e rankings","Gerenciamento de eventos","Badges, conquistas e pontos","Arquitetura multi-tenant segura"],
    href:"https://github.com/SENAI-Morvan-Figueiredo/MySphere",
    color:"#00ffb4", year:"2024",
  },
  {
    id:"soul", cat:"Game Dev", name:"Soul Redemption",
    desc:"Jogo 2D imersivo em Pygame. 3 fases temáticas: Medo, Raiva e Culpa. Pixel art, trilha sonora e sistema de habilidades.",
    tags:["Python","Pygame","Tiled","Figma"],
    href:"https://github.com/Dronato/SoulRedemptionPygames",
    color:"#ff3d6e", year:"2023",
  },
  {
    id:"wms", cat:"Backend", name:"WMS",
    desc:"Warehouse Management System para controle de armazém, estoque e finanças com autenticação completa.",
    tags:["Node.js","SQL Server","JavaScript"],
    href:"https://github.com/Dronato/WMS",
    color:"#00c8ff", year:"2024",
  },
  {
    id:"nexus", cat:"Frontend", name:"Nexus",
    desc:"Portal de notícias tech com design responsivo. JavaScript vanilla performático e interface de leitura limpa.",
    tags:["HTML5","CSS3","JavaScript"],
    href:"https://github.com/gprsilva/Nexus",
    color:"#ffd97d", year:"2023",
  },
];

const TIMELINE = [
  { y:"2022", title:"Início da jornada",       desc:"Primeiros passos com Python e lógica de programação. Descoberta da paixão por criar coisas na web.", icon:"🚀" },
  { y:"2023", title:"SENAI — Dev Full Stack",  desc:"Curso técnico intensivo. Django, PostgreSQL e arquitetura de sistemas web.", icon:"📚" },
  { y:"2024", title:"MySphere & projetos reais",desc:"Desenvolvimento da rede social multi-tenant MySphere. Primeiro contato com arquitetura escalável.", icon:"⚡" },
  { y:"2025", title:"Expansão do stack",        desc:"Node.js, React, APIs REST. Foco em qualidade de código e experiência do usuário.", icon:"🧠" },
  { y:"2026", title:"Próximo nível",            desc:"Em busca de oportunidades desafiadoras para construir produtos de impacto real.", icon:"🎯" },
];

const CAT_COLORS = { Backend:"#00ffb4", Framework:"#00ffb4", Frontend:"#00c8ff", Database:"#ffd97d", DevOps:"#a78bfa", "Game Dev":"#ff3d6e" };

/* ══════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════ */
function useInView(threshold=0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setV(true);obs.disconnect();} },{threshold});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[threshold]);
  return [ref,v];
}

function useScroll() {
  const [y,setY]=useState(0);
  useEffect(()=>{
    const h=()=>setY(window.scrollY);
    window.addEventListener("scroll",h,{passive:true});
    return ()=>window.removeEventListener("scroll",h);
  },[]);
  return y;
}

function useScramble(text, on, speed=28) {
  const [out,setOut]=useState(text);
  const C="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const t=useRef(null);
  useEffect(()=>{
    if(!on) return;
    let i=0, total=text.length*3;
    const run=()=>{
      setOut(text.split("").map((c,idx)=>{
        if(c===" ") return " ";
        if(Math.floor(i/3)>idx) return c;
        return C[Math.floor(Math.random()*C.length)];
      }).join(""));
      i++;
      if(i<total) t.current=setTimeout(run,speed);
      else setOut(text);
    };
    run();
    return ()=>clearTimeout(t.current);
  },[on,text,speed]);
  return out;
}

function useTypewriter(text, on, speed=45) {
  const [out,setOut]=useState("");
  useEffect(()=>{
    if(!on) return;
    let i=0;
    const iv=setInterval(()=>{
      setOut(text.slice(0,++i));
      if(i>=text.length) clearInterval(iv);
    },speed);
    return ()=>clearInterval(iv);
  },[on,text,speed]);
  return out;
}

function useCounter(target, on, ms=1400) {
  const [n,setN]=useState(0);
  useEffect(()=>{
    if(!on) return;
    let start=null;
    const step=ts=>{
      if(!start) start=ts;
      const p=Math.min((ts-start)/ms,1);
      setN(Math.round(target*(1-Math.pow(1-p,3))));
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },[on,target,ms]);
  return n;
}

/* ══════════════════════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════════════════════ */
function Particles() {
  const ref=useRef(null);
  const mouse=useRef({x:-9999,y:-9999});
  useEffect(()=>{
    const c=ref.current, ctx=c.getContext("2d");
    let W,H,pts=[],raf;
    const resize=()=>{ W=c.width=innerWidth; H=c.height=innerHeight; };
    resize();
    window.addEventListener("resize",resize);
    window.addEventListener("mousemove",e=>{ mouse.current={x:e.clientX,y:e.clientY}; });
    class P {
      constructor(){ this.reset(true); }
      reset(init){
        this.x=Math.random()*W; this.y=Math.random()*H;
        this.vx=(Math.random()-.5)*.4; this.vy=(Math.random()-.5)*.4;
        this.r=Math.random()*1.6+.3; this.a=Math.random()*.45+.1;
      }
      tick(){
        const dx=this.x-mouse.current.x, dy=this.y-mouse.current.y;
        const d=Math.hypot(dx,dy);
        if(d<190){ const f=(190-d)/190*.55; this.vx+=dx/d*f*.28; this.vy+=dy/d*f*.28; }
        this.vx*=.984; this.vy*=.984;
        this.x+=this.vx; this.y+=this.vy;
        if(this.x<-8) this.x=W+8;
        if(this.x>W+8) this.x=-8;
        if(this.y<-8) this.y=H+8;
        if(this.y>H+8) this.y=-8;
      }
    }
    for(let i=0;i<90;i++) pts.push(new P());
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<pts.length;i++){
        pts[i].tick();
        ctx.beginPath(); ctx.arc(pts[i].x,pts[i].y,pts[i].r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,255,180,${pts[i].a})`; ctx.fill();
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.hypot(dx,dy);
          if(d<130){
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=`rgba(0,255,180,${(1-d/130)*.17})`; ctx.lineWidth=.5; ctx.stroke();
          }
        }
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}} />;
}

/* ══════════════════════════════════════════════════════════
   CURSOR
══════════════════════════════════════════════════════════ */
function Cursor() {
  const dotRef=useRef(null), ringRef=useRef(null);
  const trailContainer=useRef(null);
  const s=useRef({mx:0,my:0,rx:0,ry:0,hover:false,click:false});

  useEffect(()=>{
    const TRAIL=6;
    const wrap=document.createElement("div");
    wrap.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:9990;";
    document.body.appendChild(wrap);
    trailContainer.current=wrap;
    const trails=Array.from({length:TRAIL},(_,i)=>{
      const el=document.createElement("div");
      const sz=5-i*.6;
      el.style.cssText=`position:fixed;width:${sz}px;height:${sz}px;border-radius:50%;background:rgba(0,255,180,${.35-i*.05});pointer-events:none;transform:translate(-50%,-50%);top:0;left:0;`;
      wrap.appendChild(el);
      return {el,x:0,y:0};
    });

    const onMove=e=>{ s.current.mx=e.clientX; s.current.my=e.clientY; };
    const onDown=()=>{ s.current.click=true; };
    const onUp=()=>{ s.current.click=false; };
    document.addEventListener("mousemove",onMove);
    document.addEventListener("mousedown",onDown);
    document.addEventListener("mouseup",onUp);

    // hover detection
    const hoverEls=()=>document.querySelectorAll("a,button,[data-h]");
    const onEnter=()=>{ s.current.hover=true; };
    const onLeave=()=>{ s.current.hover=false; };
    const attachHover=()=>{ hoverEls().forEach(el=>{ el.addEventListener("mouseenter",onEnter); el.addEventListener("mouseleave",onLeave); }); };
    const tid=setTimeout(attachHover,600);

    let raf;
    const tick=()=>{
      const {mx,my,hover,click}=s.current;
      s.current.rx+=(mx-s.current.rx)*.13;
      s.current.ry+=(my-s.current.ry)*.13;
      if(dotRef.current){
        dotRef.current.style.left=mx+"px"; dotRef.current.style.top=my+"px";
        const sc=click?.5:hover?2:1;
        dotRef.current.style.transform=`translate(-50%,-50%) scale(${sc})`;
      }
      if(ringRef.current){
        ringRef.current.style.left=s.current.rx+"px"; ringRef.current.style.top=s.current.ry+"px";
        const rs=hover?1.9:1;
        ringRef.current.style.transform=`translate(-50%,-50%) scale(${rs})`;
        ringRef.current.style.borderColor=hover?"rgba(0,255,180,.9)":"rgba(0,255,180,.4)";
        ringRef.current.style.opacity=hover?"1":".5";
      }
      trails.forEach((t,i)=>{
        const prev=i===0?{x:mx,y:my}:trails[i-1];
        t.x+=(prev.x-t.x)*(.38-i*.04);
        t.y+=(prev.y-t.y)*(.38-i*.04);
        t.el.style.left=t.x+"px"; t.el.style.top=t.y+"px";
        t.el.style.opacity=hover?(.3-i*.04):(.18-i*.025);
      });
      raf=requestAnimationFrame(tick);
    };
    tick();
    return ()=>{
      cancelAnimationFrame(raf); clearTimeout(tid);
      document.removeEventListener("mousemove",onMove);
      document.removeEventListener("mousedown",onDown);
      document.removeEventListener("mouseup",onUp);
      document.body.removeChild(wrap);
    };
  },[]);

  return (
    <>
      <div ref={dotRef} style={{position:"fixed",width:8,height:8,background:"#00ffb4",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)",transition:"transform .15s ease",mixBlendMode:"difference",top:0,left:0}} />
      <div ref={ringRef} style={{position:"fixed",width:36,height:36,border:"1.5px solid rgba(0,255,180,.4)",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)",transition:"transform .3s ease,border-color .25s,opacity .25s",top:0,left:0}} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════════════════ */
function ProgressBar() {
  const [p,setP]=useState(0);
  useEffect(()=>{
    const h=()=>setP(window.scrollY/(document.body.scrollHeight-innerHeight)*100);
    window.addEventListener("scroll",h,{passive:true});
    return ()=>window.removeEventListener("scroll",h);
  },[]);
  return <div style={{position:"fixed",top:0,left:0,height:2,width:p+"%",background:"linear-gradient(90deg,#00ffb4,#00c8ff,#ff3d6e)",zIndex:1001,boxShadow:"0 0 12px rgba(0,255,180,.8)",transition:"width .1s linear"}} />;
}

/* ══════════════════════════════════════════════════════════
   LOADER
══════════════════════════════════════════════════════════ */
function Loader({onDone}) {
  const [pct,setPct]=useState(0);
  const [out,setOut]=useState(false);
  const cRef=useRef(null);

  // raining code lines on canvas
  useEffect(()=>{
    const c=cRef.current; if(!c) return;
    const ctx=c.getContext("2d");
    c.width=c.offsetWidth; c.height=c.offsetHeight;
    const W=c.width, H=c.height;
    const lines=Array.from({length:22},()=>({x:Math.random()*W,y:Math.random()*H,len:30+Math.random()*50,a:.04+Math.random()*.12,sp:.4+Math.random()*1.2}));
    let raf;
    const draw=()=>{
      ctx.fillStyle="rgba(4,7,13,.14)"; ctx.fillRect(0,0,W,H);
      lines.forEach(l=>{
        ctx.beginPath(); ctx.moveTo(l.x,l.y); ctx.lineTo(l.x,l.y+l.len);
        ctx.strokeStyle=`rgba(0,255,180,${l.a})`; ctx.lineWidth=1; ctx.stroke();
        l.y+=l.sp; if(l.y>H){l.y=-l.len; l.x=Math.random()*W;}
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>cancelAnimationFrame(raf);
  },[]);

  useEffect(()=>{
    let v=0;
    const iv=setInterval(()=>{
      v+=Math.random()*16+3;
      if(v>=100){ v=100; clearInterval(iv); setTimeout(()=>{ setOut(true); setTimeout(onDone,700); },400); }
      setPct(Math.round(Math.min(v,100)));
    },70);
    return ()=>clearInterval(iv);
  },[onDone]);

  return (
    <div style={{position:"fixed",inset:0,background:"#04070d",zIndex:10000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:28,opacity:out?0:1,transform:out?"scale(1.04)":"scale(1)",transition:"opacity .65s ease,transform .65s ease",pointerEvents:out?"none":"all"}}>
      <canvas ref={cRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.45}} />
      <div style={{position:"relative",zIndex:1,textAlign:"center",animation:"loader-in .7s .15s both"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(52px,11vw,128px)",lineHeight:.88,letterSpacing:".03em",background:"linear-gradient(135deg,#00ffb4 20%,#00c8ff 80%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          GUILHERME<br/>
          <span style={{fontSize:".5em",WebkitTextFillColor:"rgba(255,255,255,.1)",WebkitTextStroke:"1px rgba(255,255,255,.1)"}}>PEREIRA</span>
        </div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#6b8099",letterSpacing:".3em",textTransform:"uppercase",marginTop:14}}>Full Stack Developer</div>
      </div>
      <div style={{position:"relative",zIndex:1,width:"min(300px,80vw)",display:"flex",flexDirection:"column",gap:9,animation:"loader-in .7s .35s both",opacity:0}}>
        <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'DM Mono',monospace",fontSize:11,color:"#2d3f54"}}>
          <span>Inicializando</span><span style={{color:"#00ffb4"}}>{pct}%</span>
        </div>
        <div style={{height:1,background:"rgba(255,255,255,.06)",borderRadius:1,overflow:"hidden"}}>
          <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#00ffb4,#00c8ff)",transition:"width .08s linear",boxShadow:"0 0 10px #00ffb4"}} />
        </div>
        <div style={{display:"flex",gap:3}}>
          {Array.from({length:20},(_,i)=>(
            <div key={i} style={{flex:1,height:3,borderRadius:1,background:i/20<pct/100?"#00ffb4":"rgba(255,255,255,.05)",transition:"background .1s",boxShadow:i/20<pct/100?"0 0 5px rgba(0,255,180,.5)":"none"}} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════ */
function Nav() {
  const scrollY=useScroll();
  const [open,setOpen]=useState(false);
  const scrolled=scrollY>55;

  const go=(href)=>{
    setOpen(false);
    const el=document.querySelector(href);
    if(el) el.scrollIntoView({behavior:"smooth"});
  };

  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,display:"flex",alignItems:"center",justifyContent:"space-between",padding:scrolled?"12px 60px":"22px 60px",background:scrolled?"rgba(4,7,13,.92)":"transparent",backdropFilter:scrolled?"blur(24px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,.07)":"none",transition:"all .4s ease"}} className="section-pad">

        {/* Logo */}
        <button data-h onClick={()=>go("#hero")} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:".1em",color:"#00ffb4",background:"none",border:"none",display:"flex",alignItems:"center",lineHeight:1,transition:"text-shadow .3s"}}
          onMouseEnter={e=>e.currentTarget.style.textShadow="0 0 22px rgba(0,255,180,.8)"}
          onMouseLeave={e=>e.currentTarget.style.textShadow="none"}>
          GP<span style={{color:"#e8f0fe",fontSize:28}}>.</span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links" style={{display:"flex",gap:40,listStyle:"none",padding:0,margin:0}}>
          {NAV.map((l,i)=>(
            <li key={l.href}>
              <button data-h onClick={()=>go(l.href)} style={{background:"none",border:"none",fontFamily:"'DM Mono',monospace",fontSize:12,color:"#6b8099",letterSpacing:".1em",textTransform:"uppercase",padding:"4px 0",transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#e8f0fe"}
                onMouseLeave={e=>e.currentTarget.style.color="#6b8099"}>
                <span style={{color:"#00ffb4",marginRight:6,fontSize:10}}>{l.n}.</span>{l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="mailto:gprsilva2008@gmail.com" data-h className="nav-cta" style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#00ffb4",border:"1px solid rgba(0,255,180,.3)",padding:"8px 20px",borderRadius:2,textDecoration:"none",letterSpacing:".08em",transition:"all .25s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,255,180,.1)";e.currentTarget.style.boxShadow="0 0 22px rgba(0,255,180,.2)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.boxShadow="none";}}>
          Contato →
        </a>

        {/* Hamburger */}
        <button data-h className="hamburger" onClick={()=>setOpen(v=>!v)}
          style={{display:"none",background:"none",border:"none",flexDirection:"column",gap:5,alignItems:"flex-end",padding:6,zIndex:600,position:"relative"}}>
          <span style={{display:"block",width:24,height:2,background:"#00ffb4",borderRadius:1,transform:open?"translateY(7px) rotate(45deg)":"none",transition:"all .3s"}} />
          <span style={{display:"block",width:open?0:17,height:2,background:"#00ffb4",borderRadius:1,transition:"all .3s",opacity:open?0:1}} />
          <span style={{display:"block",width:24,height:2,background:"#00ffb4",borderRadius:1,transform:open?"translateY(-7px) rotate(-45deg)":"none",transition:"all .3s"}} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{position:"fixed",inset:0,zIndex:490,background:"rgba(4,7,13,.97)",backdropFilter:"blur(20px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:44,transform:open?"translateX(0)":"translateX(100%)",transition:"transform .5s cubic-bezier(.77,0,.175,1)",pointerEvents:open?"all":"none"}}>
        {NAV.map((l,i)=>(
          <button key={l.href} data-h onClick={()=>go(l.href)}
            style={{background:"none",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(40px,10vw,64px)",color:"#e8f0fe",letterSpacing:".04em",transform:open?"translateX(0)":"translateX(70px)",opacity:open?1:0,transition:`all .5s ${i*.07+.08}s cubic-bezier(.77,0,.175,1)`}}
            onMouseEnter={e=>e.currentTarget.style.color="#00ffb4"}
            onMouseLeave={e=>e.currentTarget.style.color="#e8f0fe"}>
            <span style={{color:"#00ffb4",fontSize:".42em",verticalAlign:"middle",marginRight:10}}>{l.n}.</span>{l.label}
          </button>
        ))}
        <a href="mailto:gprsilva2008@gmail.com"
          style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#6b8099",textDecoration:"none",transform:open?"translateX(0)":"translateX(70px)",opacity:open?1:0,transition:"all .5s .36s"}}>
          gprsilva2008@gmail.com
        </a>
      </div>

      <style>{`@media(max-width:768px){nav{padding-left:24px!important;padding-right:24px!important}}`}</style>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   REVEAL
══════════════════════════════════════════════════════════ */
function Reveal({children,delay=0,from="up",style={},className=""}) {
  const [ref,v]=useInView();
  const dirs={up:"translateY(48px)",down:"translateY(-48px)",left:"translateX(-48px)",right:"translateX(48px)",scale:"scale(.88)"};
  return (
    <div ref={ref} className={className} style={{opacity:v?1:0,transform:v?"none":dirs[from]||"translateY(48px)",transition:`opacity .9s ${delay}s cubic-bezier(.16,1,.3,1), transform .9s ${delay}s cubic-bezier(.16,1,.3,1)`,...style}}>
      {children}
    </div>
  );
}

/* Section header */
function SH({eye,title,accent,center=false}) {
  return (
    <>
      <Reveal>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"#00ffb4",letterSpacing:".25em",textTransform:"uppercase",marginBottom:16,display:"flex",alignItems:"center",gap:12,justifyContent:center?"center":"flex-start"}}>
          <span style={{width:32,height:1,background:"#00ffb4",display:"inline-block"}} />{eye}{center&&<span style={{width:32,height:1,background:"#00ffb4",display:"inline-block"}} />}
        </div>
      </Reveal>
      <Reveal delay={.1}>
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,6vw,88px)",letterSpacing:"-.01em",lineHeight:.92,marginBottom:72,textAlign:center?"center":"left"}}>
          {title}{" "}{accent&&<em style={{fontStyle:"normal",color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,.17)"}}>{accent}</em>}
        </h2>
      </Reveal>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
function Hero() {
  const [ref,v]=useInView(.02);
  const w1=useScramble("FULL",v,18);
  const w2=useScramble("STACK",v,18);
  const w3=useScramble("DEV.",v,22);
  const sub=useTypewriter("Construo sistemas robustos e experiências digitais memoráveis.",v,32);
  const [mp,setMp]=useState({x:0,y:0});
  const onMM=useCallback(e=>setMp({x:(e.clientX/innerWidth-.5)*18,y:(e.clientY/innerHeight-.5)*9}),[]);

  return (
    <section id="hero" ref={ref} onMouseMove={onMM}
      style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"0 clamp(24px,5vw,80px)",position:"relative",overflow:"hidden",zIndex:2}}>

      {/* Scanline */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,180,.007) 3px,rgba(0,255,180,.007) 4px)",pointerEvents:"none",zIndex:1,animation:"scan 6s linear infinite"}} />

      {/* Parallax grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,255,180,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,.022) 1px,transparent 1px)",backgroundSize:"56px 56px",pointerEvents:"none",transform:`translate(${mp.x*.08}px,${mp.y*.08}px)`,transition:"transform 1.2s ease"}} />

      {/* Glow blobs */}
      <div style={{position:"absolute",width:700,height:700,background:"radial-gradient(circle,#00ffb4,transparent 70%)",borderRadius:"50%",top:"0%",left:"-20%",opacity:.04,transform:`translate(${mp.x*.4}px,${mp.y*.4}px)`,transition:"transform .9s ease",pointerEvents:"none"}} />
      <div style={{position:"absolute",width:500,height:500,background:"radial-gradient(circle,#00c8ff,transparent 70%)",borderRadius:"50%",bottom:"5%",right:"-12%",opacity:.035,transform:`translate(${-mp.x*.3}px,${-mp.y*.3}px)`,transition:"transform .9s ease",pointerEvents:"none"}} />

      {/* Ghost BG text */}
      <div style={{position:"absolute",right:"-4%",top:"50%",transform:`translateY(-50%) translate(${mp.x*.12}px,${mp.y*.12}px)`,fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(160px,22vw,320px)",color:"transparent",WebkitTextStroke:"1px rgba(0,255,180,.035)",lineHeight:.88,pointerEvents:"none",userSelect:"none",letterSpacing:"-.02em",transition:"transform 1s ease"}}>FULL<br/>STACK</div>

      <div style={{maxWidth:1300,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr auto",gap:"clamp(20px,4vw,60px)",alignItems:"center",position:"relative",zIndex:3}} className="hero-grid">
        <div>
          {/* Status */}
          <div style={{display:"inline-flex",alignItems:"center",gap:10,fontFamily:"'DM Mono',monospace",fontSize:12,color:"#00ffb4",background:"rgba(0,255,180,.07)",border:"1px solid rgba(0,255,180,.2)",padding:"7px 16px",borderRadius:100,marginBottom:28,opacity:v?1:0,transform:v?"none":"translateY(16px)",transition:"all .7s 1s ease"}}>
            <span style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{display:"block",width:7,height:7,borderRadius:"50%",background:"#00ffb4",animation:"pulse-ring 2s infinite"}} />
              <span style={{position:"absolute",width:13,height:13,borderRadius:"50%",background:"rgba(0,255,180,.25)",animation:"ping 2s infinite"}} />
            </span>
            Disponível para oportunidades
          </div>

          {/* Headline */}
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(72px,12vw,150px)",lineHeight:.87,letterSpacing:"-.01em",marginBottom:26}} className="h1-size">
            {[{t:w1,c:"#e8f0fe",d:"1.2s"},{t:w2,c:"#e8f0fe",d:"1.35s"},{t:w3,c:"#00ffb4",d:"1.5s",glitch:true}].map(({t,c,d,glitch})=>(
              <div key={t} style={{overflow:"hidden"}}>
                <div style={{color:c,display:"block",transform:v?"translateY(0)":"translateY(110%)",transition:`transform .9s ${d} cubic-bezier(.16,1,.3,1)`,position:"relative"}}>
                  {t}
                  {glitch&&<>
                    <span style={{position:"absolute",top:0,left:0,color:"#00c8ff",animation:"glitch-r 7s infinite",pointerEvents:"none"}}>{t}</span>
                    <span style={{position:"absolute",top:0,left:0,color:"#ff3d6e",animation:"glitch-b 7s infinite",pointerEvents:"none"}}>{t}</span>
                  </>}
                </div>
              </div>
            ))}
          </div>

          {/* Typewriter */}
          <p style={{fontSize:"clamp(15px,1.7vw,18px)",color:"#6b8099",lineHeight:1.8,maxWidth:520,marginBottom:18,minHeight:"3em",opacity:v?1:0,transition:"opacity .5s 2.1s"}}>
            Olá, sou <strong style={{color:"#e8f0fe"}}>Guilherme Pereira</strong> —{" "}{sub}
            <span style={{borderRight:"2px solid #00ffb4",animation:"blink .7s infinite",marginLeft:2}}>&nbsp;</span>
          </p>

          {/* Tags */}
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:42,opacity:v?1:0,transform:v?"none":"translateY(16px)",transition:"all .8s 2.45s ease"}}>
            {["Python","Django","JS","React","Node.js"].map(t=>(
              <span key={t} style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#2d3f54",border:"1px solid rgba(255,255,255,.07)",padding:"3px 10px",borderRadius:100}}>{t}</span>
            ))}
          </div>

          {/* CTA */}
          <div style={{display:"flex",gap:12,flexWrap:"wrap",opacity:v?1:0,transform:v?"none":"translateY(16px)",transition:"all .8s 2.6s ease"}}>
            <MagBtn href="#projects" primary>Ver Projetos →</MagBtn>
            <MagBtn href="#contact">Falar comigo</MagBtn>
          </div>
        </div>

        {/* Orbit */}
        <OrbitViz v={v} />
      </div>

      {/* Scroll indicator */}
      <div style={{position:"absolute",bottom:34,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,opacity:v?1:0,transition:"opacity .8s 3s"}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"#2d3f54",letterSpacing:".3em"}}>SCROLL</span>
        <div style={{width:1,height:44,background:"linear-gradient(to bottom,rgba(0,255,180,.7),transparent)",animation:"float 2.2s ease-in-out infinite"}} />
      </div>
    </section>
  );
}

function MagBtn({children,primary,href}) {
  const ref=useRef(null);
  const [h,setH]=useState(false);
  const onMM=e=>{
    const r=ref.current.getBoundingClientRect();
    ref.current.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.28}px,${(e.clientY-r.top-r.height/2)*.28}px)`;
  };
  const onML=()=>{ ref.current.style.transform=""; setH(false); };
  const go=e=>{
    e.preventDefault();
    const el=document.querySelector(href);
    if(el) el.scrollIntoView({behavior:"smooth"});
  };
  return (
    <div ref={ref} onMouseMove={onMM} onMouseLeave={onML} onMouseEnter={()=>setH(true)} style={{display:"inline-block",transition:"transform .4s ease"}}>
      <a href={href} data-h onClick={go}
        style={{display:"inline-flex",alignItems:"center",gap:8,padding:"15px 38px",fontFamily:"'DM Mono',monospace",fontSize:12,letterSpacing:".1em",textTransform:"uppercase",textDecoration:"none",borderRadius:2,transition:"all .28s ease",...(primary?{background:h?"#00e8a2":"#00ffb4",color:"#04070d",border:"none",boxShadow:h?"0 0 40px rgba(0,255,180,.55),0 12px 40px rgba(0,255,180,.25)":"0 0 20px rgba(0,255,180,.18)"}:{background:"transparent",color:"#e8f0fe",border:"1px solid rgba(255,255,255,.14)",boxShadow:h?"0 0 28px rgba(0,255,180,.1),inset 0 0 28px rgba(0,255,180,.04)":"none"})}}>
        {children}
      </a>
    </div>
  );
}

function OrbitViz({v}) {
  const rings=[{sz:190,dur:8,rev:false,icon:"⚡"},{sz:268,dur:14,rev:true,icon:"🐍"},{sz:336,dur:22,rev:false,icon:"🌐"}];
  return (
    <div className="orbit-wrap" style={{width:336,height:336,position:"relative",flexShrink:0,opacity:v?1:0,transition:"opacity .9s 2.2s ease"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:108,height:108,borderRadius:"50%",background:"radial-gradient(circle at 30% 30%,rgba(0,255,180,.14),rgba(0,200,255,.06))",border:"1px solid rgba(0,255,180,.28)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:34,letterSpacing:".06em",color:"#00ffb4",boxShadow:"0 0 42px rgba(0,255,180,.14)",animation:"float 5s ease-in-out infinite"}}>GP</div>
      {rings.map((r,i)=>(
        <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:r.sz,height:r.sz,marginLeft:-r.sz/2,marginTop:-r.sz/2,borderRadius:"50%",border:`1px solid rgba(0,255,180,${.12-i*.03})`,animation:`orbit ${r.dur}s linear infinite`,animationDirection:r.rev?"reverse":"normal"}}>
          <div style={{position:"absolute",top:0,left:"50%",width:34,height:34,marginLeft:-17,marginTop:-17,borderRadius:"50%",background:"#070c14",border:"1px solid rgba(0,255,180,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,boxShadow:"0 0 14px rgba(0,255,180,.18)",animation:`orbit ${r.dur}s linear infinite`,animationDirection:r.rev?"normal":"reverse"}}>{r.icon}</div>
        </div>
      ))}
      {[40,80,140,200].map((d,i)=>(
        <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:d*2,height:d*2,marginLeft:-d,marginTop:-d,borderRadius:"50%",border:"1px dashed rgba(0,255,180,.04)"}} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════════════════ */
const STATS=[{n:3,s:"+",l:"Anos de estudo"},{n:10,s:"+",l:"Projetos concluídos"},{n:12,s:"",l:"Tecnologias"},{n:100,s:"+",l:"Commits este ano"}];

function StatBox({n,s,l}) {
  const [ref,v]=useInView(.4);
  const c=useCounter(n,v);
  const [h,setH]=useState(false);
  return (
    <div ref={ref} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:"#070c14",padding:"clamp(18px,2.5vw,30px) clamp(14px,2vw,26px)",position:"relative",overflow:"hidden",transition:"background .3s"}}>
      <div style={{position:"absolute",top:0,left:0,width:2,height:h?"100%":0,background:"linear-gradient(to bottom,#00ffb4,#00c8ff)",transition:"height .5s ease"}} />
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 15% 50%,rgba(0,255,180,.045),transparent 65%)",opacity:h?1:0,transition:"opacity .4s"}} />
      <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(36px,4vw,54px)",color:"#00ffb4",lineHeight:1,display:"block",marginBottom:4,textShadow:h?"0 0 22px rgba(0,255,180,.5)":"none",transition:"text-shadow .3s",animation:v?"counter-pop .5s ease":"none"}}>{c}{s}</span>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#6b8099",letterSpacing:".12em",textTransform:"uppercase"}}>{l}</span>
    </div>
  );
}

function TLItem({item,i}) {
  const [ref,v]=useInView(.2);
  const last=i===TIMELINE.length-1;
  return (
    <div ref={ref} style={{display:"flex",gap:18,paddingBottom:26,opacity:v?1:0,transform:v?"none":"translateX(-28px)",transition:`all .7s ${i*.09}s cubic-bezier(.16,1,.3,1)`}}>
      <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:last?"rgba(0,255,180,.14)":"#070c14",border:`1.5px solid ${last?"#00ffb4":"rgba(0,255,180,.25)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,boxShadow:last?"0 0 20px rgba(0,255,180,.25)":"none",flexShrink:0}}>{item.icon}</div>
        {!last&&<div style={{width:1,flex:1,background:"linear-gradient(to bottom,rgba(0,255,180,.28),rgba(0,255,180,.04))",marginTop:6}} />}
      </div>
      <div style={{paddingTop:5,paddingBottom:6}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:last?"#00ffb4":"#6b8099",letterSpacing:".15em",marginBottom:4}}>{item.y}</div>
        <div style={{fontSize:14,fontWeight:700,color:"#e8f0fe",marginBottom:5}}>{item.title}</div>
        <div style={{fontSize:13,color:"#6b8099",lineHeight:1.72}}>{item.desc}</div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{padding:"clamp(80px,10vw,140px) 0",background:"linear-gradient(180deg,#04070d 0%,#070c14 100%)",position:"relative",zIndex:2}}>
      <div style={{maxWidth:1300,margin:"0 auto",padding:"0 clamp(24px,5vw,80px)"}} className="section-pad">
        <SH eye="Sobre mim" title="Quem" accent="sou eu" />
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(36px,6vw,100px)",alignItems:"start"}} className="about-grid">
          <div>
            <Reveal delay={.1}>
              <p style={{fontSize:"clamp(15px,1.6vw,17px)",color:"#6b8099",lineHeight:1.9,marginBottom:26}}>
                Desenvolvedor <strong style={{color:"#e8f0fe"}}>Full Stack</strong> apaixonado por transformar ideias em sistemas elegantes. Experiência sólida com <strong style={{color:"#e8f0fe"}}>Python e Django</strong> no backend e atenção ao detalhe no frontend.
              </p>
              <p style={{fontSize:"clamp(15px,1.6vw,17px)",color:"#6b8099",lineHeight:1.9,marginBottom:38}}>
                Acredito que software vai além de funcionar — precisa ser <strong style={{color:"#e8f0fe"}}>confiável, escalável e prazeroso</strong> de usar. Cada projeto é uma oportunidade de superar limites.
              </p>
            </Reveal>
            <Reveal delay={.2}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,.06)",borderRadius:8,overflow:"hidden"}}>
                {STATS.map(s=><StatBox key={s.l} {...s} />)}
              </div>
            </Reveal>
            <Reveal delay={.32}>
              <div style={{display:"flex",gap:10,marginTop:32}}>
                {[
                  {href:"https://github.com/gprsilva",label:"GitHub",primary:true},
                  {href:"https://www.linkedin.com/in/guilherme-perei-ra-5ab5352bb/",label:"LinkedIn",primary:false},
                ].map(({href,label,primary})=>(
                  <a key={label} href={href} target="_blank" rel="noreferrer" data-h
                    style={{display:"inline-flex",alignItems:"center",gap:7,fontFamily:"'DM Mono',monospace",fontSize:11,color:primary?"#00ffb4":"#6b8099",border:`1px solid ${primary?"rgba(0,255,180,.28)":"rgba(255,255,255,.08)"}`,padding:"10px 20px",borderRadius:2,textDecoration:"none",letterSpacing:".08em",transition:"all .22s"}}
                    onMouseEnter={e=>{e.currentTarget.style.background=primary?"rgba(0,255,180,.09)":"rgba(255,255,255,.04)";e.currentTarget.style.boxShadow=primary?"0 0 18px rgba(0,255,180,.14)":"none";e.currentTarget.style.color=primary?"#00ffb4":"#e8f0fe";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.boxShadow="none";e.currentTarget.style.color=primary?"#00ffb4":"#6b8099";}}>
                    {label} →
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
          {/* Timeline */}
          <div style={{paddingTop:6}}>
            <Reveal delay={.1}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#2d3f54",letterSpacing:".2em",textTransform:"uppercase",marginBottom:24}}>— Trajetória</div>
            </Reveal>
            {TIMELINE.map((item,i)=><TLItem key={item.y} item={item} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════════ */
function SkillCard({s,i}) {
  const [ref,v]=useInView(.08);
  const [h,setH]=useState(false);
  const barRef=useRef(null);
  useEffect(()=>{
    if(v&&barRef.current) { const tid=setTimeout(()=>{ if(barRef.current) barRef.current.style.width=s.lv+"%"; },i*55+80); return ()=>clearTimeout(tid); }
  },[v,s.lv,i]);
  const cc=CAT_COLORS[s.cat]||"#00ffb4";
  return (
    <div ref={ref} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} data-h
      style={{background:h?"rgba(0,255,180,.03)":"#0a1020",padding:"clamp(18px,2.5vw,28px) clamp(14px,2vw,22px)",position:"relative",overflow:"hidden",transition:"background .3s",opacity:v?1:0,transform:v?"none":"translateY(28px)",transitionDelay:`${i*.045}s`}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${cc},transparent)`,transform:h?"scaleX(1)":"scaleX(0)",transformOrigin:"left",transition:"transform .4s ease"}} />
      <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 50% 50%,${cc}08,transparent 70%)`,opacity:h?1:0,transition:"opacity .4s"}} />
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <span style={{fontSize:"clamp(24px,3vw,32px)",display:"block",transform:h?"scale(1.18) rotate(-7deg)":"scale(1)",transition:"transform .3s cubic-bezier(.34,1.56,.64,1)"}}>{s.icon}</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:cc,opacity:h?1:0,transition:"opacity .3s"}}>{s.lv}%</span>
        </div>
        <span style={{fontSize:14,fontWeight:700,color:"#e8f0fe",display:"block",marginBottom:2}}>{s.name}</span>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"#6b8099",letterSpacing:".12em",textTransform:"uppercase",display:"block",marginBottom:14}}>{s.cat}</span>
        <div style={{height:2,background:"rgba(255,255,255,.06)",borderRadius:1,overflow:"hidden"}}>
          <div ref={barRef} style={{height:"100%",width:0,background:`linear-gradient(90deg,${cc},${cc}88)`,borderRadius:1,boxShadow:`0 0 6px ${cc}55`,transition:"width 1.3s cubic-bezier(.16,1,.3,1)"}} />
        </div>
      </div>
    </div>
  );
}

function MarqRow({items,rev=false,speed=32}) {
  const d=[...items,...items];
  return (
    <div style={{overflow:"hidden",position:"relative",padding:"10px 0"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:90,background:`linear-gradient(90deg,#070c14,transparent)`,zIndex:2}} />
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:90,background:`linear-gradient(-90deg,#070c14,transparent)`,zIndex:2}} />
      <div style={{display:"flex",gap:9,width:"max-content",animation:`${rev?"marquee-b":"marquee-f"} ${speed}s linear infinite`}}>
        {d.map((t,i)=>(
          <div key={i} data-h style={{display:"flex",alignItems:"center",gap:7,padding:"7px 16px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.055)",borderRadius:100,fontFamily:"'DM Mono',monospace",fontSize:12,color:"#6b8099",whiteSpace:"nowrap",transition:"color .2s,border-color .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.color="#00ffb4";e.currentTarget.style.borderColor="rgba(0,255,180,.28)";}}
            onMouseLeave={e=>{e.currentTarget.style.color="#6b8099";e.currentTarget.style.borderColor="rgba(255,255,255,.055)";}}>
            <span style={{width:4,height:4,borderRadius:"50%",background:"#00ffb4",flexShrink:0}} />{t}
          </div>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const [filter,setFilter]=useState("All");
  const cats=["All","Backend","Frontend","Database","DevOps","Game Dev","Framework"];
  const shown=filter==="All"?SKILLS:SKILLS.filter(s=>s.cat===filter);

  return (
    <section id="skills" style={{padding:"clamp(80px,10vw,140px) 0",background:"#070c14",overflow:"hidden",position:"relative",zIndex:2}}>
      <div style={{marginBottom:20}}><MarqRow items={TECHS} speed={36} /></div>
      <div style={{marginBottom:72}}><MarqRow items={[...TECHS].reverse()} rev speed={28} /></div>

      <div style={{maxWidth:1300,margin:"0 auto",padding:"0 clamp(24px,5vw,80px)"}} className="section-pad">
        <SH eye="Habilidades" title="Stack" accent="técnico" />

        {/* Filter tabs */}
        <Reveal delay={.14}>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:36,marginTop:-44}}>
            {cats.map(c=>(
              <button key={c} data-h onClick={()=>setFilter(c)}
                style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:".08em",padding:"7px 15px",borderRadius:100,border:filter===c?"1px solid rgba(0,255,180,.55)":"1px solid rgba(255,255,255,.08)",background:filter===c?"rgba(0,255,180,.11)":"transparent",color:filter===c?"#00ffb4":"#6b8099",transition:"all .2s"}}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2,background:"rgba(255,255,255,.055)",borderRadius:12,overflow:"hidden"}} className="skills-grid">
          {shown.map((s,i)=><SkillCard key={s.name} s={s} i={i} />)}
        </div>

        {/* Audio wave deco */}
        <Reveal delay={.3}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:3,height:44,marginTop:44}}>
            {Array.from({length:36},(_,i)=>(
              <div key={i} style={{width:3,background:`rgba(0,255,180,${.12+Math.sin(i*.4)*.1})`,borderRadius:2,height:"100%",animation:`wave ${.4+Math.random()*.9}s ${Math.random()*.4}s ease-in-out infinite`,transformOrigin:"bottom"}} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════ */
function FeatCard({p}) {
  const [ref,v]=useInView(.08);
  const [mp,setMp]=useState({x:"50%",y:"50%"});
  const [h,setH]=useState(false);
  return (
    <div ref={ref} style={{opacity:v?1:0,transform:v?"none":"translateY(60px)",transition:"all 1s cubic-bezier(.16,1,.3,1)"}}>
      <div onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setMp({x:((e.clientX-r.left)/r.width*100).toFixed(1)+"%",y:((e.clientY-r.top)/r.height*100).toFixed(1)+"%"});}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
        style={{display:"grid",gridTemplateColumns:"1fr 1fr",background:"rgba(255,255,255,.022)",border:`1px solid ${h?"rgba(0,255,180,.2)":"rgba(255,255,255,.07)"}`,borderRadius:16,overflow:"hidden",position:"relative",transition:"border-color .4s,box-shadow .4s",boxShadow:h?"0 0 90px rgba(0,255,180,.06),0 40px 90px rgba(0,0,0,.5)":"none"}} className="projects-feat">
        <div style={{position:"absolute",inset:0,background:`radial-gradient(700px circle at ${mp.x} ${mp.y},rgba(0,255,180,.045),transparent 70%)`,pointerEvents:"none",zIndex:1,borderRadius:16}} />

        {/* Left */}
        <div style={{padding:"clamp(28px,4vw,50px)",borderRight:"1px solid rgba(255,255,255,.07)",position:"relative",zIndex:2}} className="feat-border section-pad">
          <div style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"'DM Mono',monospace",fontSize:10,color:"#00ffb4",border:"1px solid rgba(0,255,180,.2)",background:"rgba(0,255,180,.06)",padding:"5px 12px",borderRadius:100,marginBottom:18}}>★ Projeto Destaque</div>
          <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(42px,5vw,58px)",letterSpacing:"-.02em",color:"#e8f0fe",lineHeight:.92,marginBottom:14}}>{p.name}</h3>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#6b8099",letterSpacing:".12em",marginBottom:14}}>{p.cat} · {p.year}</div>
          <p style={{fontSize:15,color:"#6b8099",lineHeight:1.85,marginBottom:26}}>{p.desc}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:30}}>
            {p.tags.map(t=>(
              <span key={t} data-h style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#2d3f54",padding:"3px 10px",border:"1px solid rgba(255,255,255,.07)",borderRadius:100,transition:"color .2s,border-color .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.color="#6b8099";e.currentTarget.style.borderColor="rgba(255,255,255,.14)";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#2d3f54";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}>
                {t}
              </span>
            ))}
          </div>
          <a href={p.href} target="_blank" rel="noreferrer" data-h
            style={{display:"inline-flex",alignItems:"center",gap:9,padding:"12px 22px",border:"1px solid rgba(0,255,180,.3)",borderRadius:4,color:"#00ffb4",fontFamily:"'DM Mono',monospace",fontSize:12,textDecoration:"none",letterSpacing:".08em",transition:"all .28s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,255,180,.09)";e.currentTarget.style.boxShadow="0 0 22px rgba(0,255,180,.14)";e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
            <GHIcon /> Ver no GitHub →
          </a>
        </div>

        {/* Right */}
        <div style={{padding:"clamp(28px,4vw,50px)",position:"relative",zIndex:2,display:"flex",flexDirection:"column",gap:28}} className="section-pad">
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#6b8099",letterSpacing:".15em",textTransform:"uppercase",marginBottom:16}}>Funcionalidades</div>
            <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:9}}>
              {p.features.map((f,i)=>(
                <li key={i} style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13,color:"#6b8099",lineHeight:1.65}}>
                  <span style={{width:13,height:13,borderRadius:"50%",background:"rgba(0,255,180,.1)",border:"1px solid rgba(0,255,180,.28)",flexShrink:0,marginTop:2}} />{f}
                </li>
              ))}
            </ul>
          </div>
          {/* Code deco */}
          <div style={{background:"rgba(0,0,0,.38)",border:"1px solid rgba(0,255,180,.1)",borderRadius:8,padding:"16px 18px",fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.95,color:"#6b8099",overflow:"hidden"}}>
            <div><span style={{color:"#00ffb4"}}># </span>Multi-tenant isolation</div>
            <div><span style={{color:"#00c8ff"}}>class </span><span style={{color:"#00ffb4"}}>TenantMiddleware</span>:</div>
            <div style={{paddingLeft:16}}><span style={{color:"#e8f0fe"}}>schema </span><span style={{color:"#ff3d6e"}}>=</span><span style={{color:"#00ffb4"}}> get_schema</span>(request)</div>
            <div style={{paddingLeft:16}}><span style={{color:"#00ffb4"}}>set_schema_to_public</span>()</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjCard({p,i}) {
  const [ref,v]=useInView(.08);
  const [h,setH]=useState(false);
  const cc=p.color;
  const cRgb=cc==="#00ffb4"?"0,255,180":cc==="#ff3d6e"?"255,61,110":cc==="#00c8ff"?"0,200,255":"255,217,125";
  return (
    <div ref={ref} data-h onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:h?`rgba(${cRgb},.03)`:"#070c14",padding:"clamp(22px,3vw,38px) clamp(18px,2.5vw,34px)",position:"relative",overflow:"hidden",transition:"background .4s",opacity:v?1:0,transform:v?"none":"translateY(40px)",transitionDelay:`${i*.07}s`}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${cc},transparent)`,transform:h?"scaleX(1)":"scaleX(0)",transformOrigin:"left",transition:"transform .5s ease"}} />
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:62,color:h?`${cc}09`:"rgba(255,255,255,.025)",position:"absolute",right:14,top:6,lineHeight:1,userSelect:"none",transition:"color .3s"}}>{String(i+1).padStart(2,"0")}</div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:cc,letterSpacing:".18em",textTransform:"uppercase",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
        <span style={{width:4,height:4,borderRadius:"50%",background:cc}} />{p.cat}
      </div>
      <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(26px,3vw,34px)",color:"#e8f0fe",marginBottom:9,letterSpacing:"-.01em",lineHeight:1}}>{p.name}</h3>
      <p style={{fontSize:13,color:"#6b8099",lineHeight:1.75,marginBottom:18}}>{p.desc}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:22}}>
        {p.tags.map(t=><span key={t} style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"#2d3f54",padding:"3px 9px",border:"1px solid rgba(255,255,255,.07)",borderRadius:100}}>{t}</span>)}
      </div>
      <a href={p.href} target="_blank" rel="noreferrer" data-h
        style={{display:"inline-flex",alignItems:"center",gap:7,fontFamily:"'DM Mono',monospace",fontSize:11,color:cc,textDecoration:"none",letterSpacing:".06em",transition:"gap .22s"}}
        onMouseEnter={e=>e.currentTarget.style.gap="13px"}
        onMouseLeave={e=>e.currentTarget.style.gap="7px"}>
        GitHub →
      </a>
    </div>
  );
}

function Projects() {
  const feat=PROJECTS.find(p=>p.feat);
  const grid=PROJECTS.filter(p=>!p.feat);
  return (
    <section id="projects" style={{padding:"clamp(80px,10vw,140px) 0",background:"#04070d",position:"relative",zIndex:2}}>
      <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,#00ffb4,transparent 70%)",right:"-14%",top:"18%",opacity:.032,pointerEvents:"none"}} />
      <div style={{maxWidth:1300,margin:"0 auto",padding:"0 clamp(24px,5vw,80px)"}} className="section-pad">
        <SH eye="Projetos" title="O que" accent="construí" />
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          <FeatCard p={feat} />
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,background:"rgba(255,255,255,.055)",borderRadius:12,overflow:"hidden"}} className="projects-grid">
            {grid.map((p,i)=><ProjCard key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════ */
function CCard({href,label,val,icon,delay=0}) {
  const [ref,v]=useInView(.08);
  const [h,setH]=useState(false);
  return (
    <a ref={ref} href={href} target={href.startsWith("mailto")?"_self":"_blank"} rel="noreferrer"
      data-h className="contact-card" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,padding:"clamp(22px,3vw,34px) clamp(26px,3.5vw,44px)",background:h?"rgba(0,255,180,.03)":"rgba(255,255,255,.022)",border:`1px solid ${h?"rgba(0,255,180,.24)":"rgba(255,255,255,.07)"}`,borderRadius:14,textDecoration:"none",minWidth:"clamp(140px,18vw,190px)",position:"relative",overflow:"hidden",transform:h?"translateY(-10px)":v?"translateY(0)":"translateY(40px)",opacity:v?1:0,boxShadow:h?"0 28px 68px rgba(0,0,0,.38),0 0 44px rgba(0,255,180,.07)":"none",transition:`opacity .6s ${delay}s cubic-bezier(.16,1,.3,1), transform .5s ${delay}s cubic-bezier(.16,1,.3,1), border-color .28s, box-shadow .28s, background .28s`}}>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#00ffb4,#00c8ff)",transform:h?"scaleX(1)":"scaleX(0)",transformOrigin:"left",transition:"transform .4s ease"}} />
      <div style={{width:52,height:52,background:h?"rgba(0,255,180,.13)":"rgba(0,255,180,.07)",border:"1px solid rgba(0,255,180,.17)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",color:"#00ffb4",boxShadow:h?"0 0 26px rgba(0,255,180,.18)":"none",transform:h?"scale(1.08)":"scale(1)",transition:"all .28s"}}>{icon}</div>
      <span style={{fontSize:14,fontWeight:700,color:"#e8f0fe"}}>{label}</span>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#6b8099",letterSpacing:".04em",textAlign:"center"}}>{val}</span>
    </a>
  );
}

function Contact() {
  const [ref,v]=useInView(.08);
  const title=useScramble("Conversar?",v,20);
  return (
    <section id="contact" ref={ref} style={{padding:"clamp(80px,10vw,140px) 0 clamp(60px,8vw,100px)",background:"#070c14",overflow:"hidden",position:"relative",zIndex:2}}>
      <div style={{position:"absolute",width:700,height:700,background:"radial-gradient(circle,#00ffb4,transparent 70%)",borderRadius:"50%",top:"50%",left:"50%",transform:"translate(-50%,-50%)",opacity:.032,pointerEvents:"none"}} />
      {/* Deco SVG rings */}
      <svg style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,opacity:.06,pointerEvents:"none"}} viewBox="0 0 600 600">
        <circle cx="300" cy="300" r="250" fill="none" stroke="#00ffb4" strokeWidth="1" strokeDasharray="8 14" style={{animation:"orbit 32s linear infinite"}} />
        <circle cx="300" cy="300" r="180" fill="none" stroke="#00c8ff" strokeWidth="1" strokeDasharray="4 22" style={{animation:"orbit 22s linear infinite reverse"}} />
        <circle cx="300" cy="300" r="120" fill="none" stroke="#ff3d6e" strokeWidth=".5" strokeDasharray="2 30" style={{animation:"orbit 16s linear infinite"}} />
      </svg>

      <div style={{maxWidth:860,margin:"0 auto",textAlign:"center",position:"relative",zIndex:2,padding:"0 clamp(24px,5vw,48px)"}} className="section-pad">
        <SH eye="Contato" title="Vamos" center />
        <Reveal delay={.05}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(52px,9vw,118px)",lineHeight:.88,letterSpacing:"-.02em",marginTop:-56,marginBottom:34}}>
            <span style={{background:"linear-gradient(135deg,#00ffb4,#00c8ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% auto",animation:"shimmer 4s linear infinite"}}>{title}</span>
          </div>
        </Reveal>
        <Reveal delay={.14}>
          <p style={{fontSize:"clamp(15px,1.7vw,17px)",color:"#6b8099",lineHeight:1.85,maxWidth:480,margin:"0 auto 52px"}}>
            Aberto a oportunidades, freelas e parcerias. Se tiver algo interessante, me manda uma mensagem!
          </p>
        </Reveal>
        <div style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap",marginBottom:44}} className="contact-cards">
          <CCard href="https://github.com/gprsilva" label="GitHub" val="@gprsilva" delay={.1} icon={<GHIcon />} />
          <CCard href="https://www.linkedin.com/in/guilherme-perei-ra-5ab5352bb/" label="LinkedIn" val="Guilherme Pereira" delay={.2} icon={<LIIcon />} />
          <CCard href="mailto:gprsilva2008@gmail.com?subject=Contato%20pelo%20Portfolio" label="Email" val="gprsilva2008@gmail.com" delay={.3} icon={<EMIcon />} />
        </div>
        <Reveal delay={.4}>
          <p style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#6b8099"}}>
            Ou escreve direto:{" "}
            <a href="mailto:gprsilva2008@gmail.com" data-h style={{color:"#00ffb4",textDecoration:"none",borderBottom:"1px solid rgba(0,255,180,.3)",paddingBottom:1,transition:"border-color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#00ffb4"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(0,255,180,.3)"}>
              gprsilva2008@gmail.com
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
function Footer() {
  const sy=useScroll();
  return (
    <footer style={{padding:"clamp(14px,2vw,22px) clamp(24px,5vw,60px)",borderTop:"1px solid rgba(255,255,255,.055)",background:"#04070d",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2,flexWrap:"wrap",gap:10}} className="footer-inner section-pad">
      <p style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#6b8099"}}>© 2026 <span style={{color:"#00ffb4"}}>Guilherme Pereira</span> — Todos os direitos reservados</p>
      <p style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#2d3f54"}}>Feito com <span style={{color:"#ff3d6e"}}>♥</span> e muito café ☕</p>
      {/* Back-to-top */}
      <button data-h onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
        style={{position:"fixed",bottom:28,right:28,width:42,height:42,borderRadius:"50%",background:"rgba(0,255,180,.11)",border:"1px solid rgba(0,255,180,.28)",display:"flex",alignItems:"center",justifyContent:"center",color:"#00ffb4",fontSize:18,transform:sy>400?"translateY(0) scale(1)":"translateY(20px) scale(.8)",opacity:sy>400?1:0,transition:"all .4s cubic-bezier(.16,1,.3,1)",zIndex:400}}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,255,180,.2)";e.currentTarget.style.boxShadow="0 0 20px rgba(0,255,180,.28)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,255,180,.11)";e.currentTarget.style.boxShadow="none";}}>
        ↑
      </button>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════ */
const GHIcon=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
const LIIcon=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const EMIcon=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>;

/* ══════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
export default function App() {
  const [ready,setReady]=useState(false);
  return (
    <>
      <style>{G}</style>
      <Loader onDone={()=>setReady(true)} />
      {ready && (
        <div style={{background:"#04070d",color:"#e8f0fe",fontFamily:"'Outfit',sans-serif",overflowX:"hidden"}}>
          <Cursor />
          <ProgressBar />
          <Particles />
          <Nav />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}