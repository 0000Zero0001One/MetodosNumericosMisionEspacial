'use strict';

const valoresIniciales = {
  masa: 1000, empuje: 15000, gravedad: 9.81, coeficiente: 100,
  velInicial: 0, altInicial: 0, tiempo: 20, paso: 2, metodo: 'euler'
};

let datosActuales = [];
let charts = { velocidad: null, altura: null };
const $ = (id) => document.getElementById(id);
const fmt = (n, digits = 4) => Number(n).toLocaleString('es-BO', {
  minimumFractionDigits: digits, maximumFractionDigits: digits
});

function leerParametros() {
  return {
    m: Number($('masa').value), T: Number($('empuje').value),
    g: Number($('gravedad').value), k: Number($('coeficiente').value),
    v0: Number($('velInicial').value), y0: Number($('altInicial').value),
    tf: Number($('tiempo').value), h: Number($('paso').value),
    metodo: $('metodo').value
  };
}

function validar(p) {
  const campos = [p.m,p.T,p.g,p.k,p.v0,p.y0,p.tf,p.h];
  if (!campos.every(Number.isFinite)) return 'Todos los campos deben contener números válidos.';
  if (p.m <= 0) return 'La masa debe ser mayor que cero.';
  if (p.g < 0 || p.k < 0) return 'La gravedad y el coeficiente k no pueden ser negativos.';
  if (p.tf <= 0 || p.h <= 0) return 'El tiempo final y el paso deben ser mayores que cero.';
  if (p.tf / p.h > 100000) return 'La simulación supera 100.000 pasos. Aumenta h o reduce el tiempo final.';
  return '';
}

// Solución exacta del sistema: v' = a - b*v; y' = v.
function exacta(t, p) {
  const a = p.T / p.m - p.g;
  const b = p.k / p.m;
  if (Math.abs(b) < 1e-12) {
    return {
      v: p.v0 + a*t,
      y: p.y0 + p.v0*t + 0.5*a*t*t
    };
  }
  const vLimite = a / b;
  const exponencial = Math.exp(-b*t);
  return {
    v: vLimite + (p.v0 - vLimite)*exponencial,
    y: p.y0 + vLimite*t + (p.v0 - vLimite)*(1-exponencial)/b
  };
}

function derivada(z, p) {
  return { v: p.T/p.m - p.g - (p.k/p.m)*z.v, y: z.v };
}
function sumar(z, k, factor) {
  return { v: z.v + factor*k.v, y: z.y + factor*k.y };
}

function pasoEuler(z, dt, p) {
  const k1 = derivada(z,p);
  return sumar(z,k1,dt);
}
function pasoHeun(z, dt, p) {
  const k1 = derivada(z,p);
  const predictor = sumar(z,k1,dt);
  const k2 = derivada(predictor,p);
  return {
    v: z.v + dt*(k1.v+k2.v)/2,
    y: z.y + dt*(k1.y+k2.y)/2
  };
}
function pasoRK4(z, dt, p) {
  const k1 = derivada(z,p);
  const k2 = derivada(sumar(z,k1,dt/2),p);
  const k3 = derivada(sumar(z,k2,dt/2),p);
  const k4 = derivada(sumar(z,k3,dt),p);
  return {
    v: z.v + dt*(k1.v+2*k2.v+2*k3.v+k4.v)/6,
    y: z.y + dt*(k1.y+2*k2.y+2*k3.y+k4.y)/6
  };
}
const integradores = { euler: pasoEuler, heun: pasoHeun, rk4: pasoRK4 };
const nombresMetodo = { euler:'Euler explícito', heun:'Heun', rk4:'Runge-Kutta 4' };

function integrar(p, metodo) {
  const resultado = [];
  let t = 0;
  let z = {v:p.v0, y:p.y0};
  resultado.push(construirFila(0,t,z,p));
  while (t < p.tf - 1e-12) {
    const dt = Math.min(p.h,p.tf-t); // Ajusta el último paso para llegar a tf.
    z = integradores[metodo](z,dt,p);
    t += dt;
    if (Math.abs(t-p.tf)<1e-10) t=p.tf;
    resultado.push(construirFila(resultado.length,t,z,p));
  }
  return resultado;
}
function construirFila(n,t,z,p) {
  const ex = exacta(t,p);
  return {n,t,v:z.v,y:z.y,ve:ex.v,ye:ex.y,ev:Math.abs(z.v-ex.v),ey:Math.abs(z.y-ex.y)};
}

function calcular() {
  const p = leerParametros();
  const error = validar(p);
  if (error) {
    $('mensaje').className = 'small mt-3 text-danger';
    $('mensaje').textContent = error;
    return;
  }
  datosActuales = integrar(p,p.metodo);
  const ultimo = datosActuales[datosActuales.length-1];
  actualizarIndicadores(ultimo,p);
  dibujarTabla(datosActuales);
  dibujarGraficas(datosActuales);
  dibujarComparacion(p);
  $('mensaje').className = 'small mt-3 text-success';
  $('mensaje').textContent = `Simulación completada: ${datosActuales.length-1} pasos mediante ${nombresMetodo[p.metodo]}.`;
}

function actualizarIndicadores(r,p) {
  $('kpiVelocidad').textContent=fmt(r.v);
  $('kpiAltura').textContent=fmt(r.y);
  $('kpiVelExacta').textContent=fmt(r.ve);
  $('kpiAltExacta').textContent=fmt(r.ye);
  $('kpiErrorV').textContent=fmt(r.ev)+' m/s';
  $('kpiErrorY').textContent=fmt(r.ey)+' m';
  const sentido = r.v >= 0 ? 'ascendiendo' : 'descendiendo';
  $('interpretacion').textContent =
    `Al cabo de ${fmt(r.t,2)} s, el modelo numérico indica que el cohete está ${sentido}. `+
    `La diferencia respecto a la solución analítica es ${fmt(r.ev)} m/s en velocidad y ${fmt(r.ey)} m en altura. `+
    `La velocidad límite del modelo es ${Math.abs(p.k)>1e-12 ? fmt((p.T/p.m-p.g)/(p.k/p.m))+' m/s' : 'no definida para k = 0'}.`;
}

function dibujarTabla(rows) {
  const tbody=$('tablaResultados');
  tbody.innerHTML=rows.map(r=>`<tr>
    <td>${r.n}</td><td>${fmt(r.t,3)}</td><td>${fmt(r.v)}</td><td>${fmt(r.ve)}</td>
    <td>${fmt(r.ev)}</td><td>${fmt(r.y)}</td><td>${fmt(r.ye)}</td><td>${fmt(r.ey)}</td>
  </tr>`).join('');
}
function crearGrafica(canvasId, etiqueta, unidad, rows, claveNum, claveExacta, existente) {
  if (existente) existente.destroy();
  return new Chart($(canvasId), {
    type:'line',
    data:{labels:rows.map(r=>Number(r.t.toFixed(6))),datasets:[
      {label:`${etiqueta} numérica`,data:rows.map(r=>r[claveNum]),borderColor:'#1769aa',backgroundColor:'#1769aa18',borderWidth:2.5,pointRadius:rows.length>60?0:3,tension:.18},
      {label:`${etiqueta} analítica`,data:rows.map(r=>r[claveExacta]),borderColor:'#e19a24',borderDash:[7,5],borderWidth:2.5,pointRadius:0,tension:.18}
    ]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{position:'bottom'},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ${fmt(c.parsed.y)} ${unidad}`}}},
      scales:{x:{title:{display:true,text:'Tiempo (s)'},grid:{color:'#edf1f5'}},
        y:{title:{display:true,text:unidad},grid:{color:'#edf1f5'}}}}
  });
}
function dibujarGraficas(rows) {
  charts.velocidad=crearGrafica('graficaVelocidad','Velocidad','m/s',rows,'v','ve',charts.velocidad);
  charts.altura=crearGrafica('graficaAltura','Altura','m',rows,'y','ye',charts.altura);
}
function dibujarComparacion(p) {
  const tbody=$('tablaMetodos');
  const exact=exacta(p.tf,p);
  tbody.innerHTML=Object.keys(integradores).map(key=>{
    const r=integrar(p,key).at(-1);
    return `<tr><th>${nombresMetodo[key]}${key===p.metodo?' <span class="badge text-bg-primary">Seleccionado</span>':''}</th>
      <td>${fmt(r.v)}</td><td>${fmt(Math.abs(exact.v-r.v))}</td>
      <td>${fmt(r.y)}</td><td>${fmt(Math.abs(exact.y-r.y))}</td></tr>`;
  }).join('');
}

function descargarCSV() {
  if(!datosActuales.length) return;
  const encabezado=['Iteracion','Tiempo_s','Velocidad_numerica_m_s','Velocidad_analitica_m_s','Error_velocidad','Altura_numerica_m','Altura_analitica_m','Error_altura'];
  const lineas=[encabezado.join(';'),...datosActuales.map(r=>[r.n,r.t,r.v,r.ve,r.ev,r.y,r.ye,r.ey].map(x=>String(x).replace('.',',')).join(';'))];
  const blob=new Blob(['\ufeff'+lineas.join('\n')],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='resultados_mision_nasa_1962.csv';a.click();
  URL.revokeObjectURL(url);
}

$('formSimulacion').addEventListener('submit',e=>{e.preventDefault();calcular();});
$('btnRestablecer').addEventListener('click',()=>{
  Object.entries(valoresIniciales).forEach(([id,value])=>$(id).value=value);
  calcular();
});
$('btnCSV').addEventListener('click',descargarCSV);
$('btnArriba').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
window.addEventListener('scroll',()=>{$('btnArriba').style.display=window.scrollY>500?'block':'none';});
calcular();
