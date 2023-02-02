import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    title: {
        fontSize: '3.5rem',
        textAlign: 'center',
        padding: '2rem',
    },
    body: {
        "display": "flex",
        "position": "relative",
        "justifyContent": "center",
        "alignItems": "center",
        "background": "var(--main-bg-color)",
        "fontFamily": "var(--primary-font)",
        "height": "100vh",
        "width": "100vw",
        "overflow": "hidden",
    },
    forgot_password_link: {
        "marginTop": "1.5rem"
    },
    create_account_container: {
        "display": "flex",
        "marginTop": "1.5rem",
        "fontSize": "var(--font-size-links)"
    },
    form_container: {
        "display": "flex",
        "position": "relative",
        "flexDirection": "column",
        "justifyContent": "center",
        "alignItems": "center",
        "width": "70%"
    }

});
export default styles;
