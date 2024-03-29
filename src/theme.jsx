import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue } from "@mui/material/colors";


const theme= createTheme({
    typography:{
        fontFamily: 'Pretendard',
        fontSizeXs:'11px',
        fontSizeSm:'12px',
        fontSizeMd:'14px',
        fontSizeLg:'30px',
        fontWeightLighter:300,
        fontWeightLight:400,
        fontWeightRegular:500,
        fontWeightBold:700,
        lineHeightSm:'-1px',
        lineHeightMd:1.24,
        letterSpacing:'-4%',
       
        h1: {
            color: 'rgb(255, 255, 255)',
            fontFamily: 'Pretendard',
            fontWeight: 700,
            fontSize:'30px',
            lineHeight: -1,
            letterSpacing: 0,
            textAlign: 'left',
        },
        
    },
    palette:{
        background:{
            default:'rgb(25,25,25)'
        },
        text:{
            primary:'rgb(255,255,255)',
           
        },
        primary:{
                main:'rgb(255,255,255)', 
        },
        white:{
            main: 'rgb(255,255,255)',   
        },
        grey:{
            main: 'rgb(168,168,168)',
            light:'rgb(215,215,215)',
            dark:'rgb(86,87,87)',
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