import React from "react";
import Banner from "./Banner";
import styles from '../../styles.js';
import {
    LoginForm,
    GuestForm,
    ForgotPasswordForm,
    ResetPasswordForm,
    NewAccountForm,
    FormContainer,
} from "./Forms";
import NotFound404 from "../generic/NotFound404";
import { useRoute, NavigationContainer } from "@react-navigation/native";

const LandingPage = ({ setAccessToken }) => {
    const route = useRoute();

    return (
        <>
            <Banner />
            <FormContainer style={styles.form_container}>
                <NavigationContainer>
                    {route.name === "" && (
                        <LoginForm
                            style={styles.form, styles.login_as_user}
                            setAccessToken={setAccessToken}
                        />
                    )}
                    {route.name === "guest-login" && (
                        <GuestForm
                            style={styles.form, styles.login_as_guest}
                            setAccessToken={setAccessToken}
                        />
                    )}
                    {route.name === "forgot-password" && (
                        <ForgotPasswordForm style={styles.form, styles.forgot_password} />
                    )}
                    {route.name === "reset-password" && (
                        <ResetPasswordForm style={styles.form, styles.forgot_password} />
                    )}
                    {route.name === "create-new" && (
                        <NewAccountForm
                            style={styles.form, styles.create_new_account}
                            setAccessToken={setAccessToken}
                        />
                    )}
                    {route.name === "*" && <NotFound404 />}
                </NavigationContainer>
            </FormContainer>
        </>
    );
};

export default LandingPage;




