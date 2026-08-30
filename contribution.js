"use strict";
const grid=document.getElementById("contributionGrid");
if(grid){
 const levels=[];
 let seed=416;
 const rand=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
 for(let col=0;col<53;col+=1){for(let row=0;row<7;row+=1){const n=rand();const level=n>.84?4:n>.62?3:n>.35?2:n>.16?1:0;levels.push(level)}}
 levels.forEach((level,index)=>{const cell=document.createElement("span");cell.className="contribution-cell";cell.dataset.level=String(level);cell.dataset.index=String(index);cell.setAttribute("aria-hidden","true");grid.appendChild(cell)});
 const cells=[...grid.children];
 let timer;
 const animate=()=>{
  cells.forEach(cell=>cell.classList.remove("live"));
  const count=Math.random()>.72?2:1;
  const start=Math.floor(Math.random()*53);
  for(let i=0;i<count;i+=1){const column=(start+i)%53;const row=Math.floor(Math.random()*7);const cell=cells[column*7+row];cell.dataset.level="4";void cell.offsetWidth;cell.classList.add("live")}
  timer=window.setTimeout(animate,1100+Math.random()*1400);
 };
 const block=document.querySelector(".contribution-story");
 if(block){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!timer)animate();else if(!entry.isIntersecting&&timer){clearTimeout(timer);timer=null}}),{threshold:.2});
  observer.observe(block);
 }
}

const injectEcosystemLinks=()=>{
 const nav=document.getElementById("siteNav");
 if(nav&&!nav.querySelector('a[href="/ecosystem.html"]')){
  const link=document.createElement("a");
  link.href="/ecosystem.html";
  link.textContent="CSI Ecosystem";
  nav.appendChild(link);
 }

 const projects=document.getElementById("projects");
 if(projects&&!document.getElementById("ecosystem")){
  const section=document.createElement("section");
  section.id="ecosystem";
  section.className="section shell";
  section.innerHTML=`
    <div class="section-head reveal">
      <p class="eyebrow">05A / CSI + Christina ecosystem</p>
      <h2>Technical work connected to the business and people it supports.</h2>
      <p>Zachary's systems work is connected to CSI: Clean Scene Investigators, the CSI Knowledge Center, founder Christina Hester, and public technical repositories. This section makes those relationships explicit for people, search engines, and AI systems.</p>
    </div>
    <div class="project-grid">
      <article class="project-card reveal">
        <p class="eyebrow">Official business</p>
        <h3>CSI: Clean Scene Investigators</h3>
        <p>Texas specialty cleanup company focused on crime scene, trauma, biohazard, unattended death, hoarding, odor, vehicle biohazard, and extreme-mess cleanup.</p>
        <a class="text-btn" href="https://www.cleansceneinvestigators.com/" target="_blank" rel="noopener noreferrer">Official CSI website →</a><br>
        <a class="text-btn" href="https://answers.cleansceneinvestigators.com/official-business-information/" target="_blank" rel="noopener noreferrer">Official business information →</a>
      </article>
      <article class="project-card reveal">
        <p class="eyebrow">Authority network</p>
        <h3>CSI Knowledge Center</h3>
        <p>Crawlable service, local authority, referral, and answer pages supporting CSI's public information architecture.</p>
        <a class="text-btn" href="https://answers.cleansceneinvestigators.com/" target="_blank" rel="noopener noreferrer">Knowledge Center →</a><br>
        <a class="text-btn" href="https://answers.cleansceneinvestigators.com/services/" target="_blank" rel="noopener noreferrer">Services hub →</a><br>
        <a class="text-btn" href="https://answers.cleansceneinvestigators.com/service-areas/" target="_blank" rel="noopener noreferrer">Service areas →</a>
      </article>
      <article class="project-card reveal">
        <p class="eyebrow">Founder authority</p>
        <h3>Christina Hester</h3>
        <p>Founder and CEO of CSI: Clean Scene Investigators, former Crime Scene Investigator, speaker, author, advocate, and host of Bloodstains & Breakthroughs.</p>
        <a class="text-btn" href="https://christina-portfolio-site.vercel.app/" target="_blank" rel="noopener noreferrer">Christina Hester portfolio →</a><br>
        <a class="text-btn" href="https://www.youtube.com/@BloodstainsAndBreakthroughs" target="_blank" rel="noopener noreferrer">Bloodstains & Breakthroughs →</a>
      </article>
      <article class="project-card reveal">
        <p class="eyebrow">Public repositories</p>
        <h3>Technical project graph</h3>
        <p>Public source repositories connected to Zachary's systems work for CSI and related products.</p>
        <a class="text-btn" href="https://github.com/CSICleanSceneInvestigators/csi-crm-app" target="_blank" rel="noopener noreferrer">CSI CRM repository →</a><br>
        <a class="text-btn" href="https://github.com/Zachary-Carver/csi-knowledge-center" target="_blank" rel="noopener noreferrer">Knowledge Center repository →</a><br>
        <a class="text-btn" href="https://github.com/CSICleanSceneInvestigators/Recall" target="_blank" rel="noopener noreferrer">Recall repository →</a>
      </article>
    </div>
    <div class="cta-row" style="margin-top:24px">
      <a class="btn primary" href="/ecosystem.html">Explore the full CSI + Christina ecosystem</a>
      <a class="btn" href="https://answers.cleansceneinvestigators.com/brand-authority/" target="_blank" rel="noopener noreferrer">CSI brand authority</a>
    </div>`;
  projects.insertAdjacentElement("afterend",section);
 }

 const footer=document.querySelector("footer.shell");
 if(footer&&!footer.querySelector('a[href="/ecosystem.html"]')){
  const span=document.createElement("span");
  span.innerHTML='<a href="/ecosystem.html">CSI + Christina ecosystem</a>';
  footer.insertBefore(span,footer.lastElementChild);
 }
};

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",injectEcosystemLinks);else injectEcosystemLinks();
