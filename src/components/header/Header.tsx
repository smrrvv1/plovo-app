import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useNavigate } from 'react-router';

export const Header = () => {
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    const goAddDish = () => {
        navigate('/dish/create')
    }

    return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={goHome}
          >
            <FastfoodIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plovo
          </Typography>
          <Button color="inherit" onClick={goAddDish}>
            Add Dish
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}