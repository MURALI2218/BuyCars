import Form from '../components/Form'
import Navbar from './Navbar'
function Login(){
    
    return <>
        <Navbar></Navbar>
        <Form route='/api/token/' method='login' ></Form>
    </>
}

export default Login