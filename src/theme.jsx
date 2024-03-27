import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue } from "@mui/material/colors";


const theme= createTheme({
    typography:{
        fontFamily: 'Pretendard',
        fontWeight: 500, 
        fontSize: '14px', 
        lineHeight: '-1px', 
        letterSpacing: '-4%',
       
        h1: {
            color: 'rgb(255, 255, 255)',
            fontFamily: 'Pretendard',
            fontWeight: '700',
            lineHeight: -1,
            letterSpacing: 0,
            textAlign: 'left',
        },
        
        body1: {
            textAlign:'left', 
            mt:'13px', 
        },
        body2: {
            fontSize: '12px',
            fontWeight: '300',
            lineHeight: '15px',
            letterSpacing: '-4%',
            color: 'rgb(215, 215, 215)',
        },
        timeSincePost:{
            color:'rgb(86,87,87)',
            fontSize:'12px',
            fontWeight:'400',
            lineHeight: '-1px',
            letterSpacing: '-4%',
            textAlign: 'left',
            alignContent:'center'
        }
        
    },
    palette:{
        background:{
            default:'rgb(25,25,25)'
        },
        text:{
            primary:'rgb(255,255,255)',
            secondary:'rgb(215,215,215)'
        },
        primary:{
            main: 'rgb(255,255,255)',
        },
        secondary:{
            main:'rgb(215,215,215)',
        },
    

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