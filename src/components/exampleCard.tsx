import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CardHeader, TextField, CircularProgress} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {loadDogAction, RandomDogAction} from '../actions/dogActions';
import {IAppState} from '../store/store';

const useStyles = makeStyles({
    root: {
        width: 475,
        height: 275,
        alignSelf: 'middle',
        justifySelf: '2vh',
    },
    content: {
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '2vh',
    },
    button: {
        marginTop: '10px',
        height: '10px',
        width: '90%'
    },
    input: {
        width: '90%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

});


export default function SimpleCard() {
    //this object represents the classes that we defined
    const classes = useStyles();

    //this hook allows us to access the dispatch function
    const dispatch = useDispatch();

    //the useState() hook allows our component to hold its own internal state
    //the dogName property isn't going to be used anywhere else, so there's no need to hold it on the redux store
    const [dogName, setDogName] = useState('');

    //here we watch for the loading prop in the redux store. every time it gets updated, our component will reflect it
    const isLoading = useSelector((state: IAppState) => state.dogState.loading);

    //a function to dispatch multiple actions
    const getDog = () => {
        dispatch(loadDogAction(true));
        dispatch(RandomDogAction(dogName));

    }


    return (
        <Card className={classes.root}>
            <CardHeader title={<Typography variant='h5' component="h2">Find Doggo</Typography>}/>
            <CardContent className={classes.content}>
                <TextField
                    onChange={(e) => {
                        setDogName(e.target.value)
                    }}
                    className={classes.input}
                />
                <Button onClick={() => getDog()} className={classes.button} variant="contained" size="large"
                        color="primary">
                    {isLoading ? <CircularProgress color="secondary"/> :
                        <Typography>get {dogName} doggo</Typography>}
                </Button>
            </CardContent>
        </Card>
    )
}