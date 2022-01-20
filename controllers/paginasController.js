import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';


const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express responde

    //consultar 3 viajes del modelo Viaje (async)

    //consultar con promise.. 2 cosas

        const promiseDB = [];

        promiseDB.push(Viaje.findAll({limit: 3}));              //posicion 0
        promiseDB.push(Testimonial.findAll({limit: 3}));        //posicion 1


        try {
                const resultado = await Promise.all(promiseDB);


            res.render('inicio', {
                pagina: 'Inicio',
                clase: 'home',               //hoja de estilos
                viajes: resultado [0],
                testimoniales:resultado[1]
            });

        } catch (error) {
            console.log(error)
        }

}

const paginaNosotros =  (req, res) => { 

    res.render('nosotros', {
        pagina: 'Nosotros'
    });

}

const paginaViajes = async (req, res) => { 
    //consultar base de datos de viajes
    const viajes = await Viaje.findAll();

        console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes,
    });

}

const paginaTestimoniales = async (req, res) => { 


    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    
    
    } catch (error) {
        console.log(error);
    }
}

//muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;
    
    try {
        const viaje = await Viaje.findOne({where : {slug }});
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }

}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}