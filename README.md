# MISIÓN ESPACIAL NASA 1962 — EL MÉTODO DE EULER

**Estudiante:** Conde Gutierrez Rafael Blas  
**Materia:** COM-254 Métodos Numéricos  
**Periodo académico:** II - 2026

---

## 1. DESCRIPCIÓN DEL PROYECTO

**Misión espacial NASA 1962 — El método de Euler** es una aplicación web educativa desarrollada para estudiar y comprender la aplicación de los métodos numéricos en la resolución de problemas relacionados con la dinámica del movimiento de un cohete espacial.

La aplicación utiliza como contexto histórico la carrera espacial de la década de 1960, época en la que la NASA desarrollaba importantes programas de exploración espacial y necesitaba realizar cálculos matemáticos precisos para planificar las trayectorias de sus vehículos espaciales.

Inspirada en la película *Talentos ocultos (Hidden Figures)*, que destaca el trabajo de las matemáticas que contribuyeron al desarrollo de las misiones espaciales estadounidenses, esta aplicación busca demostrar la importancia de las matemáticas, las ecuaciones diferenciales y los métodos numéricos en la ingeniería aeroespacial.

El proyecto implementa principalmente el **método de Euler explícito**, permitiendo calcular aproximaciones de la velocidad y la altura de un cohete durante su ascenso vertical. Asimismo, incorpora los métodos de Heun y Runge-Kutta de cuarto orden (RK4) para comparar la precisión de diferentes técnicas numéricas.

## 2. OBJETIVO GENERAL

Desarrollar una aplicación web interactiva que permita aplicar, visualizar y analizar el método de Euler en la resolución de un modelo matemático del movimiento vertical de un cohete, comparando sus resultados con la solución analítica y otros métodos numéricos.

## 3. OBJETIVOS ESPECÍFICOS

- Implementar el método de Euler para resolver ecuaciones diferenciales ordinarias.
- Modelar matemáticamente el movimiento vertical de un cohete considerando empuje, gravedad y resistencia del aire.
- Calcular la velocidad y la altura del cohete en diferentes instantes de tiempo.
- Obtener la solución analítica del modelo para utilizarla como referencia.
- Comparar los resultados de Euler, Heun y Runge-Kutta de cuarto orden.
- Representar gráficamente la evolución de la velocidad y la altura.
- Analizar los errores numéricos producidos por los diferentes tamaños de paso.
- Facilitar el aprendizaje mediante una interfaz web interactiva y visual.

## 4. MODELO MATEMÁTICO

Para representar el movimiento del cohete se utiliza la segunda ley de Newton:

m · dv/dt = T - mg - kv

Despejando la aceleración:

dv/dt = T/m - g - (k/m)v

La ecuación diferencial de la altura es:

dy/dt = v

Donde:

- **m:** masa del cohete (kg).
- **T:** empuje del motor (N).
- **g:** aceleración de la gravedad (m/s²).
- **k:** coeficiente de resistencia del aire (kg/s).
- **v:** velocidad vertical del cohete (m/s).
- **y:** altura del cohete (m).
- **t:** tiempo (s).

El modelo considera un movimiento vertical ascendente, con masa, empuje, gravedad y coeficiente de resistencia constantes.

## 5. MÉTODOS NUMÉRICOS IMPLEMENTADOS

La aplicación incorpora tres métodos para aproximar la solución del sistema de ecuaciones diferenciales:

**Método de Euler explícito**

Utiliza la pendiente calculada al inicio de cada intervalo para estimar el siguiente valor:

y(n+1) = y(n) + h · f(t(n), y(n))

Es un método sencillo de implementar y permite comprender los fundamentos de la integración numérica.

**Método de Heun**

También conocido como método de Euler mejorado. Utiliza el promedio de dos pendientes para obtener una aproximación más precisa.

**Método de Runge-Kutta de cuarto orden (RK4)**

Utiliza cuatro estimaciones de pendiente en cada intervalo y proporciona una aproximación de mayor precisión para numerosos problemas de ecuaciones diferenciales.

## 6. SOLUCIÓN ANALÍTICA

La aplicación incorpora la solución analítica del modelo para comparar los resultados numéricos.

Definiendo:

a = T/m - g

b = k/m

La solución de la velocidad, cuando b es distinto de cero, es:

v(t) = a/b + (v₀ - a/b)e^(-bt)

La solución de la altura es:

y(t) = y₀ + (a/b)t + (v₀ - a/b)(1 - e^(-bt))/b

Estas expresiones permiten calcular los valores exactos del modelo matemático y determinar el error absoluto de los métodos numéricos.

## 7. FUNCIONALIDADES DE LA APLICACIÓN

La página web presenta las siguientes funcionalidades:

1. **Contexto histórico:** introducción a la carrera espacial y su relación con la importancia de los cálculos matemáticos en la NASA.
2. **Modelo matemático:** explicación de las ecuaciones diferenciales utilizadas para representar el movimiento del cohete.
3. **Parámetros configurables:** permite modificar la masa, el empuje, la gravedad, el coeficiente de resistencia, la velocidad inicial, la altura inicial, el tiempo final y el tamaño de paso.
4. **Simulación interactiva:** permite ejecutar los cálculos seleccionando Euler, Heun o Runge-Kutta de cuarto orden.
5. **Solución analítica:** calcula los valores de referencia de velocidad y altura.
6. **Gráficas dinámicas:** representa la velocidad y la altura en función del tiempo, comparando los resultados numéricos con los analíticos.
7. **Tabla de iteraciones:** muestra los resultados obtenidos en cada paso de integración.
8. **Análisis de errores:** calcula el error absoluto de velocidad y altura.
9. **Comparación de métodos:** presenta los resultados finales de Euler, Heun y RK4.
10. **Exportación de resultados:** permite descargar los datos de la simulación en formato CSV.

## 8. TECNOLOGÍAS UTILIZADAS

Para el desarrollo de la aplicación se utilizaron las siguientes tecnologías:

- **HTML5:** estructura y organización del contenido de la página web.
- **CSS3:** diseño visual, colores, distribución y estilos personalizados.
- **JavaScript:** implementación de los métodos numéricos, cálculos matemáticos y funcionalidades interactivas.
- **Bootstrap 5:** diseño adaptable (responsive) y componentes de interfaz.
- **Bootstrap Icons:** incorporación de iconos.
- **Chart.js:** generación de gráficas dinámicas.
- **Google Fonts:** tipografías utilizadas en la interfaz.

## 9. ESTRUCTURA DEL PROYECTO

El proyecto está organizado en los siguientes archivos:

- `index.html`: contiene la estructura principal y el contenido de la aplicación.
- `styles.css`: contiene los estilos visuales y la personalización del diseño.
- `app.js`: contiene la lógica de programación, los métodos numéricos, las gráficas, las tablas y los cálculos.
- `README.md`: contiene la documentación y las instrucciones del proyecto.

## 10. PARÁMETROS INICIALES DE LA SIMULACIÓN

La aplicación inicia con los siguientes valores de referencia:

| Parámetro | Valor |
|---|---:|
| Masa del cohete | 1000 kg |
| Empuje del motor | 15000 N |
| Gravedad | 9,81 m/s² |
| Coeficiente de resistencia | 100 kg/s |
| Velocidad inicial | 0 m/s |
| Altura inicial | 0 m |
| Tiempo final | 20 segundos |
| Tamaño de paso | 2 segundos |
| Método seleccionado | Euler explícito |

Con estos parámetros, los resultados esperados a los 20 segundos mediante Euler son:

- Velocidad numérica: 46,3273 m/s.
- Altura numérica: 574,7272 m.
- Velocidad analítica: 44,8761 m/s.
- Altura analítica: 589,2390 m.

Estos valores permiten comprobar el funcionamiento de la aplicación y analizar la diferencia entre la aproximación numérica y la solución analítica.

## 11. INSTRUCCIONES DE EJECUCIÓN

Para ejecutar la aplicación web se deben seguir estos pasos:

1. Descargar y descomprimir el proyecto.
2. Abrir la carpeta del proyecto utilizando Visual Studio Code.
3. Verificar que los archivos HTML, CSS y JavaScript se encuentren en la misma carpeta.
4. Abrir el archivo `index.html` mediante un navegador web.
5. También se puede utilizar la extensión Live Server de Visual Studio Code para ejecutar la aplicación en un servidor local.
6. Modificar los parámetros de la simulación si se desea experimentar con diferentes condiciones.
7. Seleccionar el método numérico y presionar el botón **Ejecutar simulación**.
8. Analizar las gráficas, tablas y errores obtenidos.
9. Utilizar el botón de descarga CSV para guardar los resultados.

Es necesario contar con conexión a Internet para cargar las bibliotecas externas utilizadas mediante CDN.

## 12. ALCANCES Y LIMITACIONES

La aplicación tiene fines educativos y permite comprender los fundamentos de los métodos numéricos aplicados a un problema físico simplificado.

El modelo considera un movimiento vertical con masa y empuje constantes, gravedad uniforme y resistencia del aire proporcional a la velocidad.

Sin embargo, un lanzamiento espacial real requiere modelos matemáticos mucho más complejos que contemplan el consumo de combustible, la variación de masa, las diferentes fases de propulsión, la resistencia aerodinámica, la variación de la gravedad y el movimiento tridimensional.

Por este motivo, los resultados de la aplicación no representan una predicción real de un lanzamiento espacial ni reproducen los cálculos oficiales de la NASA. Su finalidad es académica y demostrativa.

## 13. CONCLUSIÓN

El desarrollo de esta aplicación permite comprender la importancia de los métodos numéricos en la resolución de problemas representados mediante ecuaciones diferenciales.

A través del método de Euler se puede aproximar el comportamiento de la velocidad y la altura de un cohete, mientras que la solución analítica permite comprobar la precisión de los resultados obtenidos.

La incorporación de Heun y Runge-Kutta de cuarto orden amplía el análisis y permite observar cómo diferentes métodos pueden mejorar la aproximación numérica.

Finalmente, el proyecto demuestra que las matemáticas y la programación son herramientas fundamentales para estudiar fenómenos físicos y resolver problemas de ingeniería, tomando como inspiración el desarrollo de la exploración espacial durante la década de 1960.

---

**Proyecto académico:** Misión espacial NASA 1962 — El método de Euler  
**Estudiante:** Conde Gutierrez Rafael Blas  
**Asignatura:** COM-254 Métodos Numéricos  
**Periodo académico:** II - 2026