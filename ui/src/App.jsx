import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import MainRoutes from './routes/Routes';
import Loading from '@components/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { ErrorBoundaryComponent } from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
            <React.Suspense fallback={<Loading />}>
                <React.Fragment>
                    <MainRoutes />
                    <ToastContainer autoClose={3000} />
                </React.Fragment>
            </React.Suspense>
        </ErrorBoundary>
    );
}

export default App;
