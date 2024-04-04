import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const { role, description, moreDescription, image, redirect } = props
    const navigate = useNavigate()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleRoleRedirect = (redirect) => {
        if (redirect === 'player') {
            navigate('/playersignup')
            Cookies.set("role", "user")
        }
        else {
            navigate('/spreg')
            Cookies.set("role", "serviceprovider")
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={role}
                className='text-center'
            />
            <CardMedia
                component="img"
                image={image}
                alt="Paella dish"
                style={{ height: "299px" }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <div className='text-center'>
                <Button variant="contained" onClick={() => handleRoleRedirect(redirect)}>Become a {role}</Button>
            </div>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>More info:</Typography>
                    <Typography>
                        {moreDescription}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}