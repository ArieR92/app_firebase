import React, {useState} from 'react';
import styled from 'styled-components';
import db from './../firebase/firebaseConfig';
import {doc, deleteDoc, updateDoc} from 'firebase/firestore'


const Contacto = ({id, nombre, correo}) => {
    const [editandoTarea, CambiarEditandoTarea] = useState(false);
    const [Nuevonombre, cambiarNuevoNombre] = useState(nombre);
    const [Nuevocorreo, cambiarNuevoCorreo] = useState(correo);
    const actualizarContacto = async(e) => {e.preventDefault();

    try {

        await updateDoc( doc(db, 'users', id), {
            nombre: Nuevonombre,
            correo: Nuevocorreo
        });

    }   
    catch(error) {
        console.log('Hubo un error al intenar actualizar el usuario')
        console.log(error);
    }
    
    

    CambiarEditandoTarea(false);
}

//boton borrar

const eliminarContacto = async(id) => {
    try {

        await deleteDoc( doc(db, 'users', id),);

    }   
    catch(error) {
        console.log('Hubo un error al intenar eliminar el usuario')
        console.log(error);
    }
    
}





    return (
        <ContenedorContacto>
            {editandoTarea ?
        <form action="" onSubmit={actualizarContacto}>
            <Input
               type= "text"
               name= "nombre"
               value={Nuevonombre}
               onChange={ (e) => {cambiarNuevoNombre(e.target.value)} }
               placeholder='nombre'
               
            /> 

            <Input
               type= "text"
               name= "nombre"
               value={Nuevocorreo}
               onChange={ (e) => {cambiarNuevoNombre(e.target.value)} }
               placeholder='nombre'
               
            />
            <Boton type="submit">Actualizar</Boton>
        </form>
        :
        <>
        <Nombre>{nombre}</Nombre>
        <Correo>{correo}</Correo>
        <Boton onClick={ (e)=> {CambiarEditandoTarea(!editandoTarea)} }>Editar</Boton>
        <Boton onClick={() => {eliminarContacto(id)} }>Borrar</Boton>
        </>

            }

        </ContenedorContacto>
        
    );
}

const ContenedorContacto = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);
`;
 
const Nombre = styled.p`
    font-weight: bold;
`;
 
const Correo = styled.p`
    font-style: italic;
    color: #6B6B6B;
    margin: 5px 0;
`;
 
const Boton = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;
 
const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .2s ease all;
    outline: none;
    text-align: center;
    
    &:focus {
        border: 2px solid #3D76E9;
    }
`;
 
export default Contacto;