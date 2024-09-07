const emiliani = (año) => {
  // Definición de variables
  const a = año % 19;
  const b = año % 4;
  const c = año % 7;
  const k = Math.floor(año / 100);
  const p = Math.floor((13 + 8 * k) / 25);
  const q = Math.floor(k / 4);
  const M = (15 - p + k - q) % 30;
  const N = (4 + k - q) % 7;
  let d = (19 * a + M) % 30;
  let e = (2 * b + 4 * c + 6 * d + N) % 7;

  let diaPascua = 22 + d + e;
  let mesPascua = 3;

  //Función que permite que las fiestas cuando no caigan en día
  // lunes se trasladan al lunes siguiente al día de dicha festividad,

  const moverAlLunes = (fecha) => {
    const diaSemana = fecha.getDay();
    if (diaSemana !== 1) {
      return sumarDias(fecha, 8 - diaSemana);
    }
    return fecha;
  };
  const sumarDias = (fecha, dias) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha;
  };

  if (diaPascua > 31) {
    diaPascua = diaPascua - 31;
    mesPascua = 4; // Abril
  }

  // Condiciones importantes
  const var1 = (11 * M + 11) % 30;
  if (d === 28 && e === 6 && var1 < 19) {
    diaPascua = 18;
    mesPascua = 4;
  } else if (d === 29 && e === 6) {
    diaPascua = 19;
    mesPascua = 4;
  }

  const pascua = new Date(año, mesPascua - 1, diaPascua);

  // Días festivos en Colombia y encontró que están regulados por la
  // Ley 51 de 1983
  const festivosFijos = [
    new Date(año, 0, 1),
    new Date(año, 4, 1),
    new Date(año, 6, 20),
    new Date(año, 7, 7),
    new Date(año, 11, 8),
    new Date(año, 11, 25),
  ];

  // Festivos movibles
  const festivosMoviles = [
    moverAlLunes(new Date(año, 0, 6)),
    moverAlLunes(new Date(año, 2, 19)),
    moverAlLunes(new Date(año, 5, 29)),
    moverAlLunes(new Date(año, 7, 15)),
    moverAlLunes(new Date(año, 9, 12)),
    moverAlLunes(new Date(año, 10, 1)),
    moverAlLunes(new Date(año, 10, 11)),
  ];

  // Festivos religiosos
  const juevesSanto = sumarDias(pascua, -3);
  const viernesSanto = sumarDias(pascua, -2);
  const ascension = moverAlLunes(sumarDias(pascua, 43));
  const corpusChristi = moverAlLunes(sumarDias(pascua, 64));
  const sagradoCorazon = moverAlLunes(sumarDias(pascua, 71));

  //Utilizo el spread operator para unir todos los festivos fijos y moviles que se calculan con el uso de la instancia DATE y así entregar un solo array
  let festivosColombia = [
    ...festivosFijos,
    ...festivosMoviles,
    juevesSanto,
    viernesSanto,
    pascua,
    ascension,
    corpusChristi,
    sagradoCorazon,
  ];

  festivosColombia.sort((a, b) => a - b);

  // Formato de salida
  festivosColombia.forEach((festivo) => {
    const dia = festivo.getDate().toString().padStart(2, "0");
    const mes = (festivo.getMonth() + 1).toString().padStart(2, "0");
    console.log(`${año}-${mes}-${dia}`);
  });

  return festivosColombia; // Retornar el resultado
};

console.log(
  "//////////////////////// Ejecución de código/////////////////////////"
);
emiliani(2020);

// PRUEBAS UNITARIAS CON BASE A LOS RESULTADOS PREVISTOS EN UN CALENDARIO PARA EL AÑO 2020.
console.log(
  "//////////////////////// Ejecución de pruebas unitarias/////////////////////////////////"
);
const pruebasUnitarias = () => {
  // Prueba para el año 2020
  let resultado = emiliani(2020);
  let esperado = [
    "2020-01-01",
    "2020-01-06",
    "2020-03-23",
    "2020-04-09",
    "2020-04-10",
    "2020-04-12",
    "2020-05-01",
    "2020-05-25",
    "2020-06-15",
    "2020-06-22",
    "2020-06-29",
    "2020-07-20",
    "2020-08-07",
    "2020-08-17",
    "2020-10-12",
    "2020-11-09",
    "2020-11-16",
    "2020-12-08",
    "2020-12-25",
  ];

  console.assert(
    JSON.stringify(
      resultado.map(
        (f) =>
          `${f.getFullYear()}-${(f.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${f.getDate().toString().padStart(2, "0")}`
      )
    ) === JSON.stringify(esperado),
    "Error: 2020"
  );

  console.log("Pruebas ejecutadas.");
};

// Ejecutar las pruebas
pruebasUnitarias();
