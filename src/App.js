import {Layout} from 'antd'
import {Header, Content} from "antd/es/layout/layout";
import LoginForm from "./components/LoginForm";

const App = () => {
    return (
        <Layout style={{height: "100vh"}}>
            <Header>Header</Header>
            <Content
                style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",
                    overFLowY: "auto"
                }}
            >
                <LoginForm />
            </Content>
        </Layout>
    )
};

export default App;