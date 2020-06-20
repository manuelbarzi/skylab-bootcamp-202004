import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const { editMember } = require('termometro-client-logic')

function EditMember({ token, memberInfo, history }) {



    const handleGoToFamily = () => {
        history.push('/my-family')
    }

    const handleConfirmEdit = (event) => {
        event.preventDefault()

        let { name, surname, age, sex, email } = event.target

        name = name.value
        surname = surname.value
        age = age.value
        sex = sex.value
        email = email.value

        if (name === "") name = memberInfo.name
        if (surname === "") surname = memberInfo.surname
        if (age === "") age = memberInfo.age
        if (sex === "") sex = memberInfo.sex
        if (email === "") email = memberInfo.email
        let memberId = memberInfo.id

        try {
            (async () => {
                await editMember(name, surname, age, sex, email, memberId)
                handleGoToFamily()
            })()
        } catch (error) {
            if (error) throw error
        }
    }

    return (
        <section className='createMemberContainer'>
            <h1 className='createMemberContainer__title'>¡Edita los datos de {memberInfo.name} que quieras actualizar!</h1>
            <form className='createMemberContainer__form' onSubmit={handleConfirmEdit}>
                <input className='createMemberContainer__emailInput' name='name' type='text' placeholder={memberInfo.name} ></input>
                <input className='createMemberContainer__emailInput' name='surname' placeholder={memberInfo.surname}></input>
                <input className='createMemberContainer__emailInput' name='age' placeholder={memberInfo.age}></input>
                <input className='createMemberContainer__emailInput' name='sex' placeholder={memberInfo.sex}></input>
                <input className='createMemberContainer__emailInput' name='email' type='email' placeholder={memberInfo.email}></input>
                <button className='createMemberContainer__registerButton'>
                    <span className='createMemberContainer__registerButton--text'>Confirmar</span>
                </button>
            </form>
        </section>
    );
}

export default EditMember;