import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import {DeleteOutlined , EditOutlined, PlusCircleOutlined} from '@ant-design/icons'
import DeleteModal from '../Modals/DeleteModal'
import EditModal from '../Modals/EditModal'
import PostModal from '../Modals/PostModal'

const Expenses = () => {
    const [expenses, setExpenses] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getAllExpenses = async () => {
        
        try{
          const resp = await axios.get('http://localhost:8080/api/admin/operationsbytype', {
            params: {
            operationType: 'expense'    }
          })
           setExpenses(resp.data)  
        }
        catch(error){
            //localStorage.removeItem('Token')
            //GoToMain()   
            //message.error("Sesión expirada. Inicie sesión nuevamente", 4)
            throw error        
        }}

        useEffect(() =>{
            getAllExpenses()
        },[]
        )

        const [operationVisible, setModal] = useState(false)
        const [ operationDetails, setOperationDetails]  = useState({})

        const handleOnDelete = (event) => {
            //antes de borrar llamar a un modal que confirme que quiere borrar ese libro
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
    return(
        <div>
            <PostModal 
            postModal={operationVisible} 
            setModal={setModal} 
            getAllExpenses={getAllExpenses} 
            />
            <DeleteModal 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            getAllExpenses={getAllExpenses} 
            operationDetails={operationDetails} 
            />
            <EditModal 
            isEditModalVisible={isEditModalVisible}
            setIsEditModalVisible={setIsEditModalVisible} 
            getAllExpenses={getAllExpenses} 
            operationEditDetails={operationEditDetails} 
            setOperationEditDetails={setOperationEditDetails}
            />
            <Table columns= {columns} dataSource={expenses}/>
        </div>
        )
    }
    
    
export default Expenses;
