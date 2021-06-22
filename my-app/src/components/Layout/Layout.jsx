import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import  {NavLink,  Routes, Route} from 'react-router-dom';
import {
    HomeOutlined,
    IdcardOutlined,
    PictureOutlined,
    TeamOutlined,
    ShopOutlined,
    SettingOutlined,
    DollarOutlined,
    WalletOutlined,
    StrikethroughOutlined ,
    PlusCircleOutlined
  } from '@ant-design/icons';
import Expenses from '../Pages/Expenses';
import Incomes from '../Pages/Incomes';
import Balance from '../../components/Balance/Balance'
import Home from '../Pages/Home';
import Operations from '../Pages/Operations';

const { Header, Content, Footer } = Layout;

const MyLayout = () =>{
    return (
    <Layout className="layout">
        <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item className="item" key="1" icon={<HomeOutlined />}>
                <NavLink to="/Home"  style= {{fontWeight:'bolder'}}>
                    Home
                </NavLink>
            </Menu.Item>
            <Menu.Item className="item" key="2" icon={<DollarOutlined />}>
                <NavLink to="/Incomes"  style= {{fontWeight:'bolder'}}>
                    Incomes
                </NavLink>
            </Menu.Item>
            <Menu.Item className="item" key="3" icon={<WalletOutlined />}>
                <NavLink to="/Expenses"  style= {{fontWeight:'bolder'}}>
                    Expenses
                </NavLink>
            </Menu.Item>
            <Menu.Item className="item" key="4" icon={<PlusCircleOutlined/>}>
                <NavLink  to="/Operations"  style= {{fontWeight:'bolder'}}>
                    Add
                </NavLink>
            </Menu.Item>
        </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
           
            <Routes>
            <Route exact path="/Home" element= {<Home/>} />      
            <Route exact path="/Incomes" element= {<Incomes/>} />   
            <Route exact path= "/Expenses" element = {<Expenses/>}/>   
            <Route exact path= "/Operations" element = {<Operations/>}/>   
            </Routes>
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
)
}


export default MyLayout