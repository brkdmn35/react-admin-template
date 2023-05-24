import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, status, fat, carbs, protein) {
    return { name, status, fat, carbs, protein };
}

const rows = [
    createData('Ahmetin Aynası', 'Active', 6.0, 24, 4.0),
    createData('Furkinin Aynası', 'Passive', 6.0, 24, 4.0),
    createData('Serconun Aynası', 'Active', 6.0, 24, 4.0),
    createData('FAA`nın Aynası', 'Passive', 6.0, 24, 4.0),
    createData('Emrenin Aynası', 'Active', 6.0, 24, 4.0),
    createData('Flo-1', 'Active', 6.0, 24, 4.0),
];

export default function Mirrors() {
    const [mirrorList, setMirrorList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_API_URL}//devices?is_debug=true`)
            .then(response => response.json())
            .then(data => setMirrorList(data.data.map(mirror => {
                return {
                    name: mirror.name,
                    status: mirror.status,
                    shop: mirror.shop,
                    healthCheck: 'PASSIVE'
                    }})));
    }, []);

    return (
        <>
            <Typography variant="h4" style={{ marginBottom: '24px' }} > Devices List </Typography>

            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="caption table">
                    {/* <caption>A basic table example with a caption</caption> */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Device Name</TableCell>
                            <TableCell align="right">Health Check</TableCell>
                            <TableCell align="right">Shop</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(mirrorList && mirrorList.length > 0) ? mirrorList.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Chip label={row.healthCheck}
                                        color={
                                            row.healthCheck === 'ACTIVE' ? 'secondary' : ''
                                        } />
                                </TableCell>
                                <TableCell align="right">
                                    {row.shop.name}
                                </TableCell>
                                <TableCell align="right">
                                </TableCell>
                            </TableRow>
                        )) : <TableRow>
                            <TableCell colSpan={4} align="center">
                                Mirrors Loading
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}