import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
    console.log(currentUser)
    return <h1>This is a landing page!</h1>
}

LandingPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('api/user/currentuser');
    return data;
}

export default LandingPage;