import React, { useEffect, useState,useMemo } from 'react'
import { Breadcrumb, Table, Modal } from 'react-bootstrap'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'


function DynamicForm() {

    const [tableData, setTableData] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:7000/form/findall').then(result => {
            setTableData(result.data);
        }).catch(err => {
            console.log(err.response);
        })
    }, [])

    const onDeleteData = (id) =>{
         axios.delete(`http://localhost:7000/form/${id}`).then(result=>{
             console.log(result);
         })
        }

    const listData = useMemo(() => {
        return tableData.length > 0 ? tableData.map((data, index) => {
            return (
                <tr key={data._id}>
                    <td>{data.name}</td>
                    <td>{data.FormCreated}</td>
                    <td>
                        <a onClick={() => setShow(true)}>View</a>
                        <Modal
                            size="lg"
                            show={show}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Body><img src={data.image} onClick={() => setShow(false)} className='banner-modal'></img></Modal.Body>
                        </Modal>
                    </td>
                    <td>{data.fields.map(d => {
                        return (
                            <div className='data-fields' id={d._id}>
                                <p>{d.name}</p>
                            </div>
                        )
                    })}</td>
                    <td>
                        {data.users.map(d=>{
                        return <p key={d._id}>{d}</p>
                    })}
                    </td>
                    <td>{data.status}</td>
                    <td>{data.validity}</td>
                    <td style={{display:"flex" ,justifyContent:"space-evenly"}}>
                        <FaEdit onClick={()=>{window.location.href='/admin/dynamicForm/create'}}></FaEdit>
                        <FaTrash onClick={()=>onDeleteData(data._id)}></FaTrash>
                        <FaTrash></FaTrash> 
                    </td>
                </tr >
            )
        }) : <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>No forms found</td>
        </tr>
    }, [tableData.length,show,tableData])

    

    return (
        <div style={{ margin: '1rem auto', width: '80%' }}>
            <div className='form-title'>
                <div className='Acontent-left'>
                    <p>Welcome , Administrator</p>
                    <button>Logout</button>
                </div>
                <div className='Acontent-right'>
                    <h1>Dynamic Forms</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin/dynamicForm" active>Forms</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className='form-title1'>
                 <span>{tableData.length} Results</span>
                 <button onClick={()=>{window.location.href='/admin/dynamicForm/create'}}>Create New Form</button>
                 <input type='search' placeholder='Search'></input>
            </div>
            <div className='Dynamic-table'>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Form Name</th>
                            <th>Form Created</th>
                            <th>Banner</th>
                            <th>Form Fields</th>
                            <th>Accessible Mails</th>
                            <th>Status</th>
                            <th>Validity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default DynamicForm
