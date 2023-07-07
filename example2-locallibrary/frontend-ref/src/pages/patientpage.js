import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableHead } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Link } from 'react-router-dom';
import { getFromApi } from '../services/requests';

import { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, riskScore, lastUpdate, id) {
  return { name, riskScore, lastUpdate, id };
}

// const rows = [
//   createData('Jimmy', 65, "05 Jun 2022", "1234223"),
//   createData('Nicholas', 5, "05 Sep 2022", "12312312"),
//   createData('Amos', 35, "31 Aug 2022", "12223123"),
//   createData('Elijah', 60, "28 Aug 2022", "43134234"),
//   createData('Patricia', 10, "28 Aug 2022", "25543453"),
//   createData('Jamie', 50, "27 Aug 2022", "345432234"),
// ].sort((a, b) => (a.riskScore > b.riskScore ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {

    //Load the data
    
    const resDataToContent = (resData) => {
      const final_array = [];
      resData.forEach((x, i) => {
        const lastUpdateDateTime = new Date(x['last_update']);
        const lastUpdateDate = lastUpdateDateTime.toDateString();
        final_array.push({
          'id':x['id'],
          'name':x['display_name'],
          'riskScore':Math.round((-x['average_sentiment']+1)*50),
          'latestSentiment': Math.round((-x['latest_sentiment']+1)*50),
          'lastUpdate':lastUpdateDate,
        });
      });

      final_array.sort((a, b) => b.latestSentiment - a.latestSentiment);

      return final_array;
    }

    getFromApi("dashboard/patient/list/", setContent, setLoading, resDataToContent);
    console.log(rows);    
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    {loading === true ? (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* <Backdrop sx={{ color: "grey" }} open={true} /> */}
      <CircularProgress />
    </div>
    ) : (
      <>
      <div><h1 style={{ fontFamily: "Arial" }}>Patients</h1></div>  
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
              <TableCell>Patient</TableCell>
              <TableCell align="right">Latest Risk Score</TableCell>
              <TableCell align="right">Average Risk Score</TableCell>
              <TableCell align="right">Last Journal Update</TableCell>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              
              <TableRow key={row.name} style={{ textDecoration: 'none' }}>
                <TableCell component="th" scope="row">
                <Link to={"/journal"} state={{
                    name: row.name, id: row.id
                  }}>
                  {row.name}
                  </Link>
                </TableCell>
                <TableCell style={{ width: 160, 
                  color: `${row.latestSentiment > 75 ? 'red' : 'black'}`,
                  fontWeight: `${row.latestSentiment > 75 ? 'bold' : 'normal'}`,
                  }} align="right">
                  {row.latestSentiment}
                </TableCell>

                <TableCell style={{ width: 160, 
                  color: `${row.riskScore > 70 ? 'red' : 'black'}`,
                  fontWeight: `${row.riskScore > 70 ? 'bold' : 'normal'}`,
                  }} align="right">
                  {row.riskScore}
                </TableCell>

                <TableCell style={{ width: 160 }} align="right">
                  {row.lastUpdate}
                </TableCell>
              </TableRow>
              
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      </>
    )}
    </>
    
  );
}
