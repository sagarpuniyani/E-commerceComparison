import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { apiclient } from '../../../services/Api-client';

/*===================================================================================================================== */
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
        backgroundColor: blue[700],
    },
    }));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }));

        const StyledInputBase = styled(InputBase)(({ theme }) => ({
            color: 'inherit',
            '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                // vertical padding + font size from searchIcon
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    width: '12ch',
                    '&:focus': {
                    width: '20ch',
                    },
                },
                },
            }));
/*======================================================================================================================*/
const Searchdata = () => {

    const [SearchProduct , setSearchProduct] = useState(null);
    const  productnameRef = useRef();

    const HandleSearchOperation = async () => {
        const ProductInfo = {
            productName : productnameRef.current.value,
        }

        try {
            console.log("ProductInfo = " , ProductInfo);
            const res =  await apiclient.post( "http://localhost:1234/search" , ProductInfo);
            setSearchProduct(SearchProduct => res.data.record )
            console.log("Res = ", res.data.record);
            console.log("type of Res = ",typeof res.data.record);
        }
        catch(err){
            console.log("Error ");
        }
    }



return (
    <>
            <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
            E-commerce Comparison
            </Typography>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                inputRef={productnameRef}
                />
            </Search>
            <ColorButton onClick={HandleSearchOperation} variant="contained">Search</ColorButton>
            </Toolbar>
        </AppBar>
    </Box>
    {Object.keys(SearchProduct).length === 0 && <p>No Data Received</p>}
    {Object.keys(SearchProduct).length > 0 && <p>Data Received</p>}
    </>

)
}

export default Searchdata
