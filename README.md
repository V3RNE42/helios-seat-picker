## **[HELIOS](https://helios-asientos.vercel.app/)**    

**HELIOS** es una app online útil para elegir asientos en un trayecto: en el lado izquierdo del vehículo, o en el derecho. 
Ya está. 
Esto puede ser útil a la hora de planificar el asiento teniendo en consideración múltiples factores, desde la piel fotosensible, la disrupción de ciclos circadianos por luz azul, si llevamos con nosotros algún tipo de batería que pueda cargarse con luz solar, o las razones que sean.

Para esto tiene en cuenta una serie de parámetros que maneja dentro de unas **delimitaciones** para dar al usuario final de una respuesta útil.

**DELIMITACIONES**:   
1 - Se asume un **trayecto rectilíneo** desde el punto de origen y el de destino. Esto quiere decir que, en ausencia de más información, el viaje será interpretado como una línea recta entre las coordenadas de origen y las de destino.    
2 - Se asume una **velocidad constante**: aceleración, decelaración, y parada son conceptos ajenos al vehículo idealizado con el que trabaja el modelo de la app.   
3 - Se asume que no hay alteraciones de altitud sobre el nivel del mar, ni túneles, tiempo nublado, o sombra proyectada por edificaciones, accidentes geográficos o eclipses.   
4 - Se asume que trabajamos desde el **uso horario del punto de salida**, que será el reloj de referencia del viajero. Los cambios horarios derivados del movimiento entre husos horarios se podrán ver reflejados en los resultados finales a elección expresa del usuario final.    

**ALGORITMO FUNDAMENTAL:**  
| Izquierda | Derecha |                        |             |
|-----------|---------|------------------------|-------------|
|    SOL    |  SOMBRA | Antes Mediodía Solar   | Norte a Sur |
|   SOMBRA  |   SOL   | Antes Mediodía Solar   | Sur a Norte |
|    SOL    |  SOMBRA | Tras el Mediodía Solar | Norte a Sur |
|   SOMBRA  |   SOL   | Tras el Mediodía Solar | Sur a Norte |

**CRÉDITOS ADICIONALES:**   
+ Es necesario acreditar a Volodymyr Agafonkin, creador del módulo SunCalc de JS, útil para averiguar el itinerario solar para unas coordenadas espaciotemporales dadas. Sin su trabajo, nada de esto sería posible.
+ Es necesario acreditar también a Félix Gnass y Theodore Brown, creadores de https://spin.js.org/ , página que me ha resultado útil para dotar a la app de un spinner, muy útil para los tiempos de espera.
+ He usado la API de OpenStreetMaps para hallar las coordenadas de los lugares de origen y destino
