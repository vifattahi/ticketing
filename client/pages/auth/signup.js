import {useState} from "react";
import Router from "next/router";
import useRequest from "../hooks/use-request";

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors} = useRequest({
        url: '/api/user/register',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/')
    });
    const onSubmit = async (event) => {
        event.preventDefault(0);
        await doRequest();
    }
    return <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button className="btn btn-primary">Register</button>
        {errors}
    </form>
}