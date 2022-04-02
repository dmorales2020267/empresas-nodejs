const Empresa = require('../models/empresas.model');

function RegistrarEmpresa(req, res) {
    var parametros = req.body;
    var cat = new Empresa();

    if(parametros.nombre ) {
            cat.nombre = parametros.nombre;
            cat.descripcion = parametros.descripcion;
            Empresa.find({ nombre : parametros.nombre }, (err, catEncontrado) => {
                if ( catEncontrado.length == 0 ) {

                    cat.save((err, usuarioGuardado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if(!usuarioGuardado) return res.status(500)
                            .send({ mensaje: 'Error al agregar la empresa'});
                        
                        return res.status(200).send({ Empresas: usuarioGuardado });
                    });                 
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Esta empresa ya existe en la base de datos ' });
                }
            })
    }
}


function EditarEmpresa(req, res) {
    var idCat = req.params.idCat;
    var parametros = req.body;
    
    Empresa.findByIdAndUpdate(idCat, parametros, { new : true } ,(err, catEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!catEditado) return res.status(404)
            .send({ mensaje: 'Error al editar los datos  de la  Categoria' });

        return res.status(200).send({ Empresa_Editada: catEditado});
    })

    
}


function EliminarEmpresa(req, res) {
    var idCat= req.params.idCat;

   
    Empresa.findByIdAndDelete(idCat, (err, catEliminada)=>{
        if(err) return res.status(400).send({ mensaje: "Error en la peticion de eliminar la categoria"});
        if(!catEliminada) return res.status(400).send({ mensaje: "Error al eliminar la Empresa"});

        return res.status(200).send({ Empresa_Eliminada: catEliminada})
    })
   
}


function visualizarEmpresas(req, res) {
    
    Empresa.find({}, (err, catEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!catEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empresa' })

        return res.status(200).send({ Empresas: catEncontrado })
    })
}


module.exports={
    RegistrarEmpresa,
    visualizarEmpresas,
    EliminarEmpresa
    }