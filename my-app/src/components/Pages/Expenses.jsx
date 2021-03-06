/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd'
import axios from 'axios'
import {DeleteOutlined , EditOutlined} from '@ant-design/icons'
import DeleteModal from '../Modals/DeleteModal'
import EditModal from '../Modals/EditModal'
import PostModal from '../Modals/PostModal'
import GoToMain from '../../components/GoToMain/GoToMain'

const Expenses = () => {
    const [expenses, setExpenses] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const token = localStorage.getItem('Token') 

    const getAllExpenses = async () => {
        if (token){
            try{
            const resp = await axios.get('http://localhost:8080/api/operationsbytype?operationType=expense',
            {headers: {Authorization: 'Bearer ' + token}}
            )
            setExpenses(resp.data)  
            }
            catch(error){
                throw error        
            } 
        } 
        else {
            message.error('Please Login to access this information. Redirecting to Login Page...',2, GoToMain)
        }
    }

    useEffect(() =>{
        getAllExpenses()
    },[]
    )

    const [operationVisible, setModal] = useState(false)
    const [ operationDetails, setOperationDetails]  = useState({})

    const handleOnDelete = (event) => {
        setOperationDetails (event)
        setIsModalVisible(true)
    } 

    const [ isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [ operationEditDetails, setOperationEditDetails]  = useState({})

    const handleOnEdit = (row) => {
        setOperationEditDetails (row)
        setIsEditModalVisible(true)
    } 

    const columns =[
    {
        title:"Concept",
        dataIndex:"concept",
        key:"concept"
    },
    {
        title:"Amount",
        dataIndex:"amount",
        key:"amount"
    },
    {
        title:"Date",
        dataIndex:"date",
        key:"date"
    },
    {
        title:"Operation",
        dataIndex:"operationType",
        key:"operation"
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, row) =>
          <>
            <DeleteOutlined style={{fontSize:'20px', color:'red'}} onClick={()=>handleOnDelete(row)}/> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <EditOutlined style={{fontSize:'20px', color:'blue'}} onClick={()=>handleOnEdit(row)}/>
          </>
      },
]
    if (token){
    return(
        <div>
            <br/>
            <h2>Expenses</h2>
            <PostModal key={'post'}
            postModal={operationVisible} 
            setModal={setModal} 
            getAllExpenses={getAllExpenses} 
            />
            <DeleteModal  key={'delete'}
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            getAllExpenses={getAllExpenses} 
            operationDetails={operationDetails} 
            />
            <EditModal  key={'edit'}
            isEditModalVisible={isEditModalVisible}
            setIsEditModalVisible={setIsEditModalVisible} 
            getAllExpenses={getAllExpenses} 
            operationEditDetails={operationEditDetails} 
            setOperationEditDetails={setOperationEditDetails}
            />
            <Table key = {'T'} columns= {columns} dataSource={expenses}/>
        </div>
        )}
        else {
            return null
        }
    }
    
export default Expenses;
