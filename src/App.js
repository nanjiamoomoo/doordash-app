import {Layout, Typography} from 'antd';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MenuItemList from "./components/MenuItemList"
import {useState} from "react";
import MyCart from "./components/MyCart";

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {

    const [authenticated, setAuthenticated] = useState(false);

    return (
        <Layout style={{height: "100vh"}}>
            <Header>
                <Title
                    level={2}
                    style={{color: "white", lineHeight: "inherit", marginBottom: 0 }}
                >
                    Food Court
                </Title>
                <div>{authenticated ? <MyCart /> : <SignupForm />}</div>
            </Header>
            <Content
                style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",
                    overFLowY: "auto"
                }}
            >
                {
                    authenticated?
                         <MenuItemList />
                        :
                        <LoginForm onSuccess={() => {
                            setAuthenticated(true)
                        }}/>
                }
            </Content>
        </Layout>
    )
};

export default App;