import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Table,Breadcrumb } from 'react-bootstrap'
import { FaEdit, FaFilePdf, FaPrint, FaEnvelope } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import './UserStyleSheet.css'


export default function ClientForm() {
    const [forms, setforms] = useState([])

   const mail = JSON.parse( localStorage.getItem('user'))

    useEffect(() => {

        const mail = JSON.parse( localStorage.getItem('user'))

        axios.get(`http://localhost:7000/form/get/${mail}`).then(response => {
            setforms(response.data)
        }).catch(error => {
            toast.error("Please try again")
        })
    }, [])

    const logoutForm=()=>{
        localStorage.clear()
        window.location.href = '/'
    }

    const formsTable = useMemo(() => {
        return forms.length > 0 ? forms.map((data, index) => {
            return <tr key={data.name + index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.FormCreated}</td>
                <td>{data.validity}</td>
                <td style={{display:"flex" ,justifyContent:"space-evenly"}}>
                    <NavLink to={`/create/${data._id}`} style={{color:'#000000'}}><FaEdit /></NavLink>
                    <p><FaPrint /></p>
                    <p><FaFilePdf /></p>
                    <p><FaEnvelope /></p>
                </td>
            </tr>
        })
            : <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>No forms found</td>
            </tr>
    }, [forms])
    return (
        <div style={{ margin: '1rem auto', width: '80%' }}>
             <div className='form-title'>
                <div className='Acontent-left'>
                    <p>Welcome ,{mail}</p> 
                    <button onClick={logoutForm}>Logout</button>
                </div>
                <div className='Acontent-right'>
                    <h1>Available Forms</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin/dynamicForm" active>Forms</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className='form-title1'>
                 <span>Results</span>
                 <input type='search' placeholder='Search'></input>
            </div>
            <Table striped bordered hover size="sm" className='Dynamic-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Form Name</th>
                        <th>Form Created</th>
                        <th>Form Last Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formsTable}
                </tbody>
            </Table>
        </div>
    )
}
