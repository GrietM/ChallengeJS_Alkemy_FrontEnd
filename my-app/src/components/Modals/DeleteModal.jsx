import React from 'react';
import {Modal, message} from 'antd';
import axios from 'axios'

const ConfirmModal = ({isModalVisible ,setIsModalVisible ,  getAllExpenses , expensesDetails}) => {
 // console.log('ConfirmModal-usertails - 1', userdetails)
  const expenseid =  'http://localhost:8080/api/admin/operations/' + expensesDetails._id
 // console.log('ConfirmModal-bookdetails -2 ',userid)
 //const token = localStorage.getItem('Token') 

  const handleCancel = () => {
    setIsModalVisible(false)
  };

  const handleOnDelete = async (hhh) => {
    //console.log('ModalConfirm-3 ',hhh)
    try{
      const response = await axios.delete(expenseid)//,{headers: {Authorization: 'Bearer ' + token}});
      //validar que salio ok el delete para refrescar la tabla
      //console.log('despues de borrar',response)
      message.success('Expense succesfully deleted')
      getAllExpenses()
      setIsModalVisible(false)
    } catch (error){
      message.error('Error at Expense Deletion: ' + error)
      throw error
    }
  } 
  return (
      <Modal title="Are you sure you want to delete this Expense?" visible={isModalVisible} onOk={handleOnDelete} onCancel={handleCancel}>
        <h3 >{expensesDetails.concept}</h3>
      </Modal>
  );
};

export default ConfirmModal;