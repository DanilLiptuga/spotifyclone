import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SoundOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import Link from "next/link";
import classes from "./styles/MainLayout.module.scss";
import {useRouter} from "next/router";

interface MainLayoutProps{
    children: any
}

const MainLayout : React.FC<MainLayoutProps> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const getSelectedKeys = () => {
        if (router.route.indexOf("/songs")!=-1)
            return ["2"];
        else if (router.route == "/authors") return ["3"];
        else return ["1"];
    }
    return (
        <Layout className={classes.rootLayout}>
            <Layout.Sider className={classes.sidebar} trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    className={classes.sidebar__menu}
                    selectedKeys={getSelectedKeys()}>
                    <Menu.Item key={1} icon={<DashboardOutlined />}><Link href='/'>Нещодавні</Link></Menu.Item>
                    <Menu.Item key={2} icon={<SoundOutlined />}><Link href='/songs'>Пісні</Link></Menu.Item>
                    <Menu.Item key={3} icon={<UnorderedListOutlined />}><Link href='/authors'>Виконавці</Link></Menu.Item>

                </Menu>
            </Layout.Sider>
            <Layout className={classes.contentLayout + ' site-layout'} >
                <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Layout.Header>
                <Layout.Content
                    className={classes.content + ' site-layout-background'}
                >
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;