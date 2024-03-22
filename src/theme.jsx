import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue } from "@mui/material/colors";


const theme= createTheme({
    typography:{
        fontFamily: 'Pretendard',
        fontWeight: 500, 
        fontSize: '14px', 
        lineHeight: '-1px', 
        letterSpacing: '-4%',
        /*
        h1: {
            fontSize: '30px',
            fontWeight: 700,
            rowHeight:'-1px'
        },
        h2: {
            fontSize: '2rem', 
        },
        body1: {
            fontSize: '1rem', 
        },
        */
    },
    palette:{
        background:{
            default:'rgb(25,25,25)'
        },
        text:{
            primary:'rgb(255,255,255)'
        },
        primary:{
            main: 'rgb(255,255,255)',
        },
        secondary:{
            main:'rgb(215,215,215)',
        },
        customLabels:{
            label1:blue[500]
        }

    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius:20
                }
            }
        }
    }
});

export default responsiveFontSizes(theme);