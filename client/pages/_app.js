import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
  return (
  <div>
    <h1>Header</h1>
    <Component {...pageProps} />;
  </div>
  );
  
};

AppComponent.getInitialProps = async appContext => {

  console.log(appContext);
  
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  console.log(data);
  return data;
  
  // let pageProps ={};
  // if (appContext.Component.getInitialProps) {
  //    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  // }

  // return {
  //   pageProps,
  //   ...data
  // };
};

export default AppComponent;
