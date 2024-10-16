// Controladores de gráficas generadas por la base de datos.
// Métodos encargados de las interacciones con la base de datos.

// Esquema de proyecto de la base de datos.
const Proyecto = require("../models/Proyecto");
// Esquema de donación de la base de datos.
const Donacion = require("../models/Donacion");
const mongoSanitize = require("mongo-sanitize"); // Agregamos mongo-sanitize
// Funcion para sanitizar la entrada
const sanitizeInput = (input) => mongoSanitize(input);

// Obtener un solo administrador por su ID
exports.getGraphByName = async (req, res) => {
    const { id } = sanitizeInput(req.params);
    try {
        let graph = undefined;
        if (id === "proyectos-fases") {
            graph = await getProyectosFases();
        } else if (id === "donaciones-mensuales") {
            graph = await getDonacionesMensuales();
        } else if (id === "donaciones-tipo") {
            graph = await getDonacionesByTipo();
        } else {
            res.status(404).json({ error: "Gráfica no encontrada" });
        };

        graph["id"] = id;

        console.log("Sending graph:");
        console.log(`graph: ${graph}`);
        for (let key in graph) {
            console.log(`graph.${key}: ${graph[key]}`);

            if (typeof graph[key] !== "object" || graph[key] === null) {
                continue;
            };

            for (let inner_key in graph[key]) {
                console.log(`graph[${key}][${inner_key}]: ${graph[key][inner_key]}`);
            };
        };

        if ("error" in graph) {
            console.log("Sending error");
            res.status(500).json(graph);
        };

        console.log("Sending graph");
        res.status(200).json(graph);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener la gráfica" });
    }
};

const getProyectosFases = async () => {
    try {
        let fasesProyectos = await Proyecto.aggregate([
            {
                $group: {
                    _id: "$estado",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    phase: '$_id',
                    count: 1,
                    _id: 0
                }
            }
        ]);

        let graph = {
            data: fasesProyectos
        }

        console.log("Returning graph:");
        console.log(`graph: ${graph}`);
        for (let key in graph) {
            console.log(`graph.${key}: ${graph[key]}`);
            for (let inner_key in graph[key]) {
                console.log(`graph[${key}][${inner_key}]: ${graph[key][inner_key]}`);
                for (let inner_inner_key in graph[key][inner_key]) {
                    console.log(`graph[${key}][${inner_key}][${inner_inner_key}]: ${graph[key][inner_key][inner_inner_key]}`);
                };
            };
        };

        return graph;
    } catch (error) {
        console.error('Error obteniendo los proyectos por estado:', error);
        return { error: 'Internal Server Error' };
    }
};

const getDonacionesMensuales = async () => {
    const currentYear = new Date().getFullYear();

    try {
        const donacionesMensuales = await Donacion.aggregate([
            {
                $match: {
                    fecha: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$fecha" },
                    total: { $sum: { $toDouble: "$monto" } }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const donacionesPorMes = Array(12).fill(0);
        donacionesMensuales.forEach(donacion => {
            donacionesPorMes[donacion._id - 1] = donacion.total;
        });

        console.log(`currentYear: ${currentYear}`);
        console.log(`donacionesPorMes: ${donacionesPorMes}`);

        let graph = {};
        graph["year"] = currentYear;
        console.log(`graph: ${graph}`);
        for (let key in graph) {
            console.log(`graph.${key}: ${graph[key]}`);
        };
        graph["donacionesMensuales"] = donacionesPorMes;
        console.log(`graph: ${graph}`);
        for (let key in graph) {
            console.log(`graph.${key}: ${graph[key]}`);
        };

        console.log(`Returning graph:`);
        console.log(`graph: ${graph}`);
        for (let key in graph) {
            console.log(`graph.${key}: ${graph[key]}`);
        };
        return graph;
    } catch (err) {
        console.error('Error details:', err);
        const error = { error: 'Error al calcular las donaciones mensuales' };
        return error;
    }
};

const getDonacionesByTipo = async () => {
    try {
        const donacionesDigital = await Donacion.aggregate([
            { $match: { tipo: 'digital' } },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $toDouble: "$monto" } }
                }
            }
        ]);

        const donacionesEfectivo = await Donacion.aggregate([
            { $match: { tipo: 'efectivo' } },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $toDouble: "$monto" } }
                }
            }
        ]);


        let graph = {
            digital: donacionesDigital.length > 0 ?
                donacionesDigital[0].total : 0,
            efectivo: donacionesEfectivo.length > 0 ?
                donacionesEfectivo[0].total : 0
        };

        return graph;
    } catch (err) {
        return { error: 'Error al calcular las donaciones' };
    }
};
