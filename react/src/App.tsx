import React from 'react';
import Main from "./Components/Main";
import store from "./Redux/Store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
