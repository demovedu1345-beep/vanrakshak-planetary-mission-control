import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js";
const gsap = window.gsap;

const API_BASE=(window.VANRAKSHAK_API_BASE||"").replace(/\/$/,"");
const $=id=>document.getElementById(id), $$=s=>Array.from(document.querySelectorAll(s));
const state={lat:12.3375,lon:75.8069,place:"Kodagu Forest Region",earth:null,map:null,layers:[],integrations:[],sourceHealth:null,events:[],mapMode:"true_color",currentPage:"overview",activeLayers:new Map()};
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc=v=>String(v??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const n=(v,d=1)=>v==null||!Number.isFinite(Number(v))?"—":Number(v).toFixed(d);
const iso=d=>d.toISOString().slice(0,10);
async function api(path,init={}){
 const headers={Accept:"application/json",...(init.headers||{})};
 const separator=path.includes("?")?"&":"?";
 const requestUrl=API_BASE+path+separator+"_ts="+Date.now();
 const r=await fetch(requestUrl,{...init,headers,cache:"no-store"});
 const t=await r.text();let data;try{data=t?JSON.parse(t):{}}catch{throw new Error("Non-JSON provider response")}
 if(!r.ok)throw new Error(typeof data.detail==="string"?data.detail:`HTTP ${r.status}`);
 return data;
}
function toast(message,type="info"){const el=document.createElement("div");el.className="toast"+(type==="error"?" error":"");el.textContent=message;$("toastStack").appendChild(el);setTimeout(()=>el.remove(),4200)}
function icons(){try{window.lucide?.createIcons?.({attrs:{"stroke-width":1.7}})}catch{}}
function envelope(x){return x?.data&&typeof x.data==="object"?x.data:x||{}}
function classify(s){s=String(s||"").toLowerCase();return /ok|live|ready|connected|success|working/.test(s)?"ok":/fallback|optional|auth|configured|partial|warning/.test(s)?"warn":/fail|offline|error|unavailable|down/.test(s)?"bad":""}
function statusLabel(s){return s||"STATUS UNKNOWN"}
function safeStatus(s){return classify(s)}
function setApiStatus(ok){const chip=$("apiChip");if(chip){chip.innerHTML=`<span class="${ok?"ok":"bad"}"></span>${ok?"API CONNECTED":"API UNAVAILABLE"}`};$("healthText").textContent=ok?"API responding":"API unavailable";$("healthOrb").className="health-orb "+(ok?"ok":"bad");$("footerApi").textContent=ok?"API: CONNECTED":"API: UNAVAILABLE"}
function renderJson(obj){return `<pre class="result-json">${esc(JSON.stringify(obj,null,2).slice(0,16000))}</pre>`}
function renderEmpty(text){return `<div class="empty">${esc(text)}</div>`}
function setLocation(lat,lon,place){
 lat=Number(lat);lon=Number(lon);if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180){toast("Invalid latitude or longitude","error");return}
 state.lat=lat;state.lon=lon;state.place=place||"Selected study area";
 const c=Math.abs(lat).toFixed(4)+"° "+(lat>=0?"N":"S")+" · "+Math.abs(lon).toFixed(4)+"° "+(lon>=0?"E":"W");
 $("latRead").textContent=Math.abs(lat).toFixed(4)+"° "+(lat>=0?"N":"S");$("lonRead").textContent=Math.abs(lon).toFixed(4)+"° "+(lon>=0?"E":"W");
 $("focusName").textContent=state.place.toUpperCase();$("regionName").textContent=state.place;$("regionCoords").textContent=c;
 ["mapCoordinateReadout","forestCoords"].forEach(id=>{if($(id))$(id).textContent=c});
 ["forestPlace","firePlace"].forEach(id=>{if($(id))$(id).textContent=state.place});
 if($("mapLat"))$("mapLat").value=lat;if($("mapLon"))$("mapLon").value=lon;
 if(state.map)state.map.flyTo({center:[lon,lat],zoom:6,duration:900});
}
function latLonToVector(lat,lon,radius=2.04){
 const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
 return new THREE.Vector3(-radius*Math.sin(phi)*Math.cos(theta),radius*Math.cos(phi),radius*Math.sin(phi)*Math.sin(theta));
}
function showEarthSelectionEffect(localPoint){
 const earthState=state.earth;if(!earthState)return;
 const normal=localPoint.clone().normalize();
 earthState.selection.position.copy(normal.clone().multiplyScalar(2.035));
 earthState.selection.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),normal);
 earthState.selection.visible=true;earthState.selection.userData.started=performance.now();
 earthState.controls.autoRotate=false;$("autoRotate")?.classList.remove("active");
 const cameraDirection=normal.clone().applyQuaternion(earthState.group.quaternion).normalize();
 const destination=cameraDirection.multiplyScalar(5.15);
 earthState.controls.enabled=false;
 const complete=()=>{earthState.controls.target.set(0,0,0);earthState.controls.enabled=true;earthState.controls.update()};
 if(window.gsap&&!reduced){
  window.gsap.to(earthState.camera.position,{x:destination.x,y:destination.y,z:destination.z,duration:1.25,ease:"power3.inOut",onUpdate:()=>earthState.controls.update(),onComplete:complete});
 }else{earthState.camera.position.copy(destination);complete()}
 const stage=$("globeStage");stage?.classList.remove("is-picking");void stage?.offsetWidth;stage?.classList.add("is-picking");
 window.setTimeout(()=>stage?.classList.remove("is-picking"),1050);
}
function sourceData(result){return result?.data?.data??result?.data??result??null}
function firstText(...values){return values.find(v=>v!==undefined&&v!==null&&String(v).trim()!=="")??"—"}
function showInspectorValue(id,value){const el=$(id);if(el)el.textContent=value==null||value===""?"—":String(value)}
function prettyNumber(value,digits=1,suffix=""){
 if(value===null||value===undefined||value===""||!Number.isFinite(Number(value)))return "Not available";
 return Number(value).toFixed(digits)+suffix;
}
function listFromPayload(value){
 if(Array.isArray(value))return value;
 if(Array.isArray(value?.events))return value.events;
 if(Array.isArray(value?.features))return value.features;
 if(Array.isArray(value?.results))return value.results;
 if(Array.isArray(value?.rows))return value.rows;
 return [];
}
function locationAddress(value){
 const data=sourceData(value)||{};
 const feature=data.features?.[0],props=feature?.properties||data.properties||data;
 return props.address||props;
}
async function loadEarthDetails(lat,lon){
 const panel=$("earthDetailPanel");if(!panel)return;
 const token=(state.earth?.selectionToken||0)+1;if(state.earth)state.earth.selectionToken=token;
 panel.hidden=false;panel.classList.add("is-loading");
 showInspectorValue("earthDetailTitle","Resolving selected point…");
 showInspectorValue("earthDetailStatus","ENRICHING LOCATION");
 showInspectorValue("earthDetailCoords",lat.toFixed(4)+"°, "+lon.toFixed(4)+"°");
 ["earthDetailAdmin","earthDetailCountry","earthDetailElevation","earthDetailSlope","earthDetailAspect","earthDetailTemp","earthDetailHumidity","earthDetailWind","earthDetailRain","earthDetailCloud","earthDetailTrees","earthDetailBiomass","earthDetailCarbon","earthDetailSatellite","earthDetailSceneDate","earthDetailFire","earthDetailEvents","earthDetailPressure","earthDetailPopulation","earthDetailConservation"].forEach(id=>showInspectorValue(id,"Loading…"));
 $("earthEventList").innerHTML='<div class="earth-event-empty">Querying NASA EONET for regional event context…</div>';
 if(window.gsap&&!reduced)window.gsap.fromTo(panel,{y:18,autoAlpha:0},{y:0,autoAlpha:1,duration:.55,ease:"power3.out"});
 const params="lat="+encodeURIComponent(lat)+"&lon="+encodeURIComponent(lon);
 const requests=await Promise.allSettled([
  api("/api/forest-profile?"+params+"&place="+encodeURIComponent("Selected Earth location")),
  api("/api/reverse-geocode?"+params),
  api("/api/eonet/events?"+params+"&days=30&radius_deg=2")
 ]);
 if(state.earth&&token!==state.earth.selectionToken)return;
 const profileResult=requests[0],geoResult=requests[1],eventResult=requests[2];
 const profile=profileResult.status==="fulfilled"?profileResult.value:null;
 const geo=geoResult.status==="fulfilled"?sourceData(geoResult.value):null;
 const address=locationAddress(geoResult.status==="fulfilled"?geoResult.value:null)||{};
 const feature=geo?.features?.[0],props=feature?.properties||geo?.properties||geo||{};
 const displayName=firstText(props.display_name,props.name,profile?.location?.display_name);
 const locality=firstText(address.city,address.town,address.village,address.municipality,address.county,address.state_district,profile?.location?.district,profile?.location?.state);
 const stateName=firstText(address.state,profile?.location?.state);
 const country=firstText(address.country,props.country);
 if(displayName!=="—"){setLocation(lat,lon,displayName);showInspectorValue("earthDetailTitle",displayName)}
 else showInspectorValue("earthDetailTitle","Selected Earth location");
 showInspectorValue("earthDetailAdmin",[locality,stateName].filter(x=>x&&x!=="—").filter((x,i,a)=>a.indexOf(x)===i).join(", ")||"Administrative name unavailable");
 showInspectorValue("earthDetailCountry",country);
 showInspectorValue("earthDetailCoords",Math.abs(lat).toFixed(5)+"° "+(lat>=0?"N":"S")+"  /  "+Math.abs(lon).toFixed(5)+"° "+(lon>=0?"E":"W"));
 if(profileResult.status==="fulfilled"&&profile){
  const env=profile.environment||{},terrain=profile.terrain||{},forest=profile.forest||{},sat=profile.satellite||{},pressure=profile.human_pressure||{},fire=profile.fire||{};
  const tree=forest.dynamic_world_tree_probability;
  showInspectorValue("earthDetailElevation",prettyNumber(terrain.elevation_m,0," m"));
  showInspectorValue("earthDetailSlope",prettyNumber(terrain.slope_deg,1,"°"));
  showInspectorValue("earthDetailAspect",prettyNumber(terrain.aspect_deg,0,"°"));
  showInspectorValue("earthDetailTemp",prettyNumber(env.temperature_c,1,"°C"));
  showInspectorValue("earthDetailHumidity",prettyNumber(env.humidity_pct,0,"%"));
  showInspectorValue("earthDetailWind",prettyNumber(env.wind_kmh,1," km/h"));
  showInspectorValue("earthDetailRain",prettyNumber(env.rain_mm,1," mm"));
  showInspectorValue("earthDetailCloud",prettyNumber(env.cloud_cover_pct,0,"%"));
  showInspectorValue("earthDetailTrees",tree==null?"Unavailable":prettyNumber(Number(tree)<=1?Number(tree)*100:tree,1,"%"));
  showInspectorValue("earthDetailBiomass",prettyNumber(forest.gedi_agbd_mg_per_ha,1," Mg/ha"));
  showInspectorValue("earthDetailCarbon",prettyNumber(forest.carbon_density_t_per_ha_reference,1," t/ha"));
  showInspectorValue("earthDetailSatellite",sat.available_scenes==null?"Unavailable":String(sat.available_scenes)+" scenes · "+(sat.resolution_m||"—")+" m");
  showInspectorValue("earthDetailSceneDate",sat.latest_scene_time?new Date(sat.latest_scene_time).toLocaleString():"No scene returned in the current search window");
  showInspectorValue("earthDetailFire",!fire.configured||fire.detections_in_window==null?"Unavailable":String(fire.detections_in_window));
  showInspectorValue("earthDetailPressure",pressure.mapped_features==null?"Unavailable":String(pressure.mapped_features));
  showInspectorValue("earthDetailPopulation",prettyNumber(pressure.population_reference,0));
  const conservation=profile.conservation,conservationData=conservation?.data??conservation;
  const conservationItem=listFromPayload(conservationData)[0]||conservationData?.site||conservationData?.protected_area||conservationData;
  const conservationName=firstText(conservationItem?.name,conservationItem?.NAME,conservationItem?.site_name,conservationItem?.properties?.name,conservationItem?.properties?.name_eng);
  showInspectorValue("earthDetailConservation",conservationName!=="—"?conservationName:(conservationData?"Reference returned; site name not supplied":"No match returned"));
  const sources=[sat.available_scenes!=null?"STAC satellite catalogue":"",terrain.source||"",pressure.source||"",profile.earth_engine?.configured?"Google Earth Engine configured":""].filter(Boolean);
  showInspectorValue("earthDetailSources",sources.join(" · ")||"Sources are displayed with their respective measurements");
 }else{
  ["earthDetailElevation","earthDetailSlope","earthDetailAspect","earthDetailTemp","earthDetailHumidity","earthDetailWind","earthDetailRain","earthDetailCloud","earthDetailTrees","earthDetailBiomass","earthDetailCarbon","earthDetailSatellite","earthDetailSceneDate","earthDetailFire","earthDetailPressure","earthDetailPopulation","earthDetailConservation"].forEach(id=>showInspectorValue(id,"Provider data unavailable"));
  showInspectorValue("earthDetailSources","Forest profile endpoint unavailable for this point");
 }
 const eventPayload=eventResult.status==="fulfilled"?sourceData(eventResult.value):null;
 const events=listFromPayload(eventPayload);
 showInspectorValue("earthDetailEvents",eventResult.status==="fulfilled"?String(events.length):"Unavailable");
 if(events.length){
  $("earthEventList").innerHTML=events.slice(0,4).map(item=>{
   const p=item.properties||item,geometry=item.geometry?.[0]||item.geometry;
   const title=firstText(item.title,item.name,p.title,p.name,"Environmental event");
   const category=firstText(item.categories?.[0]?.title,p.category,"NASA EONET");
   const date=firstText(geometry?.date,item.updated,p.date,"Date not supplied");
   return '<div class="earth-event-row"><span></span><div><b>'+esc(title)+'</b><small>'+esc(category)+' · '+esc(String(date).slice(0,16))+'</small></div></div>';
  }).join("");
 }else{
  $("earthEventList").innerHTML='<div class="earth-event-empty">'+(eventResult.status==="fulfilled"?"No NASA EONET events were returned for this 30-day, 2° query window.":"NASA EONET could not be reached for this point.")+'</div>';
 }
 panel.classList.remove("is-loading");
 showInspectorValue("earthDetailStatus",profileResult.status==="fulfilled"?"LOCATION INSPECTED":"PARTIAL DATA");
}
function initEarth(){
 const canvas=$("earthCanvas");if(!canvas)return;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,250);camera.position.set(0,0,5.9);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,matchMedia("(pointer: coarse)").matches?1.35:1.8));
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 scene.add(new THREE.AmbientLight(0x8caebf,1.05));
 const sun=new THREE.DirectionalLight(0xfff2df,3.15);sun.position.set(-5,2.8,5);scene.add(sun);
 const rim=new THREE.PointLight(0x48b8d1,1.35,24);rim.position.set(3,-1,-4);scene.add(rim);
 const starGeo=new THREE.BufferGeometry(),count=2800,pos=new Float32Array(count*3);
 for(let i=0;i<count;i++){const r=38+Math.random()*105,t=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1);pos[i*3]=r*Math.sin(p)*Math.cos(t);pos[i*3+1]=r*Math.cos(p);pos[i*3+2]=r*Math.sin(p)*Math.sin(t)}
 starGeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
 const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xc8e4f2,size:.075,transparent:true,opacity:.62,sizeAttenuation:true}));scene.add(stars);
 const group=new THREE.Group();scene.add(group);
 const geometry=new THREE.SphereGeometry(2,192,192);
 const earthMat=new THREE.MeshPhongMaterial({color:0xffffff,shininess:22,specular:new THREE.Color(0x557c9a),bumpScale:.035});
 const earth=new THREE.Mesh(geometry,earthMat);group.add(earth);
 const loader=new THREE.TextureLoader();loader.setCrossOrigin("anonymous");
 const loadTexture=(url,colorTexture=true)=>new Promise(resolve=>loader.load(url,texture=>{
  texture.colorSpace=colorTexture?THREE.SRGBColorSpace:THREE.NoColorSpace;
  texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);resolve(texture);
 },undefined,()=>resolve(null)));
 const assets={
  day:"https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/january/world.200401.3x5400x2700.jpg",
  dayFallback:"https://cdn.jsdelivr.net/npm/three-globe@2.45.2/example/img/earth-blue-marble.jpg",
  topology:"https://cdn.jsdelivr.net/npm/three-globe@2.45.2/example/img/earth-topology.png",
  water:"https://cdn.jsdelivr.net/npm/three-globe@2.45.2/example/img/earth-water.png",
  night:"https://cdn.jsdelivr.net/npm/three-globe@2.45.2/example/img/earth-night.jpg",
  clouds:"https://raw.githubusercontent.com/turban/webgl-earth/master/images/fair_clouds_4k.png"
 };
 const nightMat=new THREE.ShaderMaterial({
  uniforms:{nightMap:{value:null},sunDirection:{value:sun.position.clone().normalize()}},
  vertexShader:"varying vec2 vUv;varying vec3 vNormalWorld;void main(){vUv=uv;vNormalWorld=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
  fragmentShader:"uniform sampler2D nightMap;uniform vec3 sunDirection;varying vec2 vUv;varying vec3 vNormalWorld;void main(){float light=dot(normalize(vNormalWorld),normalize(sunDirection));float darkSide=1.0-smoothstep(-0.08,0.18,light);vec3 lights=texture2D(nightMap,vUv).rgb;float mask=smoothstep(0.08,0.48,max(max(lights.r,lights.g),lights.b));float alpha=darkSide*mask*0.95;gl_FragColor=vec4(lights*vec3(1.0,0.62,0.30)*1.35,alpha);}",
  transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
 });
 const nightLayer=new THREE.Mesh(new THREE.SphereGeometry(2.004,160,160),nightMat);group.add(nightLayer);
 const cloudMat=new THREE.MeshPhongMaterial({color:0xffffff,transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide});
 const clouds=new THREE.Mesh(new THREE.SphereGeometry(2.018,128,128),cloudMat);group.add(clouds);
 const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(2.105,96,96),new THREE.ShaderMaterial({
  transparent:true,side:THREE.BackSide,depthWrite:false,blending:THREE.AdditiveBlending,
  uniforms:{glowColor:{value:new THREE.Color(0x62b9e2)}},
  vertexShader:"varying vec3 vN;varying vec3 vV;void main(){vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.0);vV=-mv.xyz;gl_Position=projectionMatrix*mv;}",
  fragmentShader:"uniform vec3 glowColor;varying vec3 vN;varying vec3 vV;void main(){float edge=pow(1.0-max(dot(normalize(vN),normalize(vV)),0.0),2.25);gl_FragColor=vec4(glowColor,edge*.66);}"
 }));group.add(atmosphere);
 const markers=new THREE.Group();group.add(markers);
 const selection=new THREE.Group();selection.visible=false;group.add(selection);
 const core=new THREE.Mesh(new THREE.SphereGeometry(.035,24,24),new THREE.MeshBasicMaterial({color:0xe8fbff}));
 const ringA=new THREE.Mesh(new THREE.TorusGeometry(.052,.006,8,56),new THREE.MeshBasicMaterial({color:0x8ce9ff,transparent:true,opacity:.95,depthWrite:false}));
 const ringB=new THREE.Mesh(new THREE.TorusGeometry(.052,.003,8,56),new THREE.MeshBasicMaterial({color:0xf4bf79,transparent:true,opacity:.75,depthWrite:false}));
 const ringC=new THREE.Mesh(new THREE.TorusGeometry(.052,.002,8,56),new THREE.MeshBasicMaterial({color:0x8ce9ff,transparent:true,opacity:.45,depthWrite:false}));
 selection.add(core,ringA,ringB,ringC);selection.userData.rings=[ringA,ringB,ringC];selection.position.set(0,0,2.035);
 const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.055;controls.enablePan=false;controls.minDistance=4.15;controls.maxDistance=8.7;controls.autoRotate=!reduced;controls.autoRotateSpeed=.22;controls.rotateSpeed=.44;controls.zoomSpeed=.68;controls.target.set(0,0,0);
 const resize=()=>{const b=canvas.getBoundingClientRect();if(!b.width||!b.height)return;camera.aspect=b.width/b.height;camera.updateProjectionMatrix();renderer.setSize(b.width,b.height,false);renderer.setPixelRatio(Math.min(devicePixelRatio||1,matchMedia("(pointer: coarse)").matches?1.35:1.8))};
 const ro=new ResizeObserver(resize);ro.observe(canvas.parentElement);resize();
 const draw=now=>{
  if(!canvas.isConnected){ro.disconnect();renderer.dispose();controls.dispose();return}
  if(!document.hidden){
   controls.update();clouds.rotation.y+=reduced?0:.00010;stars.rotation.y-=.000006;
   if(selection.visible){
    const t=(now-(selection.userData.started||now))/1000;
    selection.userData.rings.forEach((ring,index)=>{
     const progress=((t*.68+index*.34)%1);const scale=.85+progress*1.9;
     ring.scale.setScalar(scale);ring.material.opacity=(1-progress)*(.82-index*.12);
    });
   }
   renderer.render(scene,camera);
  }
  requestAnimationFrame(draw);
 };
 requestAnimationFrame(draw);
 Promise.all([loadTexture(assets.day,true),loadTexture(assets.topology,false),loadTexture(assets.water,false),loadTexture(assets.night,true),loadTexture(assets.clouds,false)]).then(async([day,topology,water,night,cloud])=>{
  let surface=day;if(!surface)surface=await loadTexture(assets.dayFallback);
  if(surface){earthMat.map=surface;earthMat.color.set(0xffffff);earthMat.needsUpdate=true}
  if(topology){earthMat.bumpMap=topology;earthMat.bumpScale=.026;earthMat.needsUpdate=true}
  if(water){earthMat.specularMap=water;earthMat.specular.set(0x667f98);earthMat.shininess=24;earthMat.needsUpdate=true}
  if(night){nightMat.uniforms.nightMap.value=night;nightMat.needsUpdate=true}else nightLayer.visible=false;
  if(cloud){cloudMat.map=cloud;cloudMat.needsUpdate=true}else clouds.visible=false;
  $("textureStatus").textContent=surface?(day?"NASA BLUE MARBLE · 5.4K":"EARTH SURFACE TEXTURE READY"):"SURFACE TEXTURE FALLBACK";
 });
 state.earth={scene,camera,renderer,controls,group,markers,earth,clouds,selection,selectionToken:0};
 let pointerStart=null;const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();canvas.style.cursor="crosshair";
 canvas.addEventListener("pointerdown",event=>{pointerStart={x:event.clientX,y:event.clientY,id:event.pointerId}});
 canvas.addEventListener("pointerup",event=>{
  if(!pointerStart||pointerStart.id!==event.pointerId)return;
  const moved=Math.hypot(event.clientX-pointerStart.x,event.clientY-pointerStart.y);pointerStart=null;if(moved>7)return;
  const bounds=canvas.getBoundingClientRect();pointer.x=((event.clientX-bounds.left)/bounds.width)*2-1;pointer.y=-((event.clientY-bounds.top)/bounds.height)*2+1;
  raycaster.setFromCamera(pointer,camera);
  const markerHit=raycaster.intersectObjects(markers.children,false)[0];
  const earthHit=raycaster.intersectObject(earth,false)[0];
  const hit=markerHit&&(!earthHit||markerHit.distance<earthHit.distance)?markerHit:earthHit;if(!hit)return;
  const local=group.worldToLocal(hit.point.clone()).normalize();
  const lat=Math.asin(THREE.MathUtils.clamp(local.y,-1,1))*180/Math.PI;
  const lon=((Math.atan2(local.z,-local.x)*180/Math.PI-180+540)%360)-180;
  showEarthSelectionEffect(local);setLocation(lat,lon,"Resolving selected point…");loadEarthDetails(lat,lon);
 });
 canvas.addEventListener("pointercancel",()=>{pointerStart=null});
 $("autoRotate").addEventListener("click",()=>{controls.autoRotate=!controls.autoRotate;$("autoRotate").classList.toggle("active",controls.autoRotate)});
 $("resetGlobe").addEventListener("click",()=>{
  if(window.gsap&&!reduced)window.gsap.to(camera.position,{x:0,y:0,z:5.9,duration:.9,ease:"power2.inOut"});
  else camera.position.set(0,0,5.9);
  controls.target.set(0,0,0);controls.enabled=true;controls.autoRotate=true;$("autoRotate").classList.add("active");selection.visible=false;
 });
 $("closeEarthDetail")?.addEventListener("click",()=>{$("earthDetailPanel").hidden=true;selection.visible=false});
}

function addMarkers(events){
 if(!state.earth)return;const group=state.earth.markers;
 while(group.children.length){const marker=group.children[0];group.remove(marker);marker.geometry?.dispose();if(Array.isArray(marker.material))marker.material.forEach(m=>m.dispose());else marker.material?.dispose()}
 for(const e of (events||[]).slice(0,250)){
  let coords=e.geometry?.coordinates;
  if(Array.isArray(e.geometry)&&e.geometry[0])coords=e.geometry[0].coordinates;
  if(!coords&&Array.isArray(e.coordinates))coords=e.coordinates;
  if(!Array.isArray(coords)||coords.length<2)continue;
  const [lon,lat]=coords;if(!Number.isFinite(lat)||!Number.isFinite(lon))continue;
  const marker=new THREE.Mesh(new THREE.SphereGeometry(.025,12,12),new THREE.MeshBasicMaterial({color:0xf0aa70}));
  marker.position.copy(latLonToVector(lat,lon,2.025));marker.userData={lat,lon,event:e};group.add(marker);
 }
}
function initMap(){
 if(state.map||!window.maplibregl||!$("worldMap"))return;
 const style={version:8,sources:{osm:{type:"raster",tiles:["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],tileSize:256,attribution:"© OpenStreetMap contributors"}},layers:[{id:"osm",type:"raster",source:"osm"}]};
 state.map=new maplibregl.Map({container:"worldMap",style,center:[state.lon,state.lat],zoom:5.2,minZoom:2,maxZoom:16});
 state.map.addControl(new maplibregl.NavigationControl(),"top-right");
 state.map.on("click",e=>{showEarthSelectionEffect(latLonToVector(e.lngLat.lat,e.lngLat.lng,2.03));setLocation(e.lngLat.lat,e.lngLat.lng,"Resolving selected point…");loadEarthDetails(e.lngLat.lat,e.lngLat.lng);toast("Location selected")});
}
async function loadOverview(){
 const q=`?lat=${state.lat}&lon=${state.lon}`;
 const calls=await Promise.allSettled([api("/api/health"),api("/api/source-health"+q),api("/api/layers"),api("/api/eonet/events"+q+"&days=30&radius_deg=8"),api("/api/weather"+q),api("/api/fire"+q+"&days=1")]);
 const [health,sources,layers,events,weather,fire]=calls;
 const online=health.status==="fulfilled"&&health.value.ok!==false;setApiStatus(online);
 if(sources.status==="fulfilled"){state.sourceHealth=sources.value;renderProviders(sources.value)}else renderProviders(null);
 if(layers.status==="fulfilled"){state.layers=layers.value.groups||[];const count=state.layers.reduce((s,g)=>s+(g.layers||[]).length,0);$("layerCount").textContent=count||"—"}
 const ev=events.status==="fulfilled"?envelope(events.value):{};state.events=ev.events||ev.features||[];renderEvents(state.events);addMarkers(state.events);
 if(weather.status==="fulfilled")renderWeather(weather.value);else renderWeather(null);
 if(fire.status==="fulfilled")renderFireSignal(fire.value);else renderFireSignal(null);
 if(!online)toast("Dashboard is available; the backend API health check failed. No data is simulated.","error");
}
function renderProviders(payload){
 let list=payload?.sources||payload?.providers||payload?.checks||[];
 if(!Array.isArray(list)&&list&&typeof list==="object")list=Object.entries(list).map(([name,value])=>({name,...(typeof value==="object"?value:{status:value})}));
 if(!Array.isArray(list))list=[];
 const ready=list.filter(s=>classify(s.status||s.state||(s.ok?"connected":""))==="ok").length;
 $("providerCount").textContent=list.length?ready:"—";
 $("providerList").innerHTML=list.length?list.slice(0,6).map(s=>{const st=s.status||s.state||(s.ok?"connected":"unknown");return `<div class="provider-row"><i class="provider-dot ${classify(st)}"></i><b>${esc(s.name||s.source||s.provider||s.service||"Provider")}</b><small>${esc(st)}</small></div>`}).join(""):renderEmpty("Provider health unavailable; sources are not assumed online.");
}
function renderEvents(events){
 const root=$("eventFeed");if(!events.length){root.innerHTML=renderEmpty("No events were returned for this location and time window. This does not imply zero events elsewhere.");return}
 root.innerHTML=events.slice(0,5).map(e=>{const title=e.title||e.name||"Environmental event",cat=e.categories?.[0]?.title||"Natural event",date=e.geometry?.[0]?.date||e.updated||"Date not supplied";return `<div class="event-row"><span class="event-icon"><i data-lucide="activity"></i></span><div><b>${esc(title)}</b><small>${esc(cat)} · ${esc(String(date).slice(0,16))}</small></div><span class="event-meta">NASA EONET<br>EVENT CONTEXT</span></div>`}).join("");icons();
}
function renderWeather(result){
 if(!result){$("tempValue").textContent="—";$("rainValue").textContent="—";$("tempMeta").textContent="Unavailable";$("rainMeta").textContent="Unavailable";return}
 const d=envelope(result),cur=d.current||d,units=d.current_units||{};
 const temp=cur.temperature_2m??cur.temperature,rain=cur.precipitation??cur.rain,humidity=cur.relative_humidity_2m??cur.humidity,wind=cur.wind_speed_10m??cur.wind_speed;
 $("tempValue").textContent=temp==null?"—":n(temp)+"°";$("tempMeta").textContent=result.source||"Provider response";
 $("rainValue").textContent=rain==null?"—":n(rain)+" mm";$("rainMeta").textContent=units.precipitation||"Provider units";
 if($("climateTemp")){$("climateTemp").textContent=temp==null?"—":n(temp)+"°";$("climateHumidity").textContent=humidity==null?"—":n(humidity,0)+"%";$("climateRain").textContent=rain==null?"—":n(rain)+" mm";$("climateWind").textContent=wind==null?"—":n(wind)}
 if($("climateResult"))$("climateResult").innerHTML=renderJson(result);
}
function renderFireSignal(result){
 const d=result?envelope(result):{},rows=d.rows||d.features||d.events||[];
 $("fireValue").textContent=result?rows.length:"—";$("fireMeta").textContent=result?.source||d.source||(result?"Provider response":"Unavailable");
}
function navigate(page){
 state.currentPage=page;
 $$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 $$(".page-view").forEach(v=>v.classList.toggle("active",v.dataset.view===page));
 const btn=document.querySelector(`.nav-btn[data-page="${page}"]`);$("crumb").textContent=btn?.querySelector("span")?.textContent||"Mission Control";
 $("scrollArea").scrollTo({top:0,behavior:reduced?"auto":"smooth"});
 if(window.gsap&&!reduced)gsap.fromTo(`[data-view="${page}"] .page-head`,{y:9,opacity:.4},{y:0,opacity:1,duration:.42,ease:"power2.out"});
 if(page==="observatory"||page==="layers")setTimeout(initMap,60);
 if(page==="satellites")loadSatellites();if(page==="layers")loadLayers();if(page==="forest")loadForest();if(page==="fire")loadFire();if(page==="climate")loadClimate();if(page==="systems")loadSystems();
 icons();
}
async function loadSatellites(){
 const root=$("missionGrid");root.innerHTML='<div class="loading">Discovering connected mission platforms and data-product catalogues…</div>';
 if(!state.layers.length){try{const catalogue=await api("/api/layers");state.layers=catalogue.groups||[]}catch{}}
 const q="?lat="+state.lat+"&lon="+state.lon;
 const calls=await Promise.allSettled([
  api("/api/satellite/latest"+q+"&days=45&cloud_lt=70"),
  api("/api/satellite/sentinel1"+q+"&days=45"),
  api("/api/satellite/landsat"+q+"&days=90&cloud_lt=70"),
  api("/api/gibs/catalog"),
  api("/api/earth-engine/catalog"),
  api("/api/bhuvan/info"),
  api("/api/mosdac/info")
 ]);
 const card=(name,category,sensor,description,status,layerId,searchText)=>{
  const cls=classify(status);
  return '<article class="mission-card" data-search="'+esc((name+" "+category+" "+sensor+" "+(searchText||"")).toLowerCase())+'" data-category="'+(/radar|sar/i.test(category+" "+sensor)?"radar":/thermal|fire/i.test(category)?"thermal":/climate|precip|soil|atmosphere/i.test(category)?"climate":"optical")+'"><div class="mission-top"><span class="mission-tag">'+esc(category)+'</span><span class="state-tag '+cls+'">'+esc(status)+'</span></div><h3>'+esc(name)+'</h3><p>'+esc(description)+'</p><div class="mission-meta"><span>'+esc(sensor)+'</span><span>'+esc(layerId?"Layer registered":"Service catalogue")+'</span></div>'+(layerId?'<button class="link-btn mission-open-layer" data-mission-layer="'+esc(layerId)+'">OPEN DATA LAYER <i data-lucide="arrow-up-right"></i></button>':'')+'</article>';
 };
 const cards=[],defs=[
  {name:"Sentinel-2A / 2B",category:"OPTICAL MULTISPECTRAL",sensor:"MSI · Copernicus",desc:"Recent Level-2A scene discovery and supported spectral modes.",result:calls[0],layer:"sentinel2"},
  {name:"Sentinel-1A / 1B",category:"C-BAND SAR RADAR",sensor:"C-SAR · ASF / Copernicus",desc:"Radar scene discovery. Availability is not a measured SAR-change result.",result:calls[1],layer:"sentinel1"},
  {name:"Landsat 8 / 9",category:"OPTICAL / THERMAL",sensor:"OLI / TIRS · USGS",desc:"Historical multispectral and thermal scene discovery.",result:calls[2],layer:"landsat"}
 ];
 for(const d of defs){const status=d.result.status==="fulfilled"?(d.result.value.status||d.result.value.freshness||"ENDPOINT RESPONDED"):"UNAVAILABLE";const desc=d.desc+" "+(d.result.status==="fulfilled"?(d.result.value.source||"Provider responded."):(d.result.reason?.message||"Provider unavailable."));cards.push(card(d.name,d.category,d.sensor,desc,status,d.layer))}
 const rows=state.layers.flatMap(g=>g.layers||[]);
 const hasLayer=id=>rows.some(l=>l.id===id);
 const gibs=calls[3].status==="fulfilled"?(calls[3].value.layers||[]):[];
 const gibsIds=gibs.map(x=>String(x.id||x.identifier||x.layer||x.title||"").toLowerCase()).join(" ");
 const gibsHas=id=>gibsIds.includes(id);
 const eeLayers=calls[4].status==="fulfilled"?(calls[4].value.layers||{}):{};
 const eeText=JSON.stringify(eeLayers).toLowerCase();
 const candidates=[
  {test:hasLayer("nasa_modis_terra")||gibsHas("modis_terra"),name:"Terra MODIS",category:"MODERATE-RESOLUTION OPTICAL / THERMAL",sensor:"MODIS · Terra",desc:"NASA GIBS true-colour and supported MODIS observation products.",layer:"nasa_modis_terra"},
  {test:hasLayer("nasa_modis_aqua")||gibsHas("modis_aqua"),name:"Aqua MODIS",category:"MODERATE-RESOLUTION OPTICAL / THERMAL",sensor:"MODIS · Aqua",desc:"NASA GIBS imagery and catalogue-backed Aqua observation products.",layer:"nasa_modis_aqua"},
  {test:hasLayer("nasa_viirs_snpp")||gibsHas("viirs_snpp"),name:"Suomi NPP VIIRS",category:"THERMAL / NIGHT LIGHTS",sensor:"VIIRS · JPSS",desc:"NASA/NOAA VIIRS imagery and thermal observation layers.",layer:"nasa_viirs_snpp"},
  {test:hasLayer("nasa_imerg_rain")||gibsHas("imerg_precipitation_rate"),name:"GPM IMERG",category:"PRECIPITATION / MICROWAVE",sensor:"DPR / GMI · NASA / JAXA",desc:"GPM precipitation product available through the current NASA imagery catalogue.",layer:"nasa_imerg_rain"},
  {test:hasLayer("nasa_smap_soil_moisture")||gibsHas("smap_soil_moisture"),name:"SMAP",category:"MICROWAVE SOIL MOISTURE",sensor:"L-Band Radiometer · NASA",desc:"NASA SMAP soil-moisture browse layer where available.",layer:"nasa_smap_soil_moisture"},
  {test:hasLayer("nasa_opera_dist")||gibsHas("opera_dist_alert_hls"),name:"NASA OPERA HLS",category:"SURFACE DISTURBANCE",sensor:"OPERA · NASA",desc:"Harmonized Landsat Sentinel disturbance-alert product.",layer:"nasa_opera_dist"},
  {test:hasLayer("biomass")||eeText.includes("gedi_agbd"),name:"ISS GEDI",category:"WAVEFORM LIDAR / BIOMASS",sensor:"GEDI · International Space Station",desc:"Above-ground biomass-density layer registered through Earth Engine.",layer:"biomass"},
  {test:hasLayer("forest_cover")||eeText.includes("dynamic_world"),name:"Dynamic World",category:"LAND COVER / VEGETATION",sensor:"Sentinel-2-derived classification",desc:"Dynamic World land-cover layer with its configured provider/fallback semantics.",layer:"forest_cover"}
 ];
 for(const m of candidates)if(m.test)cards.push(card(m.name,m.category,m.sensor,m.desc,"CATALOGUE AVAILABLE",m.layer));
 if(calls[5].status==="fulfilled")cards.push(card("ISRO Bhuvan","INDIAN EARTH OBSERVATION PORTAL","NRSC / ISRO WMS","Bhuvan service metadata responded. Exact thematic layers depend on its published catalogue.","METADATA RESPONDED","","Bhuvan"));
 if(calls[6].status==="fulfilled")cards.push(card("ISRO MOSDAC","INDIAN METEOROLOGICAL DATA PORTAL","MOSDAC / ISRO","MOSDAC service metadata responded. Authenticated product download may be required.","METADATA RESPONDED","","MOSDAC"));
 root.innerHTML=cards.length?cards.join(""):'<div class="empty">No satellite or product catalogue entries were returned. Check provider health and the layer registry.</div>';
 $("missionStatus").textContent=cards.length+" MISSION / PRODUCT ENTRIES";
 $("missionSearch").oninput=()=>{const term=$("missionSearch").value.toLowerCase();$$(".mission-card").forEach(c=>c.hidden=!c.dataset.search.includes(term))};
 $("missionFilters").onclick=e=>{const b=e.target.closest("[data-filter]");if(!b)return;$$("#missionFilters button").forEach(x=>x.classList.toggle("selected",x===b));$$(".mission-card").forEach(c=>c.hidden=b.dataset.filter!=="all"&&c.dataset.category!==b.dataset.filter)};
 $$(".mission-open-layer").forEach(btn=>btn.addEventListener("click",async()=>{navigate("layers");await loadLayers();const layer=state.layers.flatMap(g=>g.layers||[]).find(x=>x.id===btn.dataset.missionLayer);if(layer)await toggleLayer(layer,true,null);else toast("No matching rendered data layer is registered for this mission.","error")}));
 icons();
}
function renderResult(target,data){$(target).innerHTML=renderJson(data)}
async function loadLayers(){
 const root=$("layerGroups");root.innerHTML='<div class="loading">Loading connected layer catalogue…</div>';
 try{const data=await api("/api/layers");state.layers=data.groups||[];renderLayers();renderActiveLayers();$("layersStatus").textContent=state.layers.reduce((n,g)=>n+(g.layers||[]).length,0)+" REGISTERED LAYERS"}
 catch(e){root.innerHTML=renderEmpty(e.message);$("layersStatus").textContent="REGISTRY UNAVAILABLE"}
}
function renderLayers(){
 const q=($("layerSearch")?.value||"").toLowerCase(),groups=state.layers||[];
 const filtered=groups.map(g=>({...g,layers:(g.layers||[]).filter(l=>((l.label||"")+" "+(l.source||"")+" "+(l.id||"")+" "+(l.render||"")).toLowerCase().includes(q))})).filter(g=>g.layers.length);
 $("filterCount").textContent=filtered.reduce((n,g)=>n+g.layers.length,0)+" matching layers";
 $("layerGroups").innerHTML=filtered.length?filtered.map(g=>'<section class="layer-group"><div class="layer-group-head"><b>'+esc(g.icon||"◈")+" "+esc(g.label||g.name||"Data layers")+'</b><small>'+g.layers.length+' LAYERS</small></div><div class="layer-list">'+g.layers.map(l=>'<label class="layer-item"><input type="checkbox" data-layer="'+esc(l.id)+'" '+(state.activeLayers.has(l.id)?"checked":"")+'><span><b>'+esc(l.label||l.id)+'</b><small>'+esc(l.source||"Source not supplied")+' · '+(l.resolution_m==null?"Resolution N/A":esc(l.resolution_m)+" m")+' · '+esc(l.freshness||"")+'</small></span><em>'+esc((l.render||"").replaceAll("_"," "))+'</em></label>').join("")+'</div></section>').join(""):renderEmpty("No layer entries matched this filter.");
 $("[data-layer]").forEach(input=>input.addEventListener("change",()=>{const l=groups.flatMap(g=>g.layers||[]).find(x=>x.id===input.dataset.layer);if(l)toggleLayer(l,input.checked,input)}));
}
function ensureLayerMapReady(){
 initMap();
 if(!state.map)return Promise.reject(new Error("MapLibre is unavailable"));
 return state.map.isStyleLoaded()?Promise.resolve():new Promise(resolve=>state.map.once("load",resolve));
}
function layerPath(layer){
 const p=encodeURIComponent;
 if(layer.render==="satellite")return "/api/map/satellite-layer?lat="+state.lat+"&lon="+state.lon+"&mode="+p(layer.mode||"true_color")+"&days=90&cloud_lt=70";
 if(layer.render==="gibs")return "/api/gibs/layer/"+p(layer.gibs_layer)+"?date="+dateForImagery();
 if(layer.render==="earth_engine")return "/api/earth-engine/layer/"+p(layer.ee_layer)+"?lat="+state.lat+"&lon="+state.lon+"&days=90";
 if(layer.render==="gfw")return "/api/map/gfw-layer?dataset="+p(layer.dataset)+"&confidence=high";
 return "";
}
function dateForImagery(){return iso(new Date(Date.now()-2*86400000))}
function renderLayerInspector(title,payload){
 const root=$("layerInspectorContent");
 if(!root)return;
 root.innerHTML='<div class="inspector-title"><small>SELECTED DATA SOURCE</small><b>'+esc(title)+'</b></div>'+renderJson(payload);
}
function renderActiveLayers(){
 const root=$("activeLayerList");if(!root)return;
 const rows=Array.from(state.activeLayers.values());
 $("activeLayerCount").textContent=rows.length+" ACTIVE";
 root.innerHTML=rows.length?rows.map(x=>'<span class="active-layer-chip">'+esc(x.label)+'<button type="button" data-remove-layer="'+esc(x.id)+'" aria-label="Remove '+esc(x.label)+'">×</button></span>').join(""):'<span class="muted">No raster overlays selected.</span>';
 $("[data-remove-layer]").forEach(btn=>btn.addEventListener("click",()=>removeActiveLayer(btn.dataset.removeLayer)));
}
function removeActiveLayer(id){
 const rec=state.activeLayers.get(id);if(!rec)return;
 try{if(state.map?.getLayer(rec.layer))state.map.removeLayer(rec.layer);if(state.map?.getSource(rec.source))state.map.removeSource(rec.source)}catch{}
 state.activeLayers.delete(id);renderLayers();renderActiveLayers();
}
async function installRasterLayer(layer,result){
 await ensureLayerMapReady();
 if(!result?.tile_url)throw new Error("The provider did not return a usable tile URL");
 removeActiveLayer(layer.id);
 const source="earthscope-src-"+layer.id,layerId="earthscope-layer-"+layer.id;
 state.map.addSource(source,{type:"raster",tiles:[result.tile_url],tileSize:256,maxzoom:Number(result.max_zoom||result.maxzoom||18),attribution:result.attribution||result.source||layer.source||"Data provider"});
 state.map.addLayer({id:layerId,type:"raster",source,paint:{"raster-opacity":.78,"raster-fade-duration":180}});
 state.activeLayers.set(layer.id,{id:layer.id,label:layer.label,source,layer:layerId,provider:result.source||layer.source||"Unknown",freshness:result.freshness||layer.freshness||"UNKNOWN"});
 state.map.flyTo({center:[state.lon,state.lat],zoom:Math.max(5,Math.min(8,state.map.getZoom())),duration:650});
 renderActiveLayers();renderLayers();renderLayerInspector(layer.label,result);
 toast(layer.label+" enabled · "+(result.source||layer.source||"provider"));
}
function rowsFromResult(result){
 const data=result?.data??result;
 if(Array.isArray(data))return data;
 return data?.rows||data?.features||data?.observations||data?.events||[];
}
async function installPointFeatures(layer,features){
 await ensureLayerMapReady();
 removeActiveLayer(layer.id);
 if(!features.length)throw new Error("The provider returned no mappable features for this request.");
 const source="earthscope-src-"+layer.id,layerId="earthscope-layer-"+layer.id;
 state.map.addSource(source,{type:"geojson",data:{type:"FeatureCollection",features}});
 state.map.addLayer({id:layerId,type:"circle",source,paint:{"circle-radius":["interpolate",["linear"],["zoom"],3,3,10,6],"circle-color":layer.id==="active_fire"?"#f07868":"#7ee0b6","circle-stroke-width":1,"circle-stroke-color":"#f4fff9","circle-opacity":.9}});
 state.activeLayers.set(layer.id,{id:layer.id,label:layer.label,source,layer:layerId,provider:layer.source||"Provider data",freshness:layer.freshness||"UNKNOWN"});
 renderActiveLayers();renderLayers();renderLayerInspector(layer.label,{source:layer.source,feature_count:features.length,features:features.slice(0,20)});
 toast(layer.label+" enabled · "+features.length+" features");
}
async function toggleLayer(layer,enabled,input){
 if(!enabled){removeActiveLayer(layer.id);return}
 input&&(input.disabled=true);
 try{
  if(layer.render==="satellite"||layer.render==="gibs"||layer.render==="earth_engine"||layer.render==="gfw"){
   const result=await api(layerPath(layer));await installRasterLayer(layer,result);return;
  }
  if(layer.render==="firms_points"){
   const result=await api("/api/fire?lat="+state.lat+"&lon="+state.lon+"&days=3");
   const rows=rowsFromResult(result);
   const features=rows.map(row=>{
    const p=row.properties||row;
    const lat=Number(p.latitude??p.lat??p.y),lon=Number(p.longitude??p.lon??p.x);
    return Number.isFinite(lat)&&Number.isFinite(lon)?{type:"Feature",geometry:{type:"Point",coordinates:[lon,lat]},properties:p}:null;
   }).filter(Boolean);
   renderLayerInspector(layer.label,result);if(features.length)await installPointFeatures(layer,features);else toast("Fire source responded but returned no georeferenced points for this query.");return;
  }
  if(layer.render==="overpass"){
   const result=await api("/api/human-pressure?lat="+state.lat+"&lon="+state.lon+"&radius_m=5000");
   const data=result.data||{},features=(data.elements||[]).map(item=>{
    const p=item.tags||{},lat=Number(item.lat??item.center?.lat),lon=Number(item.lon??item.center?.lon);
    if(Number.isFinite(lat)&&Number.isFinite(lon))return {type:"Feature",geometry:{type:"Point",coordinates:[lon,lat]},properties:{...p,osm_id:item.id,osm_type:item.type}};
    return null;
   }).filter(Boolean);
   renderLayerInspector(layer.label,result);if(features.length)await installPointFeatures(layer,features);else toast("Overpass returned no point locations to plot.");return;
  }
  if(layer.render==="protected_context"){
   const result=await api("/api/protected-area/context?lat="+state.lat+"&lon="+state.lon);
   renderLayerInspector(layer.label,result);toast("Protected-area context loaded from the configured provider chain.");return;
  }
  if(layer.render==="point_data"){
   const soilIds=["soil_type","soil_ph","soc","nitrogen","texture","bulk_density","cec"];
   if(soilIds.includes(layer.id)){
    const result=await api("/api/soil?lat="+state.lat+"&lon="+state.lon);
    renderLayerInspector(layer.label,result);
    toast(layer.label+" provider response received for the selected point.");
    return;
   }
   const result=await api("/api/weather?lat="+state.lat+"&lon="+state.lon);
   const d=result.data||{},current=d.current||{},hourly=d.hourly||{},cu=d.current_units||{},hu=d.hourly_units||{};
   const hourlyFields={
    soil_moisture:["soil_moisture_0_to_1cm","soil_moisture_1_to_3cm"],
    evapotranspiration:["et0_fao_evapotranspiration"]
   };
   const currentFields={
    temperature:["temperature_2m"],
    rainfall:["precipitation","rain"],
    precipitation:["precipitation"],
    humidity:["relative_humidity_2m"],
    wind:["wind_speed_10m","wind_direction_10m"],
    cloud_cover:["cloud_cover"]
   };
   const fields=hourlyFields[layer.id]||currentFields[layer.id]||[];
   const source=hourlyFields[layer.id]?hourly:current;
   const units=hourlyFields[layer.id]?hu:cu;
   const timeList=hourlyFields[layer.id]?(hourly.time||[]):[];
   const latestIndex=timeList.length?timeList.length-1:-1;
   const values={};
   for(const field of fields){
    const arr=source[field];
    const value=Array.isArray(arr)?arr[latestIndex]:arr;
    values[field]=value==null?null:{value,unit:units[field]||"provider unit not supplied"};
   }
   const available=Object.values(values).some(x=>x&&x.value!=null);
   const payload={
    label:"DIRECT_PROVIDER_RESPONSE",
    requested_variable:layer.id,
    location:{name:state.place,lat:state.lat,lon:state.lon},
    source:result.provenance?.source||result.source||"Open-Meteo",
    source_url:result.provenance?.source_url||"https://open-meteo.com/",
    temporal_reference:hourlyFields[layer.id]?(timeList[latestIndex]||null):(current.time||null),
    cadence:hourlyFields[layer.id]?"Hourly forecast/model output":"Current provider snapshot",
    values,
    availability:available?"AVAILABLE":"UNAVAILABLE",
    note:available?"Only the requested provider-returned fields are shown.":"The provider did not return the requested variable; no substitute value was inserted."
   };
   renderLayerInspector(layer.label,payload);
   if(available)toast(layer.label+" data retrieved from the provider.");
   else toast(layer.label+" is not present in the current provider response.","error");
   return;
  }
  if(layer.render==="analysis"){
   const start=iso(new Date(Date.now()-3*365*86400000)),end=iso(new Date());
   let result;
   if(layer.id==="vegetation_health")result=await api("/api/analysis/vegetation-series?lat="+state.lat+"&lon="+state.lon+"&start="+start+"&end="+end+"&max_observations=12&cloud_lt=50");
   else if(layer.id==="fire_risk")result=await api("/api/fire/intelligence?lat="+state.lat+"&lon="+state.lon+"&days=3");
   else if(layer.id==="drought"||layer.id==="temperature_anomaly"||layer.id==="rainfall_anomaly")result=await api("/api/climate/anomaly?lat="+state.lat+"&lon="+state.lon+"&window_days=30&baseline_years=5");
   else if(layer.id==="carbon_loss")result=await api("/api/analysis/evidence-chain?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place));
   else if(layer.id==="erosion")throw new Error("No dedicated validated erosion-susceptibility calculation is enabled; human-pressure data is not used as a substitute.");
   else if(layer.id==="fragmentation"){const picker=$("fragmentationUpload");picker?.click();return}
   else throw new Error("No verified analysis endpoint is registered for this layer.");
   renderLayerInspector(layer.label,result);toast(layer.label+" analysis response received.");return;
  }
  if(layer.render==="metadata"||layer.render==="planned_adapter"){
   let result;
   if(layer.id==="sentinel1")result=await api("/api/satellite/sentinel1?lat="+state.lat+"&lon="+state.lon+"&days=45");
   else if(layer.id==="landsat")result=await api("/api/satellite/landsat?lat="+state.lat+"&lon="+state.lon+"&days=90&cloud_lt=70");
   else result=await api("/api/satellite/latest?lat="+state.lat+"&lon="+state.lon+"&days=45&cloud_lt=70");
   renderLayerInspector(layer.label,result);toast(layer.label+" catalogue response received.");return;
  }
  throw new Error("No renderer is registered for this layer type: "+(layer.render||"unknown"));
 }catch(error){input&&(input.checked=false);toast(layer.label+": "+error.message,"error");renderLayerInspector(layer.label,{status:"UNAVAILABLE",error:error.message,source:layer.source})}
 finally{if(input)input.disabled=false}
}
function removeRasterOverlay(){
 const id="sentinel2-quick";
 const rec=state.activeLayers.get(id);
 if(rec)removeActiveLayer(id);
}
async function loadMapLayer(){
 const layer={id:"sentinel2-quick",label:"Sentinel-2 "+$("layerMode").value,source:"Copernicus / Earth Search",render:"satellite",mode:$("layerMode").value};
 await toggleLayer(layer,true,null);
}
async function loadForest(){
 $("forestResult").innerHTML='<div class="loading">Retrieving forest profile and investigation evidence…</div>';
 const q=`?lat=${state.lat}&lon=${state.lon}&place=${encodeURIComponent(state.place)}`;
 const res=await Promise.allSettled([api("/api/forest-profile"+q),api("/api/investigate"+q)]);
 $("forestResult").innerHTML=res.map((r,i)=>`<h3>${i?"Area investigation":"Forest digital profile"}</h3>${r.status==="fulfilled"?renderJson(r.value):`<p>${esc(r.reason.message)}</p>`}`).join("");
 $("forestResultStatus").textContent=res.some(r=>r.status==="fulfilled")?"DATA RECEIVED":"UNAVAILABLE";
}
async function loadFire(){
 $("fireResults").innerHTML='<div class="loading">Querying fire detections and NASA event context…</div>';
 const days=Number($("fireDays").value||1),q=`?lat=${state.lat}&lon=${state.lon}&days=${days}`;
 const res=await Promise.allSettled([api("/api/fire"+q),api("/api/eonet/events"+q+"&radius_deg=8")]);
 const fire=res[0].status==="fulfilled"?envelope(res[0].value):{},events=res[1].status==="fulfilled"?envelope(res[1].value):{};
 const f=fire.rows||fire.features||fire.events||[],ev=events.events||events.features||[];
 $("fireCount").textContent=res[0].status==="fulfilled"?f.length:"—";$("eventCount").textContent=res[1].status==="fulfilled"?ev.length:"—";$("fireProvider").textContent=res[0].status==="fulfilled"?res[0].value.source||res[0].value.freshness||"RESPONDED":"UNAVAILABLE";
 const rows=[...f.slice(0,18).map(x=>({name:x.properties?.acq_date||x.acq_date||"Thermal observation",type:"Satellite fire observation",source:res[0].value?.source||"Fire provider"})),...ev.slice(0,18).map(x=>({name:x.title||"Natural event",type:x.categories?.[0]?.title||"Natural event",source:"NASA EONET"}))];
 $("fireResults").innerHTML=rows.length?rows.map(x=>`<div class="event-row"><span class="event-icon"><i data-lucide="flame"></i></span><div><b>${esc(x.name)}</b><small>${esc(x.type)} · ${esc(x.source)}</small></div></div>`).join(""):renderEmpty("No records returned for this query. This is not proof of zero events.");
 icons();
}
async function loadClimate(){
 $("climateResult").innerHTML='<div class="loading">Retrieving environmental provider data…</div>';
 try{const data=await api(`/api/weather?lat=${state.lat}&lon=${state.lon}`);const d=envelope(data),c=d.current||d;
 $("climateTemp").textContent=c.temperature_2m==null?"—":n(c.temperature_2m)+"°";$("climateHumidity").textContent=c.relative_humidity_2m==null?"—":n(c.relative_humidity_2m,0)+"%";$("climateRain").textContent=(c.precipitation??c.rain)==null?"—":n(c.precipitation??c.rain)+" mm";$("climateWind").textContent=c.wind_speed_10m==null?"—":n(c.wind_speed_10m);
 renderResult("climateResult",data)}
 catch(e){$("climateResult").innerHTML=renderEmpty(e.message)}
}
const actionMap={
 "forest-profile":()=>"/api/forest-profile?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),
 "remote-change":()=>"/api/analysis/remote-change?lat="+state.lat+"&lon="+state.lon+"&before_date="+iso(new Date(Date.now()-365*86400000))+"&after_date="+iso(new Date()),
 "vegetation-series":()=>"/api/analysis/vegetation-series?lat="+state.lat+"&lon="+state.lon+"&start="+iso(new Date(Date.now()-3*365*86400000))+"&end="+iso(new Date())+"&max_observations=12&cloud_lt=50",
 "forest-doctor":()=>"/api/intelligence/live?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),
 "anomaly-radar":()=>"/api/intelligence/live?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),
 "risk":()=>"/api/intelligence/live?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),
 "what-if":()=>"/api/intelligence/what-if-location?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),
 "patrol":()=>"/api/patrol/live?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place)+"&before_date="+iso(new Date(Date.now()-365*86400000))+"&after_date="+iso(new Date()),
 "intervention":()=>"/api/intelligence/live?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),
 "recovery":()=>"/api/analysis/recovery-location?lat="+state.lat+"&lon="+state.lon+"&start="+iso(new Date(Date.now()-3*365*86400000))+"&end="+iso(new Date())+"&max_observations=12&cloud_lt=50"
};
async function runAction(action){
 if(action==="fragmentation"){navigate("forest");$("fragmentationUpload").click();return}
 const path=actionMap[action];if(!path)return toast("Analysis route not registered","error");
 const target=["forest-profile","remote-change","vegetation-series"].includes(action)?"forestResult":["forest-doctor","anomaly-radar","risk","what-if"].includes(action)?"intelligenceResult":"operationsResult";
 if(target==="forestResult")navigate("forest");else if(target==="intelligenceResult")navigate("intelligence");else navigate("operations");
 $(target).innerHTML='<div class="loading">Running backend analysis…</div>';
 try{const data=await api(path());renderResult(target,data);toast("Analysis response received")}
 catch(e){$(target).innerHTML=renderEmpty(e.message);toast("Analysis unavailable: "+e.message,"error")}
}
async function runCapability(id){
 const start=iso(new Date(Date.now()-3*365*86400000)),end=iso(new Date()),before=iso(new Date(Date.now()-365*86400000)),after=end;
 const q="/api/intelligence/live?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place)+"&before_date="+before+"&after_date="+after;
 const routes={
  1:{page:"satellites",path:"/api/satellite/latest?lat="+state.lat+"&lon="+state.lon+"&days=45&cloud_lt=70",target:""},
  2:{page:"layers",layer:"forest_cover"},
  3:{page:"forest",path:"/api/analysis/remote-change?lat="+state.lat+"&lon="+state.lon+"&before_date="+before+"&after_date="+after,target:"forestResult"},
  4:{page:"layers",path:"/api/map/compare?lat="+state.lat+"&lon="+state.lon+"&before_date="+before+"&after_date="+after+"&mode=true_color",target:"layerInspectorContent"},
  5:{page:"layers",layer:"ndvi"},
  6:{page:"layers",navigateOnly:true},
  7:{page:"forest",path:"/api/investigate?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),target:"forestResult"},
  8:{page:"climate",path:"/api/climate/anomaly?lat="+state.lat+"&lon="+state.lon+"&window_days=30&baseline_years=5",target:"climateResult"},
  9:{page:"climate",path:"/api/weather?lat="+state.lat+"&lon="+state.lon,target:"climateResult"},
  10:{page:"climate",path:"/api/climate/anomaly?lat="+state.lat+"&lon="+state.lon+"&window_days=30&baseline_years=5",target:"climateResult"},
  11:{page:"fire",path:"/api/fire/intelligence?lat="+state.lat+"&lon="+state.lon+"&days=3",target:"fireResults"},
  12:{page:"analytics",path:"/api/analysis/vegetation-series?lat="+state.lat+"&lon="+state.lon+"&start="+start+"&end="+end+"&max_observations=12&cloud_lt=50",target:"trendResult"},
  13:{page:"intelligence",path:q,target:"intelligenceResult"},
  14:{page:"intelligence",path:q,target:"intelligenceResult"},
  15:{page:"intelligence",path:q,target:"intelligenceResult"},
  16:{page:"analytics",path:"/api/intelligence/predict-location?lat="+state.lat+"&lon="+state.lon+"&start="+start+"&end="+end+"&max_observations=12&cloud_lt=50",target:"trendResult"},
  17:{page:"intelligence",path:q,target:"intelligenceResult"},
  18:{page:"intelligence",path:q,target:"intelligenceResult"},
  19:{page:"operations",path:"/api/patrol/live?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place)+"&before_date="+before+"&after_date="+after,target:"operationsResult"},
  20:{page:"intelligence",path:"/api/intelligence/what-if-location?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),target:"intelligenceResult"},
  21:{page:"intelligence",path:q,target:"intelligenceResult"},
  22:{page:"analytics",path:"/api/analysis/recovery-location?lat="+state.lat+"&lon="+state.lon+"&start="+start+"&end="+end+"&max_observations=12&cloud_lt=50",target:"trendResult"},
  23:{page:"analytics",path:"/api/analysis/recovery-location?lat="+state.lat+"&lon="+state.lon+"&start="+start+"&end="+end+"&max_observations=12&cloud_lt=50",target:"trendResult"},
  24:{page:"intelligence",path:q,target:"intelligenceResult"},
  25:{page:"forest",path:"/api/protected-area/context?lat="+state.lat+"&lon="+state.lon,target:"forestResult"},
  26:{page:"forest",upload:true},
  27:{page:"forest",path:"/api/analysis/evidence-chain?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place)+"&before_date="+before+"&after_date="+after,target:"forestResult"},
  28:{page:"analytics",path:"/api/analysis/climate-forest-correlation?lat="+state.lat+"&lon="+state.lon+"&start="+start+"&end="+end+"&max_observations=12&cloud_lt=50",target:"trendResult"},
  29:{page:"intelligence",path:"/api/analysis/evidence-chain?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place)+"&before_date="+before+"&after_date="+after,target:"intelligenceResult"},
  30:{page:"intelligence",path:q,target:"intelligenceResult"},
  31:{page:"intelligence",path:"/api/query/live?q="+encodeURIComponent("Investigate forest change and environmental conditions near "+state.place)+"&lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),target:"intelligenceResult"},
  32:{page:"reports",report:true},
  33:{page:"analytics",compare:true},
  34:{page:"analytics",path:"/api/time-machine?lat="+state.lat+"&lon="+state.lon+"&start="+start+"&end="+end+"&cloud_lt=60&limit=30",target:"trendResult"},
  35:{page:"systems",path:"/api/source-health?lat="+state.lat+"&lon="+state.lon,target:"systemResults"},
  36:{page:"forest",path:"/api/forest-profile?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place),target:"forestResult"},
  37:{page:"intelligence",path:"/api/news?place="+encodeURIComponent(state.place)+"&timespan=1week",target:"intelligenceResult"}
 };
 const config=routes[id];if(!config)return toast("No route is registered for this capability.","error");
 navigate(config.page);
 if(config.navigateOnly){await loadLayers();return}
 if(config.layer){await loadLayers();const found=state.layers.flatMap(g=>g.layers||[]).find(x=>x.id===config.layer);if(found)await toggleLayer(found,true,null);return}
 if(config.upload){$("fragmentationUpload").click();return}
 if(config.report){await downloadInvestigationReport();return}
 if(config.compare){await runRegionalCompare();return}
 const root=$(config.target);if(!root)return;
 root.innerHTML='<div class="loading">Executing capability '+id+' with the selected study area…</div>';
 try{const data=await api(config.path);root.innerHTML=renderJson(data);toast("Capability response received. Inspect source and limitations in the result.");}
 catch(e){root.innerHTML=renderEmpty(e.message);toast("Capability "+id+" unavailable: "+e.message,"error")}
}
async function downloadInvestigationReport(){
 const root=$("reportResult");root.innerHTML='<div class="loading">Generating PDF report from source-backed evidence…</div>';
 const url="/api/report/investigation?lat="+state.lat+"&lon="+state.lon+"&place="+encodeURIComponent(state.place);
 try{const response=await fetch(API_BASE+url);if(!response.ok)throw new Error("Report service returned HTTP "+response.status);const blob=await response.blob();if(!blob.type.includes("pdf"))throw new Error("The report service did not return a PDF.");const href=URL.createObjectURL(blob);const link=document.createElement("a");link.href=href;link.download="vanrakshak-investigation-report.pdf";link.click();setTimeout(()=>URL.revokeObjectURL(href),30000);root.innerHTML='<div class="empty">PDF report generated and downloaded. The file contains the backend response for the selected study area.</div>';toast("Investigation PDF downloaded.");}
 catch(e){root.innerHTML=renderEmpty(e.message);toast("Report unavailable: "+e.message,"error")}
}
function initFragmentationUpload(){
 const input=$("fragmentationUpload");if(!input)return;
 input.addEventListener("change",async()=>{
  const file=input.files?.[0];if(!file)return;
  const target=$("forestResult");target.innerHTML='<div class="loading">Uploading raster for fragmentation analysis…</div>';
  const body=new FormData();body.append("raster",file);
  try{const result=await api("/api/analysis/fragmentation",{method:"POST",body});target.innerHTML=renderJson(result);$("forestResultStatus").textContent="ANALYSIS RECEIVED";toast("Fragmentation analysis response received.");}
  catch(e){target.innerHTML=renderEmpty(e.message);toast("Fragmentation analysis failed: "+e.message,"error")}
  finally{input.value=""}
 });
}
async function loadSystems(){
 $("systemResults").innerHTML='<div class="loading">Checking backend and data-provider health…</div>';
 const q=`?lat=${state.lat}&lon=${state.lon}`;
 const r=await Promise.allSettled([api("/api/health"),api("/api/source-health"+q),api("/api/features/status"),api("/api/fallbacks/status")]);
 const health=r[0].status==="fulfilled"?r[0].value:null,sources=r[1].status==="fulfilled"?r[1].value:null,features=r[2].status==="fulfilled"?r[2].value:null;
 $("apiHealth").textContent=health?.ok?"RESPONDING":"UNAVAILABLE";$("apiHealthMeta").textContent=health?.service||"Health check failed";
 let arr=sources?.sources||sources?.providers||sources?.checks||[];if(!Array.isArray(arr)&&arr&&typeof arr==="object")arr=Object.entries(arr).map(([name,x])=>({name,...(typeof x==="object"?x:{status:x})}));
 $("sourceTotal").textContent=arr.length||"—";$("featureTotal").textContent=features?.count??features?.features?.length??"—";
 $("systemResults").innerHTML=arr.length?arr.map(x=>{const s=x.status||x.state||(x.ok?"connected":"unknown");return `<div class="system-row"><i class="provider-dot ${classify(s)}"></i><b>${esc(x.name||x.source||x.provider||x.service||"Provider")}</b><small>${esc(x.capabilities||x.detail||x.type||"Capability metadata not supplied")}</small><span class="state-tag ${classify(s)}">${esc(s)}</span></div>`}).join(""):renderEmpty("Provider health returned no records or is unavailable.");
 $("featureResults").innerHTML=features?.features?.length?features.features.map(x=>'<button type="button" class="feature-pill" data-feature-id="'+esc(x.id)+'"><b>'+esc(x.name||x.label||x.id||"Capability")+'</b><small>'+esc(x.status||x.runtime_status||"Status not supplied")+'</small><em>OPEN WORKFLOW ↗</em></button>').join(""):renderEmpty("Feature capability registry unavailable.");
 $("[data-feature-id]").forEach(button=>button.addEventListener("click",()=>runCapability(Number(button.dataset.featureId))));
}
async function runRegionalCompare(){
 const name=$("compareName").value.trim(),lat=Number($("compareLat").value),lon=Number($("compareLon").value);
 if(!name||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180){$("compareResult").innerHTML=renderEmpty("Enter a second region name and valid coordinates before running the comparison.");return}
 const start=$("trendStart").value||iso(new Date(Date.now()-3*365*86400000)),end=$("trendEnd").value||iso(new Date());
 if(start>=end){toast("Choose a valid analysis period first.","error");return}
 $("compareResult").innerHTML='<div class="loading">The backend is retrieving satellite, fire, climate and protected-area evidence for both regions, then calculating the comparison…</div>';
 try{
  const payload={regions:[
   {name:state.place,lat:state.lat,lon:state.lon,before_date:start,after_date:end,radius_km:1.5},
   {name:name,lat:lat,lon:lon,before_date:start,after_date:end,radius_km:1.5}
  ]};
  const result=await api("/api/intelligence/compare-live",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  $("compareResult").innerHTML=renderJson({...result,method_note:"The backend generated the evidence-chain measurements for each supplied region before comparing them. Missing source evidence is reflected in the underlying records; this is a prioritisation comparison, not proof of causation or a Mann–Kendall trend test."});toast("Regional comparison response received.");
 }catch(e){$("compareResult").innerHTML=renderEmpty(e.message);toast("Regional comparison unavailable: "+e.message,"error")}
}

async function runTrend(){
 const start=$("trendStart").value,end=$("trendEnd").value;if(!start||!end||start>=end)return toast("Choose a valid start/end period","error");
 $("trendStatus").textContent="RUNNING";$("trendResult").innerHTML='<div class="loading">Requesting real vegetation observations…</div>';
 try{const data=await api(`/api/analysis/vegetation-series?lat=${state.lat}&lon=${state.lon}&start=${start}&end=${end}&max_observations=16&cloud_lt=${Number($("trendCloud").value)}`);renderResult("trendResult",data);$("trendStatus").textContent="RESPONSE RECEIVED"}
 catch(e){$("trendResult").innerHTML=renderEmpty(e.message);$("trendStatus").textContent="UNAVAILABLE"}
}
async function report(){
 $("reportResult").innerHTML='<div class="loading">Generating report from available evidence…</div>';
 try{const data=await api(`/api/report/investigation?lat=${state.lat}&lon=${state.lon}&place=${encodeURIComponent(state.place)}`);renderResult("reportResult",data);toast("Report response received")}
 catch(e){$("reportResult").innerHTML=renderEmpty(e.message);toast("Report generation failed","error")}
}
async function geocode(q){
 if(!q||q.trim().length<2)return;
 try{const d=await api("/api/geocode?q="+encodeURIComponent(q.trim()));const x=envelope(d),arr=Array.isArray(x)?x:x.features||x.results||x.items||[x],m=arr.find(z=>z.lat!=null&&z.lon!=null)||arr[0];const lat=Number(m?.lat??m?.geometry?.coordinates?.[1]),lon=Number(m?.lon??m?.geometry?.coordinates?.[0]);if(!Number.isFinite(lat)||!Number.isFinite(lon))throw new Error("Geocoder did not return valid coordinates");setLocation(lat,lon,m.display_name||m.name||q);toast("Study area updated from geocoder")}
 catch(e){toast(e.message,"error")}
}
function bind(){
 initFragmentationUpload();
 $("[data-page]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
 $$("[data-action]").forEach(b=>b.addEventListener("click",()=>runAction(b.dataset.action)));
 $("mobileMenu").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
 $("refreshHealth").addEventListener("click",()=>loadOverview().then(()=>toast("Source health refreshed")));
 $("aboutBtn").addEventListener("click",()=>$("aboutDialog").showModal());
 $("changeRegion").addEventListener("click",()=>{$("regionInputName").value=state.place;$("regionInputLat").value=state.lat;$("regionInputLon").value=state.lon;$("regionDialog").showModal()});
 $("saveRegion").addEventListener("click",e=>{e.preventDefault();setLocation(Number($("regionInputLat").value),Number($("regionInputLon").value),$("regionInputName").value);$("regionDialog").close();loadOverview()});
 $("applyMapCoords").addEventListener("click",()=>{setLocation(Number($("mapLat").value),Number($("mapLon").value),$("placeSearch").value||"Selected coordinates");if(state.map)state.map.flyTo({center:[state.lon,state.lat],zoom:7})});
 $("placeSearchBtn").addEventListener("click",()=>geocode($("placeSearch").value));
 $("mapReload").addEventListener("click",()=>{state.map?.resize();loadMapLayer()});
 $("applyLayerMode").addEventListener("click",loadMapLayer);
 $$("[data-mode]").forEach(b=>b.addEventListener("click",()=>{$("layerMode").value=b.dataset.mode;loadMapLayer()}));
 $("missionSearch").addEventListener("input",()=>{const q=$("missionSearch").value.toLowerCase();$$(".mission-card").forEach(c=>c.hidden=!c.dataset.search.includes(q))});
 $("missionFilters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;$$("#missionFilters button").forEach(x=>x.classList.toggle("selected",x===b));$$(".mission-card").forEach(c=>c.hidden=b.dataset.filter!=="all"&&c.dataset.category!==b.dataset.filter)});
 $("layerSearch").addEventListener("input",renderLayers);
 $("runInvestigation").addEventListener("click",loadForest);
 $("fireDays").addEventListener("change",loadFire);$("refreshFire").addEventListener("click",loadFire);
 $("refreshClimate").addEventListener("click",loadClimate);$("refreshSystems").addEventListener("click",loadSystems);
 $("runTrend").addEventListener("click",runTrend);$("runCompare").addEventListener("click",runRegionalCompare);$("generateReport").addEventListener("click",downloadInvestigationReport);
 $("globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter")geocode(e.target.value);if(e.key==="Escape")e.target.blur()});
 $("globalSearch").addEventListener("focus",()=>$("globalSearch").parentElement.classList.add("expanded"));
 $("globalSearch").addEventListener("blur",()=>setTimeout(()=>$("globalSearch").parentElement.classList.remove("expanded"),180));
 window.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("globalSearch").focus()}});
}
function clock(){const update=()=>{$("utcClock").textContent=new Date().toISOString().slice(11,19)+" UTC"};update();setInterval(update,1000)}
function initParallax(){
 if(reduced||matchMedia("(pointer: coarse)").matches)return;
 let last=0;
 window.addEventListener("pointermove",event=>{
  const now=performance.now();if(now-last<24)return;last=now;
  const x=(event.clientX/innerWidth-.5),y=(event.clientY/innerHeight-.5);
  if(window.gsap){
   window.gsap.to(".g1",{x:x*24,y:y*18,duration:1.4,ease:"power3.out",overwrite:true});
   window.gsap.to(".g2",{x:-x*17,y:-y*13,duration:1.7,ease:"power3.out",overwrite:true});
  }
 });
 $(".mission-card,.feature-grid button,.launch-grid button").forEach(card=>{
  card.addEventListener("pointermove",event=>{
   const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
   card.style.transform="perspective(850px) rotateX("+(-y*2.4)+"deg) rotateY("+(x*2.8)+"deg) translateY(-2px)";
  });
  card.addEventListener("pointerleave",()=>{card.style.transform=""});
 });
}

async function boot(){
 icons();clock();bind();initParallax();setLocation(state.lat,state.lon,state.place);
 try{initEarth()}catch(e){$("textureStatus").textContent="3D RENDERER UNAVAILABLE";console.error(e)}
 if(!reduced&&window.gsap){gsap.from(".sidebar",{x:-12,opacity:0,duration:.6,ease:"power3.out"});gsap.from(".topbar",{y:-10,opacity:0,duration:.5,delay:.06});gsap.from(".globe-panel",{y:15,opacity:0,duration:.75,delay:.12,ease:"power3.out"});gsap.from(".hero-side .panel",{y:12,opacity:0,duration:.6,stagger:.1,delay:.22})}
 $("trendEnd").value=iso(new Date());$("trendStart").value=iso(new Date(Date.now()-3*365*86400000));
  const requestedPage=new URLSearchParams(window.location.search).get("page");
  const allowedPages=new Set(["overview","observatory","satellites","layers","forest","fire","climate","intelligence","analytics","operations","reports","systems"]);
  navigate(allowedPages.has(requestedPage)?requestedPage:"overview");
  // Render the workspace immediately; provider calls resolve in the background.
  loadOverview().catch(error=>{
   console.error("Overview data load failed",error);
   toast("Live data is temporarily unavailable. The workspace remains available.","error");
  });
}
document.addEventListener("DOMContentLoaded",boot);
