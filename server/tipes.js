//TypeProf
//Localidad
//Provicia
//Pais
//Setting_cofig

const TypeProf = {
  id: "string",
  nombre: "string",
};

const Localidad = {
  id: "string",
  nombre: "string",
  id_provicia: "string",
};

const Provicia = {
  id: "string",
  nombre: "string",
  id_pais: "string",
};

const Pais = {
  id: "string",
  nombre: "string",
  block: "string",
  lenguaje: "string",
  horarios: "string",
};

const Setting_cofig = {
  id_prof: "string", //[unicate],
  tiempo_de_retraso: "number", //({ ->     el valor que pone el profesional
  horas: "number", //        inficando el tiempo maximo
  minutos: "number", //      antes que se puede pedir un turno
  dias: "number", //    sale de la relacion del tiempo /5 de horas minutos y dias
  tiempo_promedio_de_atencion: "number", //-> cuanto se tarde promedio en atender
};

const Profesional = {
  id: "string", //-> para hacer las relaciones vamos a usar este
  id_user: "string", //-> para mantener el login vamos a usar este
  id_type: "number",
  id_localidad: "string",
  token: "string" | null, //-> para logear y para que los usuarios esten relacionados a este
  nombre: "string",
  nombre_local: "string",
  titulo: "string",
  descripcion: "string",
  telefono: "string",
  direccion: "string",
  email: "string",
  estado: "boolean",
};

const Security = {
  id_prof: "string", //[unicate],
  password: "string",
  salt: "string",
  token: "boolean", //-> si esta en true es para iniciar, si no es solo de referencia
};

const Dia = {
  id_relacion: "string" | undefined,
  dia: "number",
  mes: "number",
  anio: "number",
};

const Tiempo = {
  id: "string",
  id_prof: "string",
  dia: "string",
  horas: ["string"],
  estado: "boolean",
};

const Cliente = {
  id: "string",
  id_prof: "string",
  id_servicios: ["string"],
  nombre: "string",
  telefono: "string",
  dia: "string",
  hora: "string",
  duracion: "number",
  estado: "boolean",
};

const Servicio = {
  id: "string",
  id_prof: "string",
  nombre: "string",
  duracion: "number",
  tiempo_muerto: "number", //null
  estado: "boolean",
};
