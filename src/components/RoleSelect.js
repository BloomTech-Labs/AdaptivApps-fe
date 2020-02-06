import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { blue } from '@material-ui/core/colors';

const RoleContain = styled.div`
position: absolute;
display: flex;
justify-content: space-evenly;
`

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        maxHeight: 300,
        color: "blue",
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <RoleContain>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        src={require("../photos/wheelchair.jpg")}
                        title="Wheel Chair Racing"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Athlete
          </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        src={require("../photos/coach.jpg")}
                        title="Two Coaches"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Coach
                  </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        src={require("../photos/volunteer.jpg")}
                        title="A volunteer holding two basketballs"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Volunteer
              </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </RoleContain>
    );
}