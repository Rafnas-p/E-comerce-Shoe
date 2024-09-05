
import React, { useState } from 'react';
import Login from "./Login";
import Registration from "./Registration";

function Index() {
    const [currentForm, setCurrentForm] = useState("login");

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                {currentForm === 'login' ? (
                    <Login onFormSwitch={toggleForm} />
                ) : (
                    <Registration onFormSwitch={toggleForm} />
                )}
            </div>
        </div>
    );
}

export default Index;
